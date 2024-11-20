import EmptyEvents from '@assets/empty-events-icon.svg';
import { GoShieldCheck } from 'react-icons/go';
import { LuCalendarCheck } from 'react-icons/lu';
import CalendarIcon from  '@assets/calendar.svg';
import LocationTick from '@assets/location-tick.svg';
import EventBanner1 from '@assets/event-banner-1.png';

export default function Events() {
    return (
        <div className="container px-4 mx-auto">
            <div className="h-[calc(100dvh-4rem)] flex items-start justify-start my-12">
                <div className="w-full md:w-1/3 grid bg-[#171717] rounded-lg p-4">
                    <span className='text-xs text-gray-500'>Hosted by</span>
                    <span className='text-white mt-1 mb-4'>BlackAt Events</span>
                    <img src={EventBanner1} alt='event banner 1' />
                    <span className='text-white text-xl uppercase font-semibold mt-4'>
                        this is lagos - pre seed launch of blackat
                    </span>
                    <div className='my-5 space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <img src={CalendarIcon} alt='calendar' width='16px' />
                            <span className='text-gray-500 text-xs'>Nov 20th 2024 - 9:00am - 3:00pm WAT</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <img src={LocationTick} alt='calendar' width='16px' />
                            <span className='text-gray-500 text-xs'>Alliance Francaise de Lagos, Mike Adenuga Centre, Ikoyi, Lagos</span>
                        </div>
                    </div>
                    <button 
                        className='w-full p-3 rounded-full border border-gray-400 bg-red-600 text-white text-sm'
                    >
                        View event
                    </button>
                </div>
            </div>
            {/**<div className="h-[calc(100dvh-4rem)] flex items-center justify-center">
                <div className="flex flex-col items-center mx-auto">
                    <img src={EmptyEvents} className="size-36 md:size-48" />
                    <p className="text-[#6E6E6E] text-2xl md:text-4xl mt-3 dakdo max-w-xl text-center">
                        Nothing on the calendar right now, but <span className="text-white dakdo"> stay tuned for future events!</span>
                    </p>
                </div>
            </div>*/}
        </div>
    );
}
