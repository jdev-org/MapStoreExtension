import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";
import DockPanel from '@mapstore/components/misc/panels/DockablePanel';
import { toggleControl } from "@mapstore/actions/controls";
import Tabou2MainTabs from './Tabou2MainTabs';
import Tabou2MainToolContainer from './Tabou2MainToolContainer';
import { CONTROL_NAME } from '../../constants';
import "@js/extension/css/tabou.css";
import { updateVectorTabouStyle } from "../../actions/tabou2";
import DockContainer from '@mapstore/components/misc/panels/DockContainer';
import ContainerDimensions from "react-container-dimensions";
/**
 * Main tabou2 plugin panel (parent on top)
 * @param {any} param
 * @returns component
 */
function Tabou2MainPanel({
    enabled,
    onClose = () => { },
    dockStyle,
    dockWidth,
    ...props
}) {
    if (!enabled) return null;
    const helpLink = props.help && props.help.url;
    return (
        <DockContainer
            dockStyle={dockStyle}
            id="urbamap-container"
            style={{pointerEvents: "none"}}
        >
            <ContainerDimensions
                className="tabou-main-panel">
                {({ width }) => (<DockPanel
                    open
                    size={dockWidth / width > 1 ? width : dockWidth}
                    style={dockStyle}
                    glyph="th"
                    bsStyle="primary"
                    title={<Message msgId="tabou2.windowTitle" />}
                    onClose={onClose}
                    dock
                    fade
                    zIndex={1000}
                    clickOutEnabled={false}
                    position="right"
                    header={
                        <Row key="ms-tabou-navbar" className="ms-row-tab">
                            {
                                helpLink ? (<a
                                    href={helpLink}
                                    target="_blank"
                                    title={props.i18n(props.messages, "tabou2.helpTooltip")}
                                    className="tabou-help-link">
                                    <Glyphicon glyph="question-sign" /> <Message msgId="tabou2.help" />
                                </a>) : ""
                            }
                            <Col xs={12} style={{ marginTop: "10px" }}>
                                {<Tabou2MainTabs {...props} />}
                            </Col>
                        </Row>
                    }>
                    <Tabou2MainToolContainer {...props} />
                </DockPanel>)}
            </ContainerDimensions>
        </DockContainer>
    );
}
// connect to store / redux
export default connect(state => ({
    enabled: state?.controls && state?.controls[CONTROL_NAME] && state?.controls[CONTROL_NAME].enabled || false
}), {
    onClose: toggleControl.bind(null, CONTROL_NAME, null),
    updateVectorTabouStyle: updateVectorTabouStyle
})(Tabou2MainPanel);
