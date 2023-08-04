import React from "react";
import Portal from "@mapstore/components/misc/Portal";
import Dialog from "@mapstore/components/misc/Dialog";
import { Glyphicon, Button } from "react-bootstrap";


const Extension = (props) => {
    return (<Portal><Dialog id={"docsManagerDialog"} style={{}} className={"portal-dialog"}>
        <span role="header">
            <span className="">{"Documents"}</span>
            <button onClick={() => {}} className="close"><Glyphicon glyph="1-close"/></button>
        </span>
        <div role="body">
            OK !
        </div>
        <span role="footer">
            <Button bsSize="large" bsStyle="primary" onClick={() => {}}>Fermer</Button>
        </span>
    </Dialog></Portal>);
};

export default Extension;
