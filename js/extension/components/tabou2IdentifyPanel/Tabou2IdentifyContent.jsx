import React, { useEffect, useState } from 'react';
import { PanelGroup, Panel, Row, Grid } from 'react-bootstrap';
import { CSS } from './tabou2Identify-css';
import Tabou2IdentAccord from '@ext/components/form/identify/Tabou2IdentAccord';
import Tabou2DescribeAccord from '@ext/components/form/identify/Tabou2DescribeAccord';
import Tabou2GouvernanceAccord from '@ext/components/form/identify/Tabou2GouvernanceAccord';
import Tabou2ProgActiviteAccord from '@ext/components/form/identify/Tabou2ProgActiviteAccord';
import Tabou2ProgHabitAccord from '@ext/components/form/identify/Tabou2ProgHabitAccord';
import Tabou2SuiviOpAccord from '@ext/components/form/identify/Tabou2SuiviOpAccord';
import Tabou2DdsAccord from '@ext/components/form/identify/Tabou2DdsAccord';
import Tabou2SecProgLiesAccord from '@ext/components/form/identify/Tabou2SecProgLiesAccord';
import { ACCORDIONS } from '@ext/constants';

export default function Tabou2IdentifyContent({
    response,
    tabouLayer,
    feature,
    featureId,
    ...props
}) {
    const [cssLoaded, setCss] = useState(false);
    const [accordions, setAccordions] = useState([]);
    const [openedAccordions, setOpened] = useState({});
    const toggleAccordion = (idx) => {
        openedAccordions[idx] = openedAccordions[idx] ? false : true;
        setOpened(openedAccordions);
    };

    /**
     * load CSS
     */
    useEffect(() => {
        if (!cssLoaded) {
            let script = document.createElement('style');
            let head = document.getElementsByTagName('head')[0];
            script.innerHTML = CSS.join("\n");
            head.appendChild(script);
            setCss(true);
        }
    }, []);

    useEffect(() => {
        if (tabouLayer) {
            // get accordions according to layer
            setAccordions(ACCORDIONS.filter(acc => !acc.layers || acc?.layers.indexOf(tabouLayer) > -1));
        }
    }, [tabouLayer, featureId]);


    const FormFields = ({ accordion }) => {
        let fields;
        switch (accordion.id) {
        case 'ident':
            fields = (<Tabou2IdentAccord {...props}/>);
            break;
        /*case 'describe':
            fields = (<Tabou2DescribeAccord {...props} />);
            break;
        case 'gouvernance':
            fields = (<Tabou2GouvernanceAccord {...props} />);
            break;
        case 'suivi':
            fields = (<Tabou2SuiviOpAccord {...props} />);
            break;
        case 'habitat':
            fields = (<Tabou2ProgHabitAccord {...props} />);
            break;
        case 'activite':
            fields = (<Tabou2ProgActiviteAccord {...props} />);
            break;
        case 'dds':
            fields = (<Tabou2DdsAccord {...props} />);
            break;
        case 'secteursprog':
            fields = (<Tabou2SecProgLiesAccord {...props}/>);
            break;*/
        default:
            fields = null;
            break;
        }
        return fields;
    };

    return (
        <>
            <Grid style={{ width: '100%' }}>
                {
                    accordions.map((item, index) => (
                        <PanelGroup
                            defaultActiveKey={openedAccordions[index] ? index.toString() : null}
                            onSelect={() => toggleAccordion(index)}
                            key={'panelgp-' + index} accordion>
                            <Panel
                                className="idContentHeader"
                                header={(
                                    <span onClick={() => toggleAccordion(index)}>
                                        <label>
                                            {item.title}
                                        </label>
                                    </span>
                                )}
                                eventKey={index.toString()}>

                                <FormFields accordion={item} />

                            </Panel>
                        </PanelGroup>
                    ))
                }
            </Grid>
        </>
    );
}
