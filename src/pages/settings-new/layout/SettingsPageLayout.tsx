import { Outlet } from 'react-router-dom';

import SettingsSidebar from '../SettingsSidebar';

export default function SettingsPageLayout() {
    return (
        <div className="flex items-start h-full pb-5">
            <SettingsSidebar />
            <div className="w-full h-full min-h-screen md:pt-12 md:pl-12">
                <Outlet />
            </div>
        </div>
    );
}
