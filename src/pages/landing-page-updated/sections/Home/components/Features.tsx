import ManEmoji1 from '@assets/man-emoji-1.png';
import ManEmoji2 from '@assets/man-emoji-2.png';
import WhatWeDo_2 from '@assets/what-we-do-2.svg';
import WhatWeDo_3 from '@assets/what-we-do-3.svg';
import WomanEmoji from '@assets/woman-emoji.png';

export default function Features() {
    return (
        <div className="bg-black w-full relative z-[100]">
            <div className="container flex flex-col items-center px-4 mx-auto">
                <h2 className="dakdo  text-[#6E6E6E] text-center max-w-3xl leading-tight lg:text-[4rem] mt-24  text-4xl sm:text-5xl ">
                    <span className="dakdo text-[#F00]">BLACKAT:</span> WHERE EXCELLENCE MEETS <br />{' '}
                    <span className="text-white dakdo">OPPORTUNITY.</span>
                </h2>
                <div className="grid w-full grid-cols-1 gap-3 mt-24 md:grid-cols-2 md:mt-48">
                    <div className="col-span-1 md:col-span-2 flex flex-col-reverse lg:flex-row gap-7 relative lg:items-center justify-between w-full bg-white/10 rounded-[20px] py-14 px-6 md:px-10">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[#F00] text-sm">WHAT WE DO</p>
                            <h5 className="text-2xl text-white md:text-4xl">Networking Hub</h5>
                            <p className="text-[#E6EAEE] mt-2.5 max-w-md leading-normal text-sm md:text-lg">
                                Connect with like-minded black executives and agencies worldwide. Expand your professional network and explore new
                                opportunities for collaboration.
                            </p>
                        </div>
                        <div className="flex flex-col flex-1 w-full gap-5">
                            <div className="pl-6 md:pl-24">
                                <div className="p-4 md:p-10 rounded-xl border w-full border-[#5C5A67CC] bg-[#28272D] flex items-center justify-between">
                                    <div className="flex flex-col w-full gap-4">
                                        <div className="bg-[#545161] opacity-60 rounded-10 w-4/5 md:w-2/5 lg:w-3/5 md:h-8 h-4"></div>
                                        <div className="bg-[#545161] opacity-60 rounded-10 w-1/2 md:w-1/5 lg:w-2/5 md:h-8 h-4"></div>
                                    </div>
                                    <div className="relative flex px-4">
                                        <div className="size-8 lg:size-12 p-[5px] rounded-full bg-[#FFECFF]/60">
                                            <div className="rounded-full bg-[#FFECFF]">
                                                <img src={WomanEmoji} alt="woman-emoji" />
                                            </div>
                                        </div>
                                        <div className="size-8 lg:size-12 left-1/2 z-10 absolute p-[5px] rounded-full bg-[#FFECFF]/60">
                                            <div className="rounded-full bg-[#FFECFF]">
                                                <img src={ManEmoji1} alt="man-emoji" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pr-6 md:pr-24">
                                <div className="p-4 md:p-10 rounded-xl border w-full border-[#5C5A67CC] bg-[#28272D] flex items-center justify-between">
                                    <div className="flex flex-col w-full gap-4">
                                        <div className="bg-[#545161] opacity-60 rounded-10 w-4/5 md:w-2/5 lg:w-3/5 md:h-8 h-4"></div>
                                        <div className="bg-[#545161] opacity-60 rounded-10 w-1/2 md:w-1/5 lg:w-2/5 md:h-8 h-4"></div>
                                    </div>
                                    <div className="relative flex px-4">
                                        <div className="size-8 lg:size-12 p-[5px] rounded-full bg-[#FFECFF]/60">
                                            <div className="rounded-full bg-[#FFECFF]">
                                                <img src={WomanEmoji} alt="woman-emoji" />
                                            </div>
                                        </div>
                                        <div className="size-8 lg:size-12 left-1/2 z-10 absolute p-[5px] rounded-full bg-[#FFECFF]/60">
                                            <div className="rounded-full bg-[#FFECFF]">
                                                <img src={ManEmoji1} alt="man-emoji" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-7 relative lg:items-center justify-between w-full bg-white/10 rounded-[20px] py-14 px-6 md:px-10">
                        <img src={WhatWeDo_2} alt="WhatWeDo_2" className="w-full mx-auto lg:w-3/4" />
                        <div className="flex flex-col gap-1.5 w-full ">
                            <p className="text-[#F00] text-sm">WHAT WE DO</p>
                            <h5 className="text-2xl text-white md:text-4xl">Events and Conferences</h5>
                            <p className="text-[#E6EAEE] mt-2.5 max-w-md leading-normal text-sm md:text-lg">
                                Stay informed about upcoming events, conferences, and workshops relevant to black professionals and businesses.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 relative flex gap-7 justify-between w-full bg-white/10 rounded-[20px] py-14 px-6 md:px-10 overflow-hidden">
                        <div className="flex flex-col gap-1.5 w-full relative z-10">
                            <p className="text-[#F00] text-sm">WHAT WE DO</p>
                            <h5 className="text-2xl text-white md:text-4xl">Community Support</h5>
                            <p className="text-[#E6EAEE] mt-2.5 max-w-md leading-normal text-sm md:text-lg">
                                Join a supportive community of black professionals who share your values and aspirations. Engage in meaningful
                                discussions, share insights and experiences, and offer support to fellow members.
                            </p>
                        </div>
                        <div className="absolute bottom-0 w-1/4 right-4 md:w-3/4 md:right-10">
                            <div className="absolute -left-[1rem] size-8 md:size-12 top-1/2 p-[5px] rounded-full bg-[#FFECFF]/60">
                                <div className="rounded-full bg-[#FFECFF]">
                                    <img src={ManEmoji1} />
                                </div>
                            </div>
                            <div className="absolute -right-[1rem] size-8 md:size-12 top-1/4 p-[5px] rounded-full bg-[#FFECFF]/60">
                                <div className="rounded-full bg-[#FFECFF]">
                                    <img src={ManEmoji2} />
                                </div>
                            </div>
                            <div className="absolute left-[60%] size-8 md:size-12 top-[70%] p-[5px] rounded-full bg-[#FFECFF]/60">
                                <div className="rounded-full bg-[#FFECFF]">
                                    <img src={WomanEmoji} />
                                </div>
                            </div>
                            <img src={WhatWeDo_3} alt="WhatWeDo_2" className="size-full" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24">
                <div className="separator"></div>
            </div>
        </div>
    );
}
