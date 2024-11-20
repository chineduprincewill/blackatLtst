import { NavLink } from 'react-router-dom';

import BlueMoon from '@assets/blue-moon.png';
import LightMoon from '@assets/brown-moon.png';
import CloseDark from '@assets/main-close-dark.svg';
import CloseWhite from '@assets/main-close.svg';
import usePreventScroll from '@hooks/usePreventScroll';

import { NAV_TABS } from './Header';

export default function Sidebar({
    showSidebar,
    onCloseSidebar,
    isLightMode,
    toggleLightMode,
}: {
    showSidebar: boolean;
    isLightMode: boolean;
    onCloseSidebar: () => void;
    toggleLightMode: () => void;
}) {
    usePreventScroll({ active: showSidebar });

    return (
        <div
            className={`w-full fixed flex h-[100dvh] inset-0 duration-400 transition-opacity z-[5000] justify-end ${
                showSidebar ? 'visible' : 'invisible'
            }`}
        >
            <div
                className={`flex flex-1 duration-200 transition-colors ${showSidebar ? 'bg-black/20' : 'bg-black/0'}`}
                onClick={onCloseSidebar}
            ></div>
            <div
                className={`w-1/3 min-w-[240px] h-full sidebar py-6 relative transition-all duration-300 ${
                    showSidebar ? 'right-0 opacity-100' : '-right-full opacity-0'
                }`}
            >
                <div className="flex justify-end w-full px-4">
                    <button onClick={onCloseSidebar}>
                        <img src={isLightMode ? CloseDark : CloseWhite} className="size-6" />
                    </button>
                </div>
                <div className="flex flex-col gap-8 px-8 mt-8">
                    {/* <button className="gap-2 px-4 py-3 rounded-full bg-[#262626] items-center flex w-max light-mode-button" onClick={toggleLightMode}>
                        <img src={isLightMode ? LightMoon : BlueMoon} className="size-3 lg:size-4" />
                        <span className="text-xs text-white lg:text-sm">Turn {isLightMode ? 'off' : 'on'} the light</span>
                    </button> */}
                    {NAV_TABS.map(({ label, path }) => (
                        <NavLink
                            key={label}
                            onClick={onCloseSidebar}
                            className={({ isActive }) =>
                                `w-full text-sm ${isActive ? 'font-semibold underline mobile-nav-link text-white' : 'font-medium text-[#B3B3B3]'}`
                            }
                            to={path}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
