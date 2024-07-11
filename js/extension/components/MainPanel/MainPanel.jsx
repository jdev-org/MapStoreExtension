import React from "react";
import Message from "@mapstore/components/I18N/Message";
import ResponsivePanel from "@mapstore/components/misc/panels/ResponsivePanel";
import { Row, Grid, Glyphicon, Col, Button } from "react-bootstrap";
import { SIZE } from "../../constants/main";

import "./css/styleMainPanel.css";
import "./css/styleButtonActions.css";
import "./css/styleButtonValidCancel.css";

const MainPanel = ({ active, dockStyle, onClose, message }) => {
    return (
        <ResponsivePanel
            containerStyle={dockStyle}
            containerId="avisee-container"
            containerClassName="dock-container"
            className="avisee-dock-panel"
            open={active}
            position="right"
            size={SIZE}
            bsStyle="primary"
            glyph="maps-catalog"
            title={<Message msgId="extension.title" />}
            onClose={onClose}
            style={dockStyle}
        >
            <Grid id="avisee-main-panel" class="">
                <Row className="avisee-header-bar">
                    <Button bsStyle="header">+ Créer un projet</Button>
                    <Button bsStyle="header">Sélectionner un projet</Button>
                    <Button bsStyle="header">Sélectionner un avis</Button>
                </Row>
                <Row className="avisee-btn-bar">
                    <Col xs={6} className="avisee-actions-gp">
                        <Button className="avisee-trash">
                            <Glyphicon glyph={"trash"} />
                        </Button>
                        <Button className="avisee-draw">
                            <Glyphicon glyph={"pencil"} />
                        </Button>
                    </Col>
                    <Col xs={6} className="avisee-valid-gp text-right">
                        <Button bsStyle="valid">
                            <Glyphicon glyph={"ok"} />
                        </Button>
                        <Button bsStyle="cancel">
                            <Glyphicon glyph={"remove"} />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </ResponsivePanel>
    );
};

export default MainPanel;
