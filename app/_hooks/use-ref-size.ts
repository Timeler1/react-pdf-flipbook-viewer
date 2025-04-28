import { useRef, useEffect, useState } from 'react';

const useRefSize = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const handleResize = () => {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    };

    useEffect(() => {
        handleResize(); // Initial width calculation

        const handleOrientationChange = () => {
            handleResize();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    const refreshSize = () => {
        handleResize();
    };

    return { ref, ...size, refreshSize };
};

export default useRefSize;