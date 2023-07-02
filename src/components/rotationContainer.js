import { styled } from "@mui/material/styles"

export const WheelContainer = styled("div")(() => ({
    zIndex: 5,
    pointerEvents: "none",
}))

export const RotationContainer = styled("div", {
    shouldForwardProp: (prop) =>
        prop !== 'startSpinningTime'
        && prop !== 'continueSpinningTime'
        && prop !== 'stopSpinningTime'
        && prop !== 'startRotationDegrees'
        && prop !== 'finalRotationDegrees'
})(props => {
    return ({
        transform: `rotate(${props.startRotationDegrees}deg)`,
        "@keyframes spin": {
            "0%": {
                transform: `rotate(${props.startRotationDegrees}deg)`,
            },
            "100%": {
                transform: `rotate(${props.startRotationDegrees + 360}deg)`,
            },
        },
        "@keyframes continueSpin": {
            "0%": {
                transform: `rotate(${props.startRotationDegrees}deg)`,
            },
            "100%": {
                transform: `rotate(${props.startRotationDegrees + 360}deg)`,
            },
        },
        "@keyframes stopSpin": {
            "0%": {
                transform: `rotate(${props.startRotationDegrees}deg)`,
            },
            "100%": {
                transform: `rotate(${1440 + props.finalRotationDegrees}deg)`,
            },
        },
    })
})

export const NonDraggableImage = styled("img")(() => ({
    "WebkitUserDrag": "none",
    "KhtmlUserDrag": "none",
    " MozUserDrag": "none",
    " OUserDrag": "none",
    userDrag: "none",
}))

export const WheelSelectorImage = styled(NonDraggableImage)(() => ({
    zIndex: 5,
    width: "17%",
    right: "6px",
    top: "15px",
}))


export const getRotationDegrees = (
    prizeNumber,
    numberOfPrizes
) => {
    const degreesPerPrize = 360 / numberOfPrizes;

    const initialRotation = 270 + degreesPerPrize / 2;

    const randomDifference = (-1 + Math.random() * 2) * degreesPerPrize * 0.35;

    const prizeRotation =
        degreesPerPrize * (numberOfPrizes - prizeNumber) -
        initialRotation +
        randomDifference;

    const finalValue = numberOfPrizes - prizeNumber > numberOfPrizes / 2
        ? -360 + prizeRotation
        : prizeRotation;

    return finalValue;

};

export const clamp = (min, max, val) =>
    Math.min(Math.max(min, +val), max);