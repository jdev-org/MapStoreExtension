import React, {useEffect, useState, useRef} from "react";
import { isEmpty, isEqual, pickBy, has, get, zipObject, keys } from "lodash";
import { Checkbox, Col, Row, FormGroup, FormControl, Grid, ControlLabel } from "react-bootstrap";

export default function Tabou2IdentAccord({ ...props }) {
    let operation = props?.tabouInfos?.operation;
    let programme = props?.tabouInfos?.programme || null;
    let layer = props?.selection?.layer;
    let mapFeature = props?.tabouInfos?.mapFeature?.properties;

    const fields = [{
        name: "id",
        type: "text",
        label: "ID Tabou",
        field: "id",
        source: () => programme || operation,
        readOnly: true
    }, {
        name: "code",
        label: "Code",
        type: "text",
        field: "code",
        source: () => programme || operation,
        readOnly: false
    }, {
        name: "commune",
        field: "commune",
        label: "Commune",
        type: "string",
        source: () => mapFeature,
        readOnly: true
    }, {
        name: "nature",
        label: "Nature",
        field: "nature.libelle",
        type: "string",
        source: () => operation,
        readOnly: true
    }, {
        name: "operation",
        field: "nom",
        label: "Opération",
        type: "string",
        source: () => operation,
        readOnly: true
    }, {
        name: "nom",
        field: "nom",
        label: "Nom",
        type: "string",
        source: () => programme || operation,
        readOnly: false
    }, {
        name: "numads",
        label: "Num ADS",
        field: "numAds",
        type: "string",
        source: () => programme || operation,
        readOnly: false
    }];

    const getInfosByField = (source) => {
        let i = {};
        fields.filter(f => !f.readOnly).forEach(f => {
            i[f.name] = get(f.source(), f.field)
        });
        return i;
    }

    /**
     * Effect
     */
    // return writable fields as object-keys
    const [values, setValues] = useState(getInfosByField(programme || operation));

    const [editFeature, setEditFeature] = useState({});

    useEffect(() => {
        let item = programme || operation;
        if (!isEmpty(item)) {
            let pickInfos = getInfosByField(item);
            if (!isEqual(pickInfos, values)) {
                // get default values for each writable fields
                setValues(pickInfos);
            }
        }
    }, [operation, programme])

    const getValue = (item) => {
        let sourceInfo = item.readOnly ? item.source() : values;
        return get(sourceInfo, item.field);
    }

    const changeInfos = (item) => {
        setValues({...values, ...item});
    }

    /**
     * COMPONENT
     */
    const marginTop = "10px";
    return (
        <Grid style={{ width: "100%" }} className={""}>
            {
                fields.filter(f => isEmpty(f.layers) || f?.layers.indexOf(layer) > -1).map(item => (
                    <Row style={{ marginTop: marginTop }}>
                        <Col xs={12}>
                            <FormGroup>
                                {
                                    item.type !== "boolean" ? <ControlLabel>{item.label}</ControlLabel> :  null
                                }
                                {
                                    item.type === "boolean" ?
                                        (<Checkbox 
                                            inline="true"
                                            checked={getValue(item) || false}
                                            disabled={item.readOnly}
                                            id={`chbox-${item.name}`}
                                            className="col-xs-5">
                                            <ControlLabel>{item.label}</ControlLabel>
                                        </Checkbox>) : null
                                }
                                {
                                    item.type !== "boolean" ?
                                        (<FormControl 
                                            placeholder={item.label}
                                            value={getValue(item) || ""}
                                            readOnly={item.readOnly}
                                            onChange={(v) => changeInfos({[item.name]: v.target.value})}
                                        />) : null
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                ))
            }
        </Grid>
    );
}
