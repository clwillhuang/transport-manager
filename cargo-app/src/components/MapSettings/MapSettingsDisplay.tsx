import React from "react";
import IndustryFilterContent from "./IndustryFilter";
import styles from './MapSettingsDisplay.module.css'
import type { GETAllIndustryTypeResponse } from "@dbtypes/api/schema/apiIndustryType";
import { Accordion } from "react-bootstrap";
import IconFilter, { IconType } from "./IconFilter";
import StationFilter, { StationType } from "./StationFilter";

interface MapSettingsDisplayProps {
    industryTypes: GETAllIndustryTypeResponse,
    industriesVisible: number[],
    setIndustriesVisible: React.Dispatch<React.SetStateAction<number[]>>,
    iconsVisible: IconType[],
    setIconsVisible: React.Dispatch<React.SetStateAction<IconType[]>>,
    stationsVisible: StationType[],
    setStationsVisible: React.Dispatch<React.SetStateAction<StationType[]>>,
}

enum MapSettingIndices {
    Closed,
    IndustryFilter,
    IconFilter,
    StationFilter,
}

const MapSettingsDisplay = ({ 
    industryTypes, industriesVisible, setIndustriesVisible, iconsVisible, setIconsVisible, stationsVisible, setStationsVisible
}: MapSettingsDisplayProps) => {
    const items = [
        {
            index: MapSettingIndices.IndustryFilter,
            title: 'Filter by Industry Type',
            content: <IndustryFilterContent {...{ industryTypes, industriesVisible, setIndustriesVisible}}/>
        },
        {
            index: MapSettingIndices.IconFilter,
            title: 'Filter Map Icons',
            content: <IconFilter iconsVisible={iconsVisible} setIconsVisible={setIconsVisible}/>
        },
        {
            index: MapSettingIndices.StationFilter,
            title: 'Filter by Station Type',
            content: <StationFilter stationsVisible={stationsVisible} setStationsVisible={setStationsVisible}/>
        }
        // TODO: Future feature of filtering by town size.
    ]

    return (
        <Accordion className={styles.container}>
            {
                items.map((item) => (
                    <Accordion.Item key={item.index} eventKey={item.index.toString()}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                            {item.content}
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    );
}

export default MapSettingsDisplay;