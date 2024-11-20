import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useSimulatedProgress from '../../hooks/useSimulatedProgress';
import { CustomProgressState, MediaContentMetadata } from '../../types/common';
import UploadPic from '../../assets/upload-pic.png';

interface IUploadPreview {
    progress: number;
    progressState: CustomProgressState;
    file?: MediaContentMetadata;
    onRemoveFile?: () => void;
    children?: React.ReactNode;
}

export default function CircularUploadPreview({ progress, progressState, file, children, onRemoveFile }: IUploadPreview) {
    const name = file?.file.name || '';
    const size = file?.file.size || 0;
    let progressBarValue = 0;

    const { progress: preparationProgress } = useSimulatedProgress(progressState === 'preparing');

    const uploadedSize = size ? Math.round((progress * size) / 100000) : 0;
    const totalSize = size ? Math.round(size / 1000) : 0;

    if (progressState === 'preparing') progressBarValue = preparationProgress;
    else if (progressState === 'uploading') progressBarValue = progress;
    else if (progressState === 'done') progressBarValue = 100;
    else if (progressState === 'error') progressBarValue = 0;

    return (
        <div className="py-3 px-4 bg-red-00">
            <div className="mt-[14px] flex justify-center">
                <div className="w-72 h-72 relative">
                    <CircularProgressbarWithChildren
                        value={progressBarValue}
                        strokeWidth={3}
                        styles={buildStyles({
                            pathColor: progressState === 'done' ? '#00FF00' : '#FFD12D',
                            trailColor: '#d6d6d6',
                            textColor: '#000',
                        })}
                    >
                        <div style={{ fontSize: 12, marginTop: -5, textAlign: 'center' }}>{children}</div>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
            {file && (
                <>
                    {/* <h4 className="font-medium mb-[5px] text-center mt-4">{name}</h4> */}
                    <p className="text-sm text-lightGray-2 font-medium text-center">{progressState === 'idle' && 'Ready for upload'}</p>
                    <p className="text-sm text-lightGray-2 font-medium text-center">{progressState === 'preparing' && 'Preparing'}</p>
                    <p className="text-sm text-lightGray-2 font-medium text-center">
                        {progressState === 'uploading' && `Uploading ${uploadedSize}KB / ${totalSize}KB`}
                    </p>
                    {/* <p className="text-sm text-lightGray-2 font-medium text-center">{progressState === 'done' && 'Uploaded successfully'}</p> */}
                </>
            )}
            {(!progressState || ['idle', 'error'].includes(progressState)) && (
                <div className="text-center">
                    <button className="mt-2 text-primary-red" onClick={onRemoveFile}>
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
}
