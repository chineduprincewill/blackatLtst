import { Link } from 'react-router-dom';

import RightArrow from '@assets/arrow-right-rounded.svg';
import RightArrow2 from '@assets/arrow-right-rounded-2.svg'
import ConcentricCircles from '@assets/concentric-circles.svg';
import Map from '@assets/map.png';
import RedBlur from '@assets/red-blur.svg';
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

export default function Hero() {
    return (
        <>
            {/* <div className="absolute w-full h-screen mx-auto"> */}
            {/* </div> */}
            <img src={ConcentricCircles} alt="ConcentricCircles" className="absolute z-10 w-full" />
            <div className="h-full max-w-[1400px] mx-auto relative z-50">
                <div className="container flex flex-col items-center px-4 mx-auto">
                    <span className="px-4 py-2.5 rounded-full mt-32 w-max bg-[#F11E26]/15 border border-[#FB757A] text-white">
                        Connect. Grow. Succeed.
                    </span>
                    <h1 className="mt-10 text-4xl text-center text-white sm:text-5xl dakdo md:text-7xl">
                        ELEVATING <span className="text-[#F00] dakdo">BLACK</span> EXCELLENCE
                    </h1>
                    <p className="text-[#898989] max-w-lg text-center mt-7 leading-normal md:text-lg text-base">
                        Bridging diverse minds to spark collaboration and drive impactful growth.
                    </p>
                    <div className='flex space-x-6 items-center'>
                        <Link className="rounded-full items-center border border-[#98999B] bg-white px-5 md:px-10 py-3 flex gap-2.5 mt-10" to="/login">
                            <span className="text-sm text-gray-700">Sign in</span>
                            <FaRegArrowAltCircleRight size={20} className='font-extralight' />
                        </Link>
                        <Link className="rounded-full items-center border border-[#98999B] bg-black/70 px-5 md:px-10 py-3 flex gap-2.5 mt-10" to="/create-acc">
                            <span className="text-sm text-white">Get Started</span>
                            <img src={RightArrow} alt="right arrow" />
                        </Link>
                    </div>
                    
                </div>
                <img src={Map} className="px-4 mt-28" />
                <img src={RedBlur} className="absolute inset-0 w-full h-full -z-10" />
            </div>
            <div className="relative z-10 w-full pt-40 bg-black">
                <div className="container mx-auto">
                    <div className="separator"></div>
                </div>
            </div>
        </>
    );
}
