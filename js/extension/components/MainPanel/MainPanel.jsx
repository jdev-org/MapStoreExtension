import React from "react";
import Portal from "@mapstore/components/misc/Portal";
import Dialog from "@mapstore/components/misc/Dialog";
import { Glyphicon, Button, Modal } from "react-bootstrap";


const MainPanel = ({active = false, onClose = () => {}}) => {
    if (!active) return null;

    return (<div className="static-modal">
    <Modal show={active} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Documents</Modal.Title>
      </Modal.Header>
  
      <Modal.Body>One fine body...</Modal.Body>
  
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  </div>);
};
export default MainPanel;