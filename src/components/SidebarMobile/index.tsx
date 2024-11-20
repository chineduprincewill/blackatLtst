import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import usePreventScroll from '@hooks/usePreventScroll';
import { setNotificationModal } from '@state/slices/notificationSlice';

import { useLogoutMutation } from '../../api/authApi';
import MoreCircle from '../../assets/arrow-circle-down.svg';
import Briefcase from '../../assets/briefcase2.svg';
import FeedConnection from '../../assets/feed_connection.svg';
import FeedCreateEvent from '../../assets/feed_create_event.svg';
import FeedEvent from '../../assets/feed_event.svg';
import FeedsFeeds from '../../assets/feed_feed.svg';
import FeedMsg from '../../assets/feed_msg.svg';
import Logout from '../../assets/logout.svg';
import NotificationsIcon from '../../assets/notification-icon-new.svg';
import People from '../../assets/people.svg';
import Settings from '../../assets/settings_1.svg';
import Mentorship from '../../assets/teacher2.svg';
import UserImage from '../../assets/user-image.png';
import Education from '../../assets/video-square.svg';
import { TabIcon } from '../../pages/feeds';
import { logOutUser } from '../../state/slices/authSlice';
import { toggleMobileSidebar } from '../../state/slices/newSidebarSlice';
import { RootState } from '../../state/store';

export const generateProfileIcon = (username: string ) => {
    const words = username.split(' ');
        
    // Map over the array to get the first letter of each word
    const firstLetters = words.map(word => word.charAt(0).toUpperCase());
    
    // Join the first letters into a string and return it
    return firstLetters.join('').toUpperCase();
}

function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (which is FFFFFF in hex)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Ensure the result is always 6 digits (with leading zeros if necessary)
    return '#' + randomColor.padStart(6, '0');
}

export default function SideBarMobile() {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState<boolean>(false);
    const navigate = useNavigate();

    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);

    const isMobileVisible = useSelector((state: RootState) => state.mainSidebar.isMobileVisible);

    const [logout] = useLogoutMutation();
    usePreventScroll({ active: isMobileVisible });

    return (
        <>
            {isMobileVisible && (
                <div className={`flex absolute w-screen h-[calc(100dvh-72px)] overflow-hidden text-3xl bg-white z-[4000000]`}>
                    <div className="w-full">
                        <div onClick={() => dispatch(toggleMobileSidebar())} className="flex items-center pl-5 space-x-3 md:block md:pl-32 md:pt-7">
                            {/**<div className="w-12 h-12 my-3 overflow-hidden rounded-full">
                                <img src={loggedUser.displayImage || UserImage} alt="user image" className="object-cover" />
                            </div>*/}
                            <div className={`flex max-w-max justify-center items-center border border-gray-400 rounded-full p-2 text-4xl`} style={{ backgroundColor : getRandomHexColor() }}>
                                {generateProfileIcon((loggedUser.firstName+" "+loggedUser.lastName))}
                            </div>
                            <div>
                                <h2 className="text-sm font-medium md:text-xl capitalize">
                                    {loggedUser.firstName} {loggedUser.lastName}
                                </h2>
                                <p className="text-xs text-[#7B7B7B]">
                                    <Link to="/profile">View profile</Link>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between h-[calc(100dvh-144px)]">
                            <div className="p-5 overflow-y-auto md:pl-28 md:py-7 space-y-6 ">
                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/feeds">
                                        <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={FeedsFeeds} />
                                            <h3 className="text-sm font-medium">Feeds</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/messages">
                                        <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={FeedMsg} />
                                            <h3 className="text-sm font-medium">Messages</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/events">
                                        <div className="flex text-[#4E4E4E] items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={FeedEvent} />
                                            <h3 className="text-sm font-medium">Events</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/connections">
                                        <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={FeedConnection} />
                                            <h3 className="text-sm font-medium">My connections</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/notifications">
                                        <div
                                            // onClick={() => dispatch(setNotificationModal({ show: true }))}
                                            className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2"
                                        >
                                            <TabIcon src={NotificationsIcon} />
                                            <h3 className="text-sm font-medium">Notifications</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={() => dispatch(toggleMobileSidebar())}>
                                    <Link to="/settings-mobile/">
                                        <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={Settings} />
                                            <h3 className="text-sm font-medium">Settings</h3>
                                        </div>
                                    </Link>
                                </div>

                                <div
                                    onClick={() => {
                                        setShowMore(!showMore);
                                        // dispatch(toggleMobileSidebar());
                                    }}
                                    className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 "
                                >
                                    <div className={`${!showMore ? 'rotate-180' : ''} w-5 mr-3`}>
                                        <TabIcon src={MoreCircle} />
                                    </div>
                                    <h3 className="text-sm">More</h3>
                                </div>

                                {showMore && (
                                    <>
                                        <div className="bg-[#D9D9D9] h-[1px] my-4" />
                                        <div onClick={() => dispatch(toggleMobileSidebar())} className="text-[#959595]">
                                            <>
                                                <Link to="/mentorship">
                                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 text-[#959595]">
                                                        <TabIcon src={Mentorship} />
                                                        <div className="text-[#959595]">
                                                            <h3 className="text-sm text-[#959595]">Mentorship</h3>
                                                            <p className="text-xs text-[#959595]">Take mentorship, book sessions</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>

                                            <Link to="/village">
                                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                                    <TabIcon src={People} />
                                                    <div className="text-[#959595]">
                                                        <h3 className="text-sm text-[#959595]">My Village</h3>
                                                        <p className="text-xs text-[#959595]">
                                                            Join community of likeminds, connect and create magic
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>

                                            <>
                                                <Link to="/jobs">
                                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                                        <TabIcon src={Briefcase} />
                                                        <div>
                                                            <h3 className="text-sm text-[#959595]">Jobs</h3>
                                                            <p className="text-xs text-[#959595]">Manage your job activities</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>

                                            <>
                                                <Link to="/masterclass">
                                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                                        <TabIcon src={Education} />
                                                        <div>
                                                            <h3 className="text-sm text-[#959595]">Masterclass</h3>
                                                            <p className="text-xs text-[#959595]">Select a Masterclass</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="w-full px-5 py-2">
                                <div
                                    className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2"
                                    onClick={() => {
                                        // dispatch(toggleMobileSidebar());
                                        logout()
                                            .unwrap()
                                            .finally(() => {
                                                toast.success('Logout successful');
                                                dispatch(logOutUser());
                                                navigate('/login');
                                            });
                                    }}
                                >
                                    <TabIcon src={Logout} />
                                    <h3 className="text-sm font-medium">Logout</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
