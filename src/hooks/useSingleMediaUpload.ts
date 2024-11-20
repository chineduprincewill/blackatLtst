import { useState } from 'react';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../constants';
import { ApiResponse, CustomProgressState, MediaContentMetadata, MediaSingleUploadResponse, MediaUploadInfo } from '../types/common';
import { useUploadImageToCloudMutation } from 'api/profileApi';

const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB chunks

interface UseMediaUploadProps {
    infoUploadUrl: string;
    onSuccessfulUpload: (uploadStatusResponse: MediaSingleUploadResponse) => void;
}

export default function useSingleMediaUpload({ infoUploadUrl, onSuccessfulUpload = () => { } }: UseMediaUploadProps) {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [progressState, setProgressState] = useState<CustomProgressState>('idle');
    const [selectedFile, setSelectedFile] = useState<MediaContentMetadata | null>(null);
    const [preSignedUrlState, setPresignedUrlState] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [uploadImageToCloud] = useUploadImageToCloudMutation();

    const uploadSingleMediaInfo = async <T extends object>(content: MediaUploadInfo & T) => {
        try {
            const res = await fetch(`${SERVER_URL}/${infoUploadUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(content),
            });

            if (!res.ok) {
                const errorRes = await res.json();
                throw new Error(errorRes.message);
            }

            const uploadStatus = await res.json();
            return uploadStatus as ApiResponse<MediaSingleUploadResponse>;
        } catch (e) {
            setError(e as Error);
            throw e;
        }
    };

    const uploadChunk = async (
        sessionUrl: string,
        chunk: Blob,
        start: number,
        end: number,
        totalSize: number
    ): Promise<Response> => {
        const headers = new Headers({
            'Content-Range': `bytes ${start}-${end - 1}/${totalSize}`,
        });

        return fetch(sessionUrl, {
            method: 'PUT',
            headers,
            body: chunk,
            mode: 'cors',
            credentials: 'omit',
        });
    };

    const uploadSingleMedia = async <T extends object>(content: MediaUploadInfo & T) => {
        if (!content || !selectedFile?.file) {
            setProgressState('done');
            setLoading(false);
            onSuccessfulUpload({
                instructions: '',
                preSignedUrl: '',
                uploadKey: '',
            });
            return;
        }

        setLoading(true);
        setProgressState('preparing');

        try {
            const uploadStatus = await uploadSingleMediaInfo(content);
            const preSignedUrl = uploadStatus.data.preSignedUrl;

            if (!preSignedUrl) {
                throw new Error('No presigned URL received');
            }

            setPresignedUrlState(preSignedUrl);
            const file = selectedFile.file;
            const fileSize = file.size;
            let uploaded = 0;

            while (uploaded < fileSize) {
                const chunk = file.slice(uploaded, Math.min(uploaded + CHUNK_SIZE, fileSize));
                const end = Math.min(uploaded + CHUNK_SIZE, fileSize);

                try {
                    const response = await uploadChunk(
                        preSignedUrl,
                        chunk,
                        uploaded,
                        end,
                        fileSize
                    );

                    if (response.status === 200 || response.status === 201) {
                        // Upload to cloud after successful S3 upload
                        try {
                            // await uploadImageToCloud({
                            //     uploadKey: uploadStatus.data.uploadKey
                            // }).unwrap();
                            setProgressState('done');
                            setLoading(false);
                            onSuccessfulUpload(uploadStatus.data);
                        } catch (cloudError) {
                            console.error('Cloud upload error:', cloudError);
                            throw new Error('Failed to upload to cloud');
                        }
                        break;
                    }

                    if (response.status === 308) {
                        const range = response.headers.get('Range');
                        if (range) {
                            const match = range.match(/bytes=0-(\d+)/);
                            uploaded = match ? parseInt(match[1], 10) + 1 : uploaded + chunk.size;
                        } else {
                            uploaded += chunk.size;
                        }
                    } else {
                        throw new Error(`Upload failed with status: ${response.status}`);
                    }

                    const percentage = Math.round((uploaded / fileSize) * 100);
                    setProgressState('uploading');
                    setUploadProgress(percentage);

                } catch (error) {
                    console.error('Chunk upload error:', error);
                    throw error;
                }
            }

        } catch (error) {
            console.error('Upload error:', error);
            setLoading(false);
            toast.error(error instanceof Error ? error.message : 'Unable to upload content');
            setProgressState('error');
            throw error;
        }
    };

    function onSelectFile(file: MediaContentMetadata | null) {
        setSelectedFile(file);
    }

    return {
        error,
        loading,
        uploadMedia: uploadSingleMedia,
        progressState,
        uploadProgress,
        onSelectFile,
        selectedFile,
        preSignedUrlState,
    };
}