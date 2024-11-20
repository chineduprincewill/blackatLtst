import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChatTokenQuery } from '../../api/authApi';
import { setUnreadNotificationsCount } from '../../state/slices/notificationCount';
import { useWeavy } from '@weavy/uikit-react';
import { RootState } from '../../state/store';
import { MessagingContext } from '../../hooks/useMessagingProvider';
import { toast } from 'react-toastify';

const WEAVY_URL = 'https://fe2cece70f0b47a9a5cc80e18e40fd0b.weavy.io';

interface MessagingProviderProps {
    children: React.ReactNode;
}

export const MessagingProvider: React.FC<MessagingProviderProps> = ({ children }) => {
    const dispatch = useDispatch();
    const tokenRef = useRef('');
    const { data: chatTokenData, isFetching, refetch } = useGetChatTokenQuery(null);
    const lastEvent = useSelector((state: RootState) => state.messageEvents.lastEvent);
    const loggedUser = useSelector((state: RootState) => state.createAccount.user);
    const unreadNotificationsCount = useSelector((state: RootState) =>
        state.notificationCount.unreadCount
    );

    const fetchUnreadCount = useCallback(async (token: string) => {
        try {
            const response = await fetch(`${WEAVY_URL}/api/conversations/badge`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch unread count');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching unread count:', error);
            return null;
        }
    }, []);

    const tokenFactory = useCallback(async () => {
        if (!tokenRef.current) {
            const result = await refetch();
            if (result.data?.data?.chatToken) {
                tokenRef.current = result.data.data.chatToken;
            }
        }
        return tokenRef.current;
    }, [refetch]);

    const handleMessageEvent = useCallback(async (event: any) => {
        const parsedEvent = typeof event === 'string' ? JSON.parse(event) : event;

        if (tokenRef.current) {
            const unreadData = await fetchUnreadCount(tokenRef.current);
            if (unreadData?.private !== undefined) {
                dispatch(setUnreadNotificationsCount(unreadData.private));
            }
        }

        if (parsedEvent?.type === 'wy:message_created' &&
            parsedEvent?.detail?.actor?.uid !== loggedUser?.id) {
            toast.info('New Message Received', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }, [dispatch, fetchUnreadCount, loggedUser?.id]);

    const weavyConfig = useMemo(() => ({
        url: WEAVY_URL,
        tokenFactory,
        reactions: ['😍', '😎', '😉', '👍', '🤣', '😢', '😮', '❤️', '🔥', '🎉', '🙏', '👏'],
        scrollToBottom: true,
        scrollBehaviour: false,
    }), [tokenFactory]);

    useWeavy(weavyConfig);

    useEffect(() => {
        if (lastEvent) {
            handleMessageEvent(lastEvent.payload);
        }
    }, [lastEvent, handleMessageEvent]);

    const contextValue = useMemo(() => ({
        isFetching,
        handleMessageEvent,
        unreadNotificationsCount
    }), [isFetching, handleMessageEvent, unreadNotificationsCount]);

    return (
        <MessagingContext.Provider value= { contextValue } >
        { children }
        </MessagingContext.Provider>
    );
};