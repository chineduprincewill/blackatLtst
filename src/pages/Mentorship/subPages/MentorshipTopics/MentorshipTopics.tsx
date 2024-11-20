import React from 'react';

import TopPageBar from '@components/TopPageBar';

import { useGetLoggedInUserInfoQuery } from '../../../../api/userApi';
import ArrowBackBlack from '../../../../assets/arrow-left.svg';
import ThreeDots from '../../../../assets/three-dots.svg';
import DropdownSearch from '../../../../components/DropdownSearch';
import IconButton from '../../../../components/IconButton';
import IconInput from '../../../../components/IconInput';
import PageContainer from '../../../../components/PageContainer';
import { MentorshipData } from '../../../../types/mentorship';
import CreateSessionModal from '../../modals/CreateSessionModal';
import MentorshipTopic from './components/MentorshipTopic';
import useMentorshipTopics from './useMentorshipTopics';

export interface IMentorshipTopics {
    category: string;
    categoryId: string;
}

export default function MentorshipTopics() {
    const { mentorships, isLoading, options, categoryLoading, onSelectMoreOptions, onChangeSearchText, handleCategoryChange, resetFilters, goBack } =
        useMentorshipTopics();

    const { data: loggedInUserData } = useGetLoggedInUserInfoQuery(null);

    const loggedInUser = loggedInUserData?.data.user;

    if (isLoading || categoryLoading) {
        return <div>Loading Mentorships...</div>;
    }

    return (
        <PageContainer>
            <div className="h-full">
                <div className="mt-[5px]">
                    <div className="flex items-center justify-between w-full mb-6">
                        <div className="flex items-center gap-3" onClick={goBack} role="button">
                            {/* <img src={ArrowBackBlack} alt="arrow back" className="w-6 h-6" /> */}
                            <h2 className="text-2xl font-semibold leading-6 text-textPrimary md:block">Mentorship</h2>
                        </div>
                        <div className="flex items-center justify-between mt-5 ml-auto md:mt-0 md:gap-4">
                            {/* <p className="text-xs font-medium text-black md:text-sm whitespace-nowrap">
                                3 Session Left / <span className="text-[#959595]">5 Session</span>
                            </p> */}

                            <div className="flex items-center gap-7">
                                {loggedInUser && loggedInUser?.role.name === 'executive' && (
                                    <CreateSessionModal>
                                        <button className="btn-rounded bg-primary-red whitespace-nowrap">Create a Session</button>
                                    </CreateSessionModal>
                                )}
                                <DropdownSearch
                                    showSearch={false}
                                    options={MORE_OPTIONS}
                                    onChange={(e) => onSelectMoreOptions(e as string)}
                                    dropdownClassName="  -left-[200px] md:top-10 w-[240px]"
                                >
                                    <img src={ThreeDots} className="w-6 h-6 " alt="more options" />
                                </DropdownSearch>
                            </div>
                        </div>
                    </div>
                    <TopPageBar
                        onChangeSearch={onChangeSearchText}
                        dropdownOptions={options}
                        onChangeCategory={handleCategoryChange}
                        onRefreshFilter={resetFilters}
                    />
                </div>
                <div className="mt-[52px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-14">
                    {mentorships?.map((mentorship: MentorshipData) => <MentorshipTopic key={mentorship.id} mentorship={mentorship} />)}
                </div>
            </div>
        </PageContainer>
    );
}

const MORE_OPTIONS = [
    {
        label: 'Pending Sessions',
        value: 'pending',
    },
    {
        label: 'Upcoming Sessions',
        value: 'upcoming',
    },
    {
        label: 'Completed Sessions',
        value: 'completed',
    },
];
