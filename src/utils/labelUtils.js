import {
    getContrastText,
    parseRGB,
} from './colorUtils';

/**
 * takes in the chartjs obj ref, retrieves the chart section and returns a contrast text.
 * @param {object ref} ctx is the chartjs context
 * returns hex color
 */
export const generateChartLabelColor = (ctx) => {
    const { dataset: { backgroundColor }, dataIndex } = ctx;
    const col = backgroundColor[dataIndex];

    if (col) {
        const hexcolor = col.replace("#", "")
        const [r, g, b] = parseRGB(hexcolor)

        return getContrastText(r, g, b);
    }

    return "#000000";
}

/**
 * gets chartjs obj ref, retrieves the chart section and returns the label rotation
 * @param {object ref} ctx is the chartjs context
 * returns label rotation as int in degrees
 */
export const getChartLabelRotation = (ctx) => {
    const { dataIndex, dataset: { data } } = ctx;
    const valuesBefore = data.slice(0, dataIndex).reduce((a, b) => a + b, 0);
    const sum = data.reduce((a, b) => a + b, 0);
    const rotation = ((valuesBefore + data[dataIndex] / 2) / sum * 360);

    return rotation < 180 ? rotation - 90 : rotation + 90;
}

export const formatLabel = (_val, ctx) => {
    const { dataset: { data } } = ctx;
    if (data.length > 999) return "";

    return ctx.chart.data.labels[ctx.dataIndex];
}