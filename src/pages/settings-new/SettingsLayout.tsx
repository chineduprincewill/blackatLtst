import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../assets/back-mobile.svg';
import { toggleSettingsMenuVisibility, setSettingsMenuVisibility } from '../../state/slices/settingsSidebar';
import { useDispatch } from 'react-redux';
import backIcon from '../../assets/back-icon.svg';

interface Props {
    children: ReactNode;
    pageHeader: string;
    subtitle: string;
}

export default function SettingsLayout({ children, pageHeader, subtitle }: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth <= 768 && location.pathname === '/settings-new/') {
    //             // dispatch(toggleSettingsMenuVisibility());
    //             dispatch(setSettingsMenuVisibility(false));
    //         }
    //     };

    //     handleResize();
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [location.pathname, dispatch]);

    // const handleGoBack = () => {
    //     if (location.pathname === '/settings-new/') {
    //         dispatch(setSettingsMenuVisibility(true));
    //         navigate(-1);
    //     } else {
    //         dispatch(setSettingsMenuVisibility(true));
    //         navigate(-1);
    //     }
    // };
    const handleGoBack = () => {
        if (location.pathname.startsWith('/settings/')) {
            // dispatch(setSettingsMenuVisibility(true));
        }
        // navigate(-1);
        window.history.back();
    };

    const handleGoBackMobile = () => {
        navigate('/settings-mobile');
    };

    return (
        <div>
            {/* <div className="w-[388px] md:w-[850px]  flex justify-start">
                <button onClick={handleGoBack} className="bg-black hidden md:block text-white text-sm mt-5  px-7 py-2 rounded-3xl">
                    Back
                </button>
            </div> */}

            <div className="w-[388px] md:w-[850px] py-3 flex justify-start">
                <button onClick={handleGoBack} className="bg-black hidden md:block text-white text-sm mt-5  px-3 py-3 rounded-3xl">
                    <img src={backIcon} alt="Back icon" className="" />
                </button>
            </div>

            <div className="bg-white md:rounded-xl px-5 md:px-12 pt-12 pb-20 w-screen min-h-screen md:min-h-full max-h-[100%] md:h-full md:w-[850px] border-solid border border-[#E0E0E0]">
                <div className="border-solid md:border-[#EFEFEF] md:border-b pb-5">
                    <div>
                        <div className="flex gap-12 border-solid md:border-none border-b  border-[#E0E0E0] py-2">
                            <img src={BackButton} onClick={handleGoBackMobile} className="md:hidden " />
                            <h2 className="text-xl md:text-2xl font-semibold text-black">{pageHeader}</h2>
                        </div>
                        <p className="text-[#787878] text-xs pt-3">{subtitle} </p>
                    </div>
                </div>

                <div className="md:pt-5 space-y-2 md:space-y-5">{children}</div>
            </div>
        </div>
    );
}
