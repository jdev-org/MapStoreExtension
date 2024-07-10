import { set } from "@mapstore/utils/ImmutableUtils";

import { SAMPLE_SETUP } from "../actions/setup";
import { SAMPLE_CLOSE } from "../actions/close";

const initialState = {
    // default counter value
    pluginCfg: {}
};

// reducer
export default function sampleExtension (state = initialState, action) {
    switch (action.type) {
        case SAMPLE_SETUP:
            return set("pluginCfg", action.cfg, state);
        case SAMPLE_CLOSE:
            return set("pluginCfg", {}, state);
        default:
            return state;
    }
}
