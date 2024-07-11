import { set } from "@mapstore/utils/ImmutableUtils";

import { SAMPLE_SETUP } from "../actions/setup";
import { SAMPLE_CLOSE } from "../actions/close";
import { AVISEE_DRAW } from "../actions/clic";

const initialState = {
    // default counter value
    pluginCfg: {},
    draw: false
};

// reducer
export default function avisee (state = initialState, action) {
    switch (action.type) {
        case SAMPLE_SETUP:
            return set("pluginCfg", action.cfg, state);
        case SAMPLE_CLOSE:
            return set("pluginCfg", {}, state);
        case AVISEE_DRAW:
            return set("draw", action.activate, state);
        default:
            return state;
    }
}
