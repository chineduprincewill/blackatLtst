import './Villages/villagesstyle.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '@components/PageContainer';
import { toggleJoinRequestModal, togglePublishCommunityModal, toggleShowInviteMembersModal } from '@state/slices/modals';
import { RootState } from '@state/store';

import PlusIcon from '../../assets/plus-circle-icon.svg';
import TopCommunities from './Communities/TopCommunities';
import CreateCommunity from './components/CreateCommunity';
import JoinRequestModal from './components/JoinRequestModal';
import SendInvite from './components/SendInvite';
import TopVillages from './Villages/TopVillages';

export default function MyVillage() {
    const dispatch = useDispatch();

    const showCreateModal = useSelector((state: RootState) => state.modals.showCreateCommunityModal);
    const showSendInviteModal = useSelector((state: RootState) => state.modals.showInviteMembersModal);
    const showJoinRequestModal = useSelector((state: RootState) => state.modals.showRequestJoinPlatformModal);

    const handleModal = () => {
        dispatch(togglePublishCommunityModal());
    };

    return (
        <div className="bg-[#FAFAFA]">
            <PageContainer
                back
                title="My Village"
                className="village-container"
                rightContent={
                    <>
                        <div className="hidden md:block">
                            <div onClick={handleModal} className="bg-[#FF0000] text-white px-5 py-3 rounded-3xl">
                                <button>Create a community</button>
                            </div>
                        </div>
                        <div onClick={handleModal} className="md:hidden">
                            <img src={PlusIcon} alt="add village icon" />
                        </div>
                    </>
                }
            >
                <div className="space-y-80">
                    <TopVillages />

                    <TopCommunities />
                </div>
            </PageContainer>

            {showCreateModal && <CreateCommunity onClose={handleModal} />}
            {showSendInviteModal && <SendInvite onClose={() => dispatch(toggleShowInviteMembersModal())} />}
            {showJoinRequestModal && <JoinRequestModal onClose={() => dispatch(toggleJoinRequestModal())} />}
        </div>
    );
}
