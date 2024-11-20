import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from '../../state/store';
import ProfileDropdown from '../ProfileDropdown';
import SideBarMobile from '../SidebarMobile';
import SideBar from '../SideNavigation';

const NavigationContainerWithSidebar = () => {
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);
    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);
    const isVisible = useSelector((state: RootState) => state.mainSidebar.isVisible);
    console.log(isVisible);

    // Function to dynamically apply Tailwind classes based on active state
    // const activeStyle = (itemName: string) => {
    //     return `cursor-pointer px-4 py-2 rounded-full ${active === itemName ? 'bg-gray-200' : 'bg-transparent'}`;
    // };

    return (
        <>
            {/* {showProfileDropdown && <ProfileDropdown user={loggedUser} />} */}
            <div className="w-screen">
                {/* <NavBar user={user} pageTitle={pageTitle} /> */}

                <div className="grid w-screen grid-cols-4 gap-0 lg:grid-cols-5 md:px-28">
                    <div className="flex-shrink-0 hidden md:flex md:overflow-hidden max-h-[90vh] overflow-y-auto col-span-1">
                        <SideBar />
                    </div>

                    {/* <div className="flex flex-shrink-0 w-screen md:hidden md:overflow-hidden"> */}
                    <SideBarMobile />
                    {/* </div> */}

                    <div className="w-full col-span-4 md:col-span-3 lg:col-span-4">
                        <div className="w-full max-h-[90vh] overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavigationContainerWithSidebar;
