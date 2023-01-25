import {connect} from "react-redux";
import { name } from '../../../config';

import { createPlugin } from "@mapstore/utils/PluginsUtils";
import { mapLayoutValuesSelector } from "@mapstore/selectors/maplayout";
import { toggleControl } from "@mapstore/actions/controls";

import ExtensionComponent from "../components/Component";

import { changeZoomLevel } from "@mapstore/actions/map";
import '../assets/style.css';
import sampleExtension from "../reducers/reducers";
import * as epics from '../epics/epics';
import { setNewValue } from "../actions/actions";

const CONTROL_NAME = "sampleExtension";
export default createPlugin(name, {
    component: connect(state => ({
        // selectors
        value: state[CONTROL_NAME] && state[CONTROL_NAME].value,
        active: state.controls && state.controls[CONTROL_NAME] && state.controls[CONTROL_NAME].enabled,
        dockStyle: mapLayoutValuesSelector(state, { height: true, right: true }, true)
    }), {
        // actions
        onClose: toggleControl.bind(null, CONTROL_NAME, null),
        onIncrease: setNewValue,
        changeZoomLevel
    })(ExtensionComponent),
    reducers: {
        sampleExtension: sampleExtension
    },
    epics,
    containers: {
        Toolbar: {
            name: name,
            position: 10,
            text: "INC",
            doNotHide: true,
            action: () => {
                return {
                    type: 'INCREASE_COUNTER'
                };
            },
            priority: 1
        },
        SidebarMenu: {
            name: name,
            position: 10,
            text:"EXT",
            tooltip: "extension.tooltip",
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1
        }
    }
});
