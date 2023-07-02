import React, { useEffect, useRef } from 'react';

export const useEventListener = (eventName, handler, element = window) => {
    console.log('%c 🍛 eventName, handler, element: ', 'font-size:20px;background-color: #465975;color:#fff;', eventName, handler, element);
    // Create a ref that stores handler
    const savedHandler = useRef();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(
        () => {
            console.log('%c 🍝 useEffect: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;');
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;
            // Create event listener that calls handler function stored in ref
            const eventListener = (event) => savedHandler.current(event);
            // Add event listener
            element.addEventListener(eventName, eventListener);
            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
}