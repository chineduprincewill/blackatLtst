import { Link } from 'react-router-dom';

import BlackatLogoLight from '@assets/blackat-light.png';
import FigmaLogo from '@assets/figma-logo.svg';
import LinkedinLogo from '@assets/linkedin-logo.svg';
import SlackLogo from '@assets/slack-logo.svg';
import TiktokLogo from '@assets/tiktok-logo.svg';
import WebflowLogo from '@assets/webflow-logo.svg';
import XLogo from '@assets/x-logo.svg';
import YoutubeLogo from '@assets/youtube-logo.svg';

export default function Footer() {
    return (
        <div className="flex justify-between w-full">
            <div className="container px-4 mx-auto">
                <div className="mt-24">
                    <div className="separator"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-[4.5rem] gap-y-8">
                    <div>
                        <img src={BlackatLogoLight} className="object-contain w-20 h-auto" />
                        <h5 className="text-white mt-7">
                            Made By <span className="text-white underline">BLACKAT</span>
                        </h5>
                        <p className="mt-2 text-[#d8d5d180] max-w-2xl text-sm">
                            BlackAT is still in early Beta, so please keep in mind that there may be some imperfections as we continue to work on
                            improving it.
                        </p>
                        {/* <div className="flex gap-3 mt-9">
                            {SOCIAL_LINKS.map(({ name, icon }) => (
                                <img key={name} src={icon} className="p-1 rounded-lg size-ull size-7 bg-white/5" />
                            ))}
                        </div> */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3">
                        <div className="hidden md:block"></div>
                        {/* <div className="flex flex-col">
                            {NAV_LINKS_1.map(({ label, path }) => (
                                <Link className="text-[#D8D5D150] text-sm leading-6 hover:text-white duration-200 transition-colors" to={path}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            {NAV_LINKS_2.map(({ label, path }) => (
                                <Link className="text-[#D8D5D150] text-sm leading-6 hover:text-white duration-200 transition-colors" to={path}>
                                    {label}
                                </Link>
                            ))}
                        </div> */}
                    </div>
                </div>
                <div className="mt-20 separator opacity-30"></div>
                <div className="flex flex-wrap justify-between gap-4 pb-8 mt-8">
                    <p className="text-[#D5D1D1] hover:text-white duration-150 transition-colors text-sm md:text-base">
                        © {new Date().getFullYear()} Blackat. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link
                            className="text-[#D5D1D1] hover:text-white duration-150 transition-colors underline text-sm md:text-base"
                            to="/privacy-policy"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            className="text-[#D5D1D1] hover:text-white duration-150 transition-colors underline text-sm md:text-base"
                            to="terms-and-conditions"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const NAV_LINKS_1 = [
    {
        label: 'About us',
        path: '/about',
    },
    {
        label: 'Install',
        path: '/install',
    },
    {
        label: 'Event',
        path: '/event',
    },
    {
        label: 'Network',
        path: '/network',
    },
    {
        label: 'Connections',
        path: '/connections',
    },
];

const NAV_LINKS_2 = [
    {
        label: 'Feedback',
        path: '/feedback',
    },
    {
        label: 'Contact',
        path: '/contact',
    },
    {
        label: 'Socials',
        path: '/socials',
    },
];

const SOCIAL_LINKS = [
    {
        name: 'Figma',
        icon: FigmaLogo,
    },
    {
        name: 'X',
        icon: XLogo,
    },
    {
        name: 'Slack',
        icon: SlackLogo,
    },
    {
        name: 'Youtube',
        icon: YoutubeLogo,
    },
    {
        name: 'Tiktok',
        icon: TiktokLogo,
    },
    {
        name: 'Webflow',
        icon: WebflowLogo,
    },
    {
        name: 'Linkedin',
        icon: LinkedinLogo,
    },
];
