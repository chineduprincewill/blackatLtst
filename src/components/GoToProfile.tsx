import React, { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../state/store';

interface GoToProfileProps {
    className?: string;
    username?: string;
    userId?: string;
    children: React.ReactNode;
}

export const GoToProfile = ({ children, username, userId, className = '' }: GoToProfileProps) => {
    const { username: loggedInUsername } = useAppSelector((state) => state.createAccount.user);

    // const redirectLink = username === loggedInUsername ? '/profile' : `/userprofile/${userId}/${username}`;
    const redirectLink = username === loggedInUsername ? '/profile' : `/userprofile/${username}`;

    return (
        <Link to={redirectLink} className={'cursor-pointer' + ' ' + className}>
            {children}
        </Link>
    );
};
