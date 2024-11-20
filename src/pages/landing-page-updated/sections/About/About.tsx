import React, { useState } from 'react';

import AboutBlackAt from './sections/AboutBlackAt';
import AboutUserTypes from './sections/AboutUserTypes';

export default function About() {
    const [activeTab, setActiveTab] = useState<'blackat' | 'usertype'>('blackat');

    return (
        <div className="container px-4 mx-auto mt-20">
            <div className="flex w-full max-w-screen-sm overflow-auto">
                <button
                    onClick={() => setActiveTab('blackat')}
                    className={`px-6 py-3 whitespace-nowrap rounded-full font-medium text-white ${
                        activeTab === 'blackat' ? 'bg-[#262626]' : 'bg-transparent'
                    }`}
                >
                    About BlackAt
                </button>
                <button
                    onClick={() => setActiveTab('usertype')}
                    className={`px-6 py-3 whitespace-nowrap rounded-full font-medium text-white ${
                        activeTab === 'usertype' ? 'bg-[#262626]' : 'bg-transparent'
                    }`}
                >
                    About our user types
                </button>
            </div>
            <div className="mt-24">
                {activeTab === 'blackat' && <AboutBlackAt />}
                {activeTab === 'usertype' && <AboutUserTypes />}
            </div>
        </div>
    );
}
