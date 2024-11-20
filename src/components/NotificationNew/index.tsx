import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationType } from '@type/notifications';

import { useMarkAllNotificationsAsReadMutation, useViewNotificationsQuery } from '../../api/notificationApi';
import CloseIcon from '../../assets/close.svg';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import { SmallIcon } from '../../pages/profile';
import { setNotificationModal } from '../../state/slices/notificationSlice';
import { RootState } from '../../state/store';
import { Circle } from '../Circle';
// import { useGetUnreadNotificationsCountQuery } from '../../api/notificationApi';
import ClickOutsideWrapper from '../ClickOutWrapper';
import Spinner from '../Spinner';
import SingleNotification from './SingleNotification';

const NotificationsNew = () => {
    const { show } = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();

    const {
        data: getNotifications,
        isLoading: getNotificationsLoading,
        refetch,
        isSuccess: getNotificationsSuccess,
    } = useViewNotificationsQuery(null, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (show) {
            refetch();
        }

        // Update notifications state directly with fetched data on successful refetch
        // if (getNotificationsSuccess) {
        //     setNotificationsState(getNotifications?.data.notifications || []); // Handle potential empty data
        // }
    }, [show, refetch, getNotificationsSuccess]);

    return (
        <>
            <ClickOutsideWrapper onClickOutside={() => dispatch(setNotificationModal({ show: false }))}>
                {show && <NotificationList />}
            </ClickOutsideWrapper>
        </>
    );
};

export default NotificationsNew;

interface Props {
    notificationsCount: number;
    handleMarkAllAsRead: () => void;
    getNotificationsLoading: boolean;
    notifications: NotificationType[];
}

export const NotificationList = () => {
    const dispatch = useDispatch();

    const notificationsCount = useSelector((state: RootState) => state.notifications.count);
    console.log('All notifications from notifications dropdown');

    const [notificationsState, setNotificationsState] = useState<NotificationType[]>([]);

    const {
        data: getNotifications,
        isLoading: getNotificationsLoading,
        refetch,
        isSuccess: getNotificationsSuccess,
    } = useViewNotificationsQuery(null, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    const [markAllAsRead, { isSuccess: allAsReadSuccess }] = useMarkAllNotificationsAsReadMutation();

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead(null).unwrap();
        } catch (error) {
            console.error('Error in handling notification action', error);
        }
    };

    useEffect(() => {
        if (allAsReadSuccess) {
            refetch();
        }
    }, [allAsReadSuccess, refetch]);

    console.log('Notifications data');
    console.log(getNotifications);
    const notifications = getNotifications?.data.notifications || [];
    console.log('THE NOTIFICATIONS', notifications);

    const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length;

    return (
        <div className="relative md:absolute md:right-7 md:top-20 z-50 rounded-xl w-full md:shadow-md md:w-[452px] bg-white py-1 px-5 md:p-5">
            {notifications && notifications.length > 0 ? (
                <>
                    <div className="items-center justify-between md:flex">
                        <h3 className="pb-5 text-2xl font-medium text-center md:text-left">Notifications</h3>
                        <button
                            className="items-center justify-center hidden w-5 h-5 border border-solid rounded-full md:flex"
                            onClick={() => dispatch(setNotificationModal({ show: false }))}
                        >
                            <SmallIcon size={10} src={CloseIcon} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between md:gap-12 md:pt-5 border-b border-solid md:border-[#BEBEBE] pb-3">
                        <div className="bg-[#E9E9E9] flex items-center py-1 px-2 rounded-full">
                            <p className="text-[#A2A2A2]">All</p>

                            {unreadNotificationsCount > 0 && (
                                <div
                                    className={`bg-red-500 text-white rounded-full ml-1 p-1 text-[9px] ${
                                        unreadNotificationsCount > 10 ? '' : 'text-center'
                                    }`}
                                >
                                    {unreadNotificationsCount}
                                </div>
                            )}
                        </div>
                        <p onClick={handleMarkAllAsRead} className="text-xs font-medium text-blue-400 cursor-pointer">
                            Mark all as read
                        </p>
                    </div>

                    <div className="w-full mt-7 h-[70vh] overflow-y-scroll">
                        {getNotificationsLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <SingleNotification
                                    link={notification.resource}
                                    title={notification.title}
                                    id={notification.id}
                                    message={notification.message}
                                    read={notification.read}
                                    time={notification.createdAt}
                                    key={notification.id}
                                    icon={notification.icon}
                                    count={notification.count}
                                />
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div>No Notifications right now</div>
            )}
        </div>
    );
};
