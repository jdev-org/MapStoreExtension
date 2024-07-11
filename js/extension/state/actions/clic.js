export const AVISEE_DRAW = "AVISEE:DRAW";
/**
 * start draw mode
 * @returns {}
 */
export const startDraw = (activate) => ({
    type: AVISEE_DRAW,
    activate,
});