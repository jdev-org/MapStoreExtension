import React from "react";
import { connect } from "react-redux";
import { name } from "../../../config";
import { Glyphicon } from "react-bootstrap";

import { createPlugin } from "@mapstore/utils/PluginsUtils";
import { mapLayoutValuesSelector } from "@mapstore/selectors/maplayout";
import { toggleControl } from "@mapstore/actions/controls";
import pluginIcon from "../assets/trophy-line.svg";
import MainPanel from "../components/Component";
import "../assets/style.css";
import sampleExtension from "../state/reducers/reducers";

import * as epics from "../state/epics/register";
import { setup } from "../state/actions/setup";
import init from "../utils/init";

import { CONTROL_NAME } from "../constants/main";

const compose = (...functions) => {
    return (args) => functions.reduceRight((arg, fn) => fn(arg), args);
};

const component = compose(
    connect(
        // selectors - mapStateToProps
        (state) => ({
            message: state[CONTROL_NAME].pluginCfg["message"],
            // selectors
            value: state[CONTROL_NAME] && state[CONTROL_NAME].value,
            active:
                state.controls &&
                state.controls[CONTROL_NAME] &&
                state.controls[CONTROL_NAME].enabled,
            dockStyle: mapLayoutValuesSelector(
                state,
                { height: true, right: true },
                true
            ),
            pluginIcon,
        }),
        {
            // actions - mapDispatchToProps
            onClose: toggleControl.bind(null, CONTROL_NAME, null),
        }
    ),
    compose(
        // on setup / close
        connect(() => ({}), {
            setup,
        }),
        init()
    )
)(MainPanel);

export default createPlugin(name, {
    component: component,
    reducers: {
        sampleExtension: sampleExtension,
    },
    epics: { ...epics },
    containers: {
        SidebarMenu: {
            name: "sampleExtension",
            position: 10,
            icon: <img src={pluginIcon} className="iconSize" />,
            tooltip: "extension.tooltip",
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1,
        },
    },
});
