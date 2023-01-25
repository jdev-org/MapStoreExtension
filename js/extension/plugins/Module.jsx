import {connect} from "react-redux";
import { name } from '../../../config';

import { createPlugin } from "@mapstore/utils/PluginsUtils";
import { mapLayoutValuesSelector } from "@mapstore/selectors/maplayout";
import { toggleControl } from "@mapstore/actions/controls";

import ExtensionComponent from "../components/Component";

import { changeZoomLevel } from "@mapstore/actions/map";
import '../assets/style.css';
import tabou2 from "../reducers/reducers";
import * as epics from '../epics/epics';
import { setNewValue } from "../actions/actions";

const CONTROL_NAME = "tabou2";
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
        tabou2: tabou2
    },
    epics,
    containers: {
        Toolbar: {
            name: name,
            position: 10,
            text: "EXT",
            doNotHide: true,
            tooltip: "tabou2.btnTooltip",
            action: toggleControl.bind(null, CONTROL_NAME, null),
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
