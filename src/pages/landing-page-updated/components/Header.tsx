import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import BlackatLogoLight from '@assets/blackat-light.png';
import BlueMoon from '@assets/blue-moon.png';
import LightMoon from '@assets/brown-moon.png';
import WhiteHamburgerMenu from '@assets/dash0more-white.svg';
import DarkHamburgerMenu from '@assets/dashmore-dark.svg';
import BlackatLogoDark from '@assets/logo.png';

import Sidebar from './Sidebar';

export const NAV_TABS = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'About us',
        path: '/about',
    },
    {
        label: 'Our events',
        path: '/our-events',
    },
    {
        label: 'Contact',
        path: '/contact',
    },
];

export default function Header({ isLightMode, toggleLightMode }: { isLightMode: boolean; toggleLightMode: () => void }) {
    const [showSidebar, setShowSidebar] = useState(false);

    function onCloseSidebar() {
        setShowSidebar(false);
    }

    function onOpenSidebar() {
        setShowSidebar(true);
    }

    return (
        <>
            <Sidebar isLightMode={isLightMode} onCloseSidebar={onCloseSidebar} toggleLightMode={toggleLightMode} showSidebar={showSidebar} />
            <header className="header h-24 flex justify-center sticky top-0 z-[1000]">
                <div className="container grid h-full grid-cols-4 px-4">
                    <div className="flex items-center ">
                        <img alt="Blkat logo" src={isLightMode ? BlackatLogoDark : BlackatLogoLight} className="w-16 h-auto lg:w-20" />
                        {/* TODO logo fot svg */}
                        {/* <img alt="Union" src={mode === 'dark' ? BlackatLogoLight : Logo} /> */}
                    </div>
                    <div className="flex items-center justify-center col-span-2">
                        <div className="hidden px-2 py-2 rounded-full desktop-nav-container lg:px-3 md:flex">
                            {NAV_TABS.map(({ label, path }) => (
                                <NavLink
                                    className={({ isActive }) =>
                                        `px-4 nav_link lg:px-6 py-2 lg:py-3 whitespace-nowrap text-sm lg:text-base rounded-full font-medium ${
                                            isActive ? 'nav_link__active' : ''
                                        }`
                                    }
                                    to={path}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        {/* <button
                            className="gap-2 px-4 py-3 rounded-full bg-[#262626] items-center hidden md:flex light-mode-button"
                            onClick={toggleLightMode}
                        >
                            <img src={isLightMode ? BlueMoon : LightMoon} className="size-3 lg:size-4" />
                            <span className="text-xs lg:text-sm">Turn {isLightMode ? 'off' : 'on'} the light</span>
                        </button> */}
                        <button onClick={onOpenSidebar}>
                            <img src={isLightMode ? DarkHamburgerMenu : WhiteHamburgerMenu} className="block size-6 md:hidden" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
