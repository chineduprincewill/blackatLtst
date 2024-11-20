import React from 'react';

import SettingsLayout from '../../SettingsLayout';
import Accordion from './Accordion';

export default function Faqs() {
    return (
        <SettingsLayout pageHeader="FAQs" subtitle="Control who can view your profile information">
            <Accordion items={ITEMS} />
        </SettingsLayout>
    );
}

const ITEMS = [
    {
        title: 'What is the BlackAt platform?',
        body: (
            <p>
                BlackAt is a platform designed to bridge the accessibility gap between different professional tiers, ranging from creative newcomers
                to top-tier executives. It facilitates growth, learning, and opportunity creation through user interactions.
            </p>
        ),
    },
    {
        title: 'What are the key features of BlackAt?',
        body: (
            <ul>
                <li>
                    - <strong>User Tier Level System:</strong> Users are categorized into Executives, Vendors, and Creatives based on their
                    professional status.
                </li>
                <li>
                    - <strong>User Connection, Interaction, and Engagement:</strong> Features include a follow/follower system, villages and
                    communities, and direct messaging.
                </li>
                <li>
                    - <strong>Feed Activity System:</strong> A dynamic feed displaying user activities with features like likes, comments, reposts,
                    and save post.
                </li>
                <li>
                    - <strong>Mentorship:</strong> One-on-one live virtual sessions for personal growth and access to industry leaders.
                </li>
                <li>
                    - <strong>Masterclass:</strong> Recorded sessions from executives detailing achievements, insights, and professional tips.
                </li>
                <li>
                    - <strong>Job Opportunities:</strong> Curated job listings tailored to the needs and growth ambitions of Creatives and Vendors.
                </li>
            </ul>
        ),
    },
    {
        title: 'Who can join the BlackAt platform?',
        body: (
            <p>
                BlackAt is open to users from different professional stages, including entry-level professionals (Creatives), mid-level professionals
                (Vendors), and top-tier executives (Executives).
            </p>
        ),
    },
    {
        title: 'How does the User Tier Level System work?',
        body: (
            <ul>
                <li>
                    - <strong>Executives:</strong> Top-tier professionals who can host mentorship sessions and masterclass videos.
                </li>
                <li>
                    - <strong>Vendors:</strong> Mid-level professionals bridging the gap between Executives and Creatives.
                </li>
                <li>
                    - <strong>Creatives:</strong> Entry-level professionals focused on skill and career development.
                </li>
            </ul>
        ),
    },
    {
        title: 'What is the purpose of the Feed Activity System?',
        body: (
            <p>
                The Feed Activity System keeps users engaged and informed about the community's pulse through user activities based on connections and
                location, similar to LinkedIn or Twitter.
            </p>
        ),
    },
    {
        title: 'How does the Mentorship feature work?',
        body: (
            <p>
                Mentorship involves one-on-one live sessions conducted virtually, allowing lower-tier users to learn directly from industry leaders,
                fostering personal growth and professional development.
            </p>
        ),
    },
    {
        title: 'What is the Masterclass feature?',
        body: (
            <p>
                The Masterclass feature provides recorded sessions from various executives, offering insights into their achievements and professional
                tips, with a call-to-action for booking mentorships.
            </p>
        ),
    },
    {
        title: 'How are job opportunities integrated into BlackAt?',
        body: (
            <p>
                BlackAt curates and lists job opportunities tailored to the needs and growth ambitions of Creatives and Vendors, ensuring continuous
                career advancement options.
            </p>
        ),
    },
    {
        title: 'What is the overall goal of BlackAt?',
        body: (
            <p>
                BlackAt aims to democratize professional growth and create a seamless bridge between career stages, fostering an environment where
                every professional can thrive and progress.
            </p>
        ),
    },
];
