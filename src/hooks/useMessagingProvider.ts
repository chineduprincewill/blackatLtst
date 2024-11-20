// MessagingContext.ts
import { createContext, useContext } from 'react';

interface MessagingContextType {
    isFetching: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleMessageEvent: (event: any) => Promise<void>;
    unreadNotificationsCount: number;
}

export const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const useMessagingContext = () => {
    const context = useContext(MessagingContext);
    if (!context) {
        throw new Error('useMessagingContext must be used within a MessagingProvider');
    }
    return context;
};