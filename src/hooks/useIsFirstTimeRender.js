import { useRef } from 'react';

const useIsFirstTimeRender = () => {
    const isFirstRenderRef = useRef(true);

    if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false;
        return true;
    } else {
        return false;
    }
};

export default useIsFirstTimeRender;
