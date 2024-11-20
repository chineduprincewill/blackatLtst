import './Village.style.scss';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '@components/PageContainer';

import ActivityFeed from '../components/ActivityFeed';
import Header from '../components/Header';
import Members from '../components/Members';
import Requests from '../components/Requests';
import useVillage from './useVillage';

export default function Village() {
    const [activeButton, setActiveButton] = useState('Activity Feed');

    const { id } = useParams();

    const { isLeader } = useVillage();

    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParam = searchParams.get('q');
        if (queryParam) {
            setActiveButton(queryParam === 'feed' ? 'Activity Feed' : queryParam.charAt(0).toUpperCase() + queryParam.slice(1));
        }
    }, []);

    const handleButtonClick = (buttonName: string) => {
        if (buttonName === 'Events') {
            return;
        }
        setActiveButton(buttonName);
        const query = buttonName === 'Activity Feed' ? 'feed' : buttonName.toLowerCase();
        navigate(`/village/${id}?q=${query}`);
    };

    const buttonClass = (buttonName: string) => (buttonName === activeButton ? 'px-7 py-3 rounded-full bg-[#E9E9E9]' : '');

    return (
        <PageContainer
            title="Village"
            back
            // rightContent={
            //     <div onClick={handleModal} className="md:hidden">
            //         <img src={PlusIcon} alt="add village icon" />
            //     </div>
            // }
        >
            <div className="space-y-4 ">
                <Header />

                <section className="w-full ">
                    <section className="flex gap-2 py-5 md:gap-5">
                        <button
                            className={`px-7 py-3 text-xs md:text-base rounded-full ${buttonClass('Activity Feed')}`}
                            onClick={() => handleButtonClick('Activity Feed')}
                        >
                            Activity Feed
                        </button>
                        <button
                            className={`px-7 py-3 text-xs md:text-base rounded-full ${buttonClass('Members')}`}
                            onClick={() => handleButtonClick('Members')}
                        >
                            Members
                        </button>

                        <button
                            className={`px-7 py-3 text-xs md:text-base rounded-full ${buttonClass('Events')}`}
                            onClick={() => handleButtonClick('Events')}
                        >
                            Events
                        </button>

                        {isLeader && (
                            <button
                                className={`px-7 py-3 text-xs md:text-base rounded-full ${buttonClass('Requests')}`}
                                onClick={() => handleButtonClick('Requests')}
                            >
                                Requests
                            </button>
                        )}
                    </section>

                    <div className="relative flex justify-between w-full gap-x-7">
                        {activeButton === 'Activity Feed' && <ActivityFeed />}
                        {activeButton === 'Members' && <Members />}
                        {activeButton === 'Requests' && <Requests />}
                    </div>
                </section>
            </div>
        </PageContainer>
    );
}
