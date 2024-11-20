import React from 'react';
import { WyMessenger } from '@weavy/uikit-react';
import { useDispatch } from 'react-redux';
import { eventReceived } from '../../state/slices/messageEventsSlice';
import { useMessagingContext } from '../../hooks/useMessagingProvider';
import { useAppSelector } from '../../state/store';

export const MessengerView: React.FC = () => {
    const dispatch = useDispatch();
    const { handleMessageEvent } = useMessagingContext();
    const conversationId = useAppSelector((state) => state.conversationId.conversationId);

    const handleEvents = (event: any) => {
        const eventInfo = {
            type: event.type,
            isTrusted: event?.isTrusted,
            detail: event?.detail,
        };

        dispatch(
            eventReceived({
                type: eventInfo.type,
                payload: JSON.stringify(eventInfo),
            }),
        );

        handleMessageEvent(eventInfo);
    };

    return (
        <div className="h-full w-full p-4">
            <WyMessenger
                features={{
                    attachments: true,
                    cloudFiles: true,
                    comments: true,
                    confluence: true,
                    embeds: true,
                    typing: true,
                    meetings: false,
                    mentions: true,
                    polls: false,
                    previews: true,
                    reactions: true,
                    receipts: true,
                    thumbnails: true,
                }}
                className="h-[85vh] w-full"
                unselectable="off"
                contentEditable={true}
                onWyMessageCreated={handleEvents}
                onWyConversationMarked={handleEvents}
                onSelect={handleEvents}
                conversationId={conversationId}
                autoCorrect="on"
                spellCheck
                style={
                    {
                        // Main theme
                        '--wy-theme-color': '#ff0000',

                        // Appbar styling
                        '--wy-appbar-background': '#7B7B7B7B', // Setting the gray color with opacity
                        '--wy-appbar-backdrop-filter': 'blur(8px)',
                        '--wy-appbar-opacity-backdrop': '48%', // Matching the 7B opacity
                        '--wy-appbar-border-bottom': '1px solid #E5E7EB',
                        '--wy-appbar-color': '#000000',
                        '--wy-appbar-height': 'calc(max(1lh, 2.5rem) + 1rem)',

                        // Avatar styling (seen in conversation list)
                        '--wy-avatar-border-radius': '50%',
                        '--wy-avatar-font-size': '0.875rem',
                        '--wy-component-avatar-size': 'calc(1.5 * var(--wy-rem, 1rem))',

                        // Button styling (for icon buttons)
                        '--wy-button-border-radius': '0.375rem',
                        '--wy-button-padding-x': '0.75rem',
                        '--wy-button-padding-y': '0.375rem',

                        // Search input styling
                        '--wy-input-border-radius': '0.5rem',
                        '--wy-input-border-width': '1px',
                        '--wy-input-padding-x': '1rem',
                        '--wy-input-padding-y': '0.5rem',
                        '--wy-input-background': '#FFFFFF',

                        // Conversation list styling
                        '--wy-conversation-list-background': '#FFFFFF',
                        '--wy-conversation-list-border-right': '1px solid #E5E7EB',
                        '--wy-conversation-list-padding': '0.5rem',

                        // Typography
                        '--wy-font-family': "'Plus Jakarta Sans', sans-serif",
                        '--wy-font-size': '0.875rem',
                        '--wy-line-height': '1.5',
                        '--wy-font-weight': '400',
                        '--wy-font-weight-bold': '600',

                        // General spacing
                        '--wy-padding': '0.5rem',
                        '--wy-gap': '0.5rem',
                        '--wy-rem': '1rem',

                        // Surface colors
                        '--wy-surface-1-mix': '5%',
                        '--wy-surface-2-mix': '8%',
                        '--wy-surface-3-mix': '11%',
                        '--wy-surface-4-mix': '12%',

                        // Message styling
                        '--wy-message-padding': '0.75rem',
                        '--wy-message-border-radius': '0.5rem',

                        // Icon styling
                        '--wy-icon-size': '1.25rem',
                        '--wy-button-icon': '#666666',
                    } as React.CSSProperties
                }
            />
        </div>
    );
};
