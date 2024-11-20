import React from 'react';

export default function usePreventScroll(props: { active: boolean } | void) {
    React.useEffect(() => {
        if (props?.active) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'auto';
            };
        }
    }, [props?.active]);

    React.useEffect(() => {
        if (!props) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'auto';
            };
        }
    }, []);

    return null;
}
