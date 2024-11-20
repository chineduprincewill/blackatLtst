import React, { useEffect, useRef } from 'react';

interface ClickOutsideWrapperProps {
    children: React.ReactNode;
    onClickOutside?: () => void;
    timeout?: number;
    className?: string;
}

/**
 * @description Handles runs the {@link onClickOutside} function when the user clicks outside of the wrapper
 */
const ClickOutsideWrapper = ({ children, onClickOutside = () => {}, className = '', timeout = 0 }: ClickOutsideWrapperProps) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                if (timeout > 0) {
                    setTimeout(() => {
                        onClickOutside();
                    }, timeout);
                } else {
                    onClickOutside();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} className={className}>
            {children}
        </div>
    );
};

export default ClickOutsideWrapper;
