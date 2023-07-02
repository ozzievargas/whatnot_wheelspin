import {
    CONTINUE_SPINNING_TIME,
    START_SPINNING_TIME,
    STOP_SPINNING_TIME,
} from './wheelDefaults';
import React, { useMemo } from 'react';

export function useSpinDuration(spinDuration) {
    const normalizedSpinDuration = useMemo(() => Math.max(0.01, spinDuration), [spinDuration]);
    const startSpinningTime = useMemo(() => START_SPINNING_TIME * normalizedSpinDuration, [START_SPINNING_TIME, normalizedSpinDuration]);
    const continueSpinningTime = useMemo(() => CONTINUE_SPINNING_TIME * normalizedSpinDuration, [CONTINUE_SPINNING_TIME, normalizedSpinDuration]);
    const stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration
    const totalSpinningTime =
        startSpinningTime + continueSpinningTime + stopSpinningTime

    return {
        startSpinningTime,
        continueSpinningTime,
        stopSpinningTime,
        totalSpinningTime,
    }
}