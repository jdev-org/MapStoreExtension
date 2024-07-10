import React from "react";
import Message from "@mapstore/components/I18N/Message";
import ResponsivePanel from "@mapstore/components/misc/panels/ResponsivePanel";
import { Row, Grid, Col } from "react-bootstrap";
import { SIZE } from "../constants/main";

const MainPanel = ({ active, dockStyle, onClose, message }) => {
    return (
        <ResponsivePanel
            containerStyle={dockStyle}
            containerId="sample-extension-container"
            containerClassName="dock-container"
            className="sample-extension-dock-panel"
            open={active}
            position="right"
            size={SIZE}
            bsStyle="primary"
            glyph="maps-catalog"
            title={<Message msgId="extension.title" />}
            onClose={onClose}
            style={dockStyle}
        >
            <Grid id="sample-extension-main-panel" class="container">
                <Row>
                    <Col xs={12}>
                        <h2>{message || "SampleExtension"} </h2>
                    </Col>
                </Row>
            </Grid>
        </ResponsivePanel>
    );
};

export default MainPanel;
