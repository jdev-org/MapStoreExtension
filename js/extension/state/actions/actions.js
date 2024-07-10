export const SAMPLE_INCREASE_COUNTER = "SAMPLE_EXTENSION:INCREASE_COUNTER";

/**
 * Set the style of highlight
 * @param {string} styleType the type of the style, one of selected/default
 * @param {object} value the style object ({color, fillColor, ...})
 */
export const setNewValue = (value) => ({
    type: SAMPLE_INCREASE_COUNTER,
    value
});