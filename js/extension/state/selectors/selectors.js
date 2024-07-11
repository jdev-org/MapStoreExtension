import { CONTROL_NAME } from "@js/extension/constants/main";

export function enable(state) {
    return (state.controls && state.controls[CONTROL_NAME] && state.controls[CONTROL_NAME].enabled) || (state[CONTROL_NAME] && state[CONTROL_NAME].closing) || false;
}