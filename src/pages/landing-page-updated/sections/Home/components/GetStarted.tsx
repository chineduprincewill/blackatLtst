import { Link } from 'react-router-dom';

import ArrowRight from '@assets/arrow-right-white.svg';
import GetStarted1 from '@assets/get-started-1.png';
import GetStarted2 from '@assets/get-started-2.png';
import GetStarted3 from '@assets/get-started-3.png';
import GridLight from '@assets/grid-light.svg';
import LongRightArrow from '@assets/long-arrow-right.svg';

export default function GetStarted() {
    return (
        <div className="flex justify-center w-full bg-black">
            <div className="container px-4 mx-auto mt-32">
                <h1 className="text-4xl text-center text-white md:text-6xl dakdo md:text-left">
                    HOW TO <span className="dakdo text-[#6E6E6E]">GET STARTED</span>
                </h1>
                <div className="flex flex-col gap-20 mt-20 md:gap-48">
                    {GET_STARTED_CONTENT.map(({ title, desc, image }, index) => (
                        <div className={`flex items-center gap-y-8 flex-col gap-x-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            <img src={image} className="w-full lg:w-1/2" />
                            <div className="flex flex-col w-full gap-4 p-4 lg:p-20 lg:w-1/2">
                                <h1 className="text-2xl font-semibold text-white md:text-4xl">{title}</h1>
                                <p className="text-[#898989] text-base md:text-lg font-light">{desc}</p>
                                <button className="btn-rounded bg-primary-red w-max mt-1.5 flex gap-3 items-center">
                                    Let's get started
                                    <img src={ArrowRight} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-24 md:mt-[200px] relative pt-24 md:pt-36 pb-12 flex flex-col lg:flex-row gap-12 lg:items-center justify-between pl-10 md:pl-20 pr-9 bg-[#282828]/50 rounded-3xl overflow-hidden">
                    <div className="text-4xl md:text-[4rem] relative z-10">
                        <h2 className="leading-tight text-white dakdo">UNLIMITED</h2>
                        <h2 className="leading-tight text-white dakdo">POSSIBILITIES.</h2>
                        <h2 className="leading-tight text-white dakdo whitespace-nowrap">
                            <span className="dakdo text-[#F00] we-are">BLACK</span> EVERYWHERE
                        </h2>
                    </div>
                    <div className="relative z-10 flex flex-col max-w-xl gap-12">
                        <p className="text-[#8D9091] md:text-xl text-base">
                            Are you ready to expand your professional universe? Dive into <span className="text-white">BlackAt</span>, the dynamic
                            platform that bridges the gap between diverse business minds.
                        </p>
                        <div className="flex flex-col justify-end gap-4 sm:flex-row">
                            <Link to="/login" className="max-w-sm">
                                <button className="flex items-center gap-3 btn-rounded bg-primary-red w-max">
                                    Log in
                                    <img src={LongRightArrow} className="flex w-auto" />
                                </button>
                            </Link>
                            <Link to="/create-acc" className="max-w-sm">
                                <button className="btn-rounded outline !text-white !border-white border w-max">Create Account</button>
                            </Link>
                        </div>
                    </div>
                    <img src={GridLight} className="absolute inset-0 object-cover w-full h-full opacity-40" />
                </div>
            </div>
        </div>
    );
}

const GET_STARTED_CONTENT = [
    {
        title: 'Your Personal Data',
        desc: ' We collect only the information necessary to provide you with a seamless and personalized experience on our platform. We employ state-of-the-art security measures to safeguard your personal data against unauthorized access, disclosure, or misuse.',
        image: GetStarted1,
    },
    {
        title: 'Determining Your User Type',
        desc: ' we recognize that each user is unique, with distinct preferences, interests, and goals. To provide you with a tailored and personalized experience, we use advanced algorithms and user profiling techniques to determine your user type.',
        image: GetStarted2,
    },
    {
        title: 'Personalizing experience from your user type',
        desc: 'By personalizing your experience from your user type, we strive to provide a tailored and impactful journey on BlackAt Platform, empowering you to maximize your potential and achieve success in your professional endeavors.',
        image: GetStarted3,
    },
];
