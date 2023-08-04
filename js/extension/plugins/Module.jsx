import React from "react";
import {connect} from "react-redux";
import { name } from '../../../config';
import { toggleControl } from "@mapstore/actions/controls";
import {createPlugin} from "@mapstore/utils/PluginsUtils";
import ExtensionComponent from "../components/Component";
import { CONTROL_NAME } from "../constants";

// import '../assets/style.css';

import { getAuthLevel, isActive } from "../stateManagement/selector/selector";
import reducers from "../stateManagement/reducers/reducers";
import { setup, close } from "../stateManagement/actions/actions";
import * as actions from "../stateManagement/actions/actions";
import * as epics from "../stateManagement/epics/epicsDistributor";
import init from "./init";
import { Glyphicon } from "react-bootstrap";

const compose = (...functions) => {
    return (args) => functions.reduceRight((arg, fn) => fn(arg), args);
};

const component = compose(
    connect(
        // selectors - mapStateToProps
        (state) => ({
            // selectors
            active: isActive(state),
            authorized: getAuthLevel(state),
        }),
        {
            // actions - mapDispatchToProps
            onClose: toggleControl.bind(null, CONTROL_NAME, null),
            ...actions,
        }
    ),
    compose(
        // on setup / close
        connect(() => ({}), {
            setup,
            close,
        }),
        init()
    )
)(ExtensionComponent);


import '../assets/style.css';

export default createPlugin(name, {
    component: component,
    reducers: { docsManager: reducers },
    epics: {...epics},
    containers: {
        Toolbar: {
            name: "docsManager",
            position: 10,
            icon: <Glyphicon glyph="list"/>,
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1
        }
    }
});
