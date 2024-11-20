import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import ArrowBackBlack from '../assets/arrow-left.svg';

interface IPageContainer {
    title?: string;
    children: React.ReactNode;
    back?: boolean;
    subTitle?: string;
    rightContent?: React.ReactNode;
    className?: string;
}

export default function PageContainer({ title, children, back, subTitle, rightContent, className = '' }: IPageContainer) {
    const navigate = useNavigate();

    const goBack = () => {
        back && navigate(-1);
    };

    return (
        // <div className="px-3 h-full min-h-screen pt-6 md:px-9 xl:px-2  md:py-[67px] w-full xl:max-w-[1020px]  2xl:max-w-[1280px] mx-auto relative">
        //     <div className="flex items-center justify-center w-full mb-6 bg-red-500 md:justify-between">
        //         <div className="flex items-center justify-center gap-5 " onClick={goBack} role={back ? 'button' : 'group'}>
        //             {back && <img src={ArrowBackBlack} alt="arrow back" className="w-6 h-6" />}
        //             <div className="flex flex-col justify-center gap-3 ">
        //                 {title && (
        //                     <h2 className="text-xl font-semibold leading-6 text-center md:text-2xl md:text-left text-textPrimary md:block">
        //                         {title}
        //                     </h2>
        //                 )}
        //                 {subTitle && <p className="font-medium text-lightGray-2">{subTitle}</p>}
        //             </div>
        //         </div>
        //         <div className="ml-auto bg-green-500">{rightContent}</div>
        //     </div>
        //     {children}
        // </div>

        <div
            className={twMerge(
                ` px-3 h-full min-h-screen pt-6 md:px-9 xl:px-2 md:py-[67px] w-full sm:max-w-[768px] md:max-w-[1020px] 2xl:max-w-[1280px] mx-auto `,
                className,
            )}
        >
            <div className="relative flex flex-col items-center justify-center w-full mb-6 md:flex-row md:justify-between">
                {back && (
                    <img
                        onClick={goBack}
                        src={ArrowBackBlack}
                        alt="arrow back"
                        className="absolute left-0 w-6 h-6 md:relative md:hidden mobile-back-button"
                    />
                )}
                <div className="sticky flex items-center md:gap-7" onClick={goBack} role={back ? 'button' : 'group'}>
                    {back && (
                        <img
                            src={ArrowBackBlack}
                            alt="arrow back"
                            className="absolute hidden w-6 h-6 left-2 md:relative md:block desktop-back-button"
                        />
                    )}
                    <div className="flex flex-col items-center justify-center gap-3 md:items-start">
                        {title && <h2 className="text-xl font-semibold leading-6 text-center md:text-2xl md:text-left text-textPrimary">{title}</h2>}
                        {subTitle && <p className="font-medium text-center text-lightGray-2 md:text-left">{subTitle}</p>}
                    </div>
                </div>
                <div className="absolute right-0 mt-2 ml-auto md:mt-0 md:relative">{rightContent}</div>
            </div>
            {children}
        </div>
    );
}
