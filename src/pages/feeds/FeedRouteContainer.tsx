import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CommingSoon } from '../profile/CommingSoon';
import { RightFeedColumn } from './components/RightFeedColumn';

export const FeedRouteContainer = () => {
    const [pane, setShowPane] = useState('');
    const [showComingSoonModal, setShowComingSoonModal] = useState(false);

    return (
        <div className="main">
            <div className="flex-row __feeds centralize-x">
                <div className="grid justify-between w-full grid-cols-10" style={{ position: 'relative' }}>
                    <div className="w-full col-span-10 lg:col-span-6">
                        <Outlet />
                    </div>
                    <div className="hidden col-span-4 lg:block">
                        <RightFeedColumn showEvents={() => setShowPane('events')} />
                    </div>
                </div>
            </div>
            <CommingSoon
                externalControl={{
                    show: showComingSoonModal,
                    close: () => setShowComingSoonModal(false),
                }}
            />
        </div>
    );
};
