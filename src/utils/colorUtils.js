/**
 * Takes in an RGB and returns a contrast color of black or white.
 * @param {string} r 
 * @param {string} g 
 * @param {string} b 
 * @returns black or white
 */
export const getContrastText = (r, g, b) => {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "#000000" : "#ffffff"
}

/**
 * Takes in a hex color value and returns the rgb as an array.
 * @param {string} hex 
 * @returns array with r,g,b values
 */
export const parseRGB = (hex) => {
    const hexcolor = hex.replace("#", "")
    const r = parseInt(hexcolor.substr(0, 2), 16)
    const g = parseInt(hexcolor.substr(2, 2), 16)
    const b = parseInt(hexcolor.substr(4, 2), 16)

    return [r, g, b];
};