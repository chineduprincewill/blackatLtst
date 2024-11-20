import './LandingPage.styles.scss';
import './do-not-delete.scss';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

export default function LandingPage() {
    const [isLightMode, setIsLightMode] = useState(false);

    function toggleLightMode() {
        // setIsLightMode((prev) => !prev);
    }

    return (
        <div className={`landing-page ${isLightMode ? 'light-mode' : ''}`}>
            <Header isLightMode={isLightMode} toggleLightMode={toggleLightMode} />
            <main className="">
                <div className="mx-auto">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
