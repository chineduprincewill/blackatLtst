import React from 'react';
import { useDropzone } from 'react-dropzone';

import UploadIcon from '../../../../../../../../assets/upload-icon.svg';

interface IMasterClassVideoDropzone {
    onDropFiles: (e: File[]) => void;
}

export default function MasterClassVideoDropzone({ onDropFiles }: IMasterClassVideoDropzone) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop: onDropFiles,
        maxFiles: 1,
        multiple: false,
        accept: { 'video/*': [] },
    });

    const dropzoneBgColor = () => {
        if (isDragActive && isDragReject) return '#EA2E49';
        if (isDragActive) return '#76CD26';
        return '#F2F2F2';
    };

    return (
        <div
            {...getRootProps()}
            style={{
                backgroundColor: dropzoneBgColor(),
            }}
            className="'rounded-[10px] flex-1 border-dashed border max-h-[400px] border-black/30 flex relative flex-col justify-center items-center p-8 ring-offset-6 bg-lightGray-7"
        >
            <input className="invisible inset-0 absolute z-20" {...getInputProps()} />
            <div>
                <img src={UploadIcon} alt="upload icon" className="w-[68px] h-[68px] mx-auto" />
                <p className="text-lightGray-2 font-medium text-center mt-2.5 leading-5">
                    Drag and drop files here or <span className="text-black">browse computer</span>
                </p>
            </div>
            <p className="text-xs text-lightGray-2 md:mt-auto text-center mt-8 md:absolute left-0 right-0 bottom-8">
                Files supported: MP4, AVI, MOV, WEBM
            </p>
        </div>
    );
}