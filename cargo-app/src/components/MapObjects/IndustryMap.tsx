// draw icons on map 

import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import IndustryToolTip from "../tooltips/IndustryToolTip";
import { ConnectionProps } from "./ConnectableMapObject";
import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
import IndustryMapObject, { } from "./IndustryMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";
import type { Industry } from "~shared/db/schema/industry";
import type { GETAllIndustryResponse } from "~shared/api/schema/apiIndustry";
import type { GETAllIndustryTypeResponse } from "~shared/api/schema/apiIndustryType";

interface IndustryMapProps extends GenericMapProps, ConnectionProps, OpensInfoPanel {
    industriesVisible: number[],
    industryTypes: GETAllIndustryTypeResponse,
}

function IndustryMap({ industriesVisible, industryTypes, mapSize, ...props }: IndustryMapProps) {

    const { data } = useQuery<GETAllIndustryResponse>({
        queryKey: ['industries'],
        queryFn: () => fetch(`${baseUrl}/data/${props.saveId}/industries`).then(res => res.json())
    })

    if (!data) return <></>

    const visible = data.filter((i: Industry) => industriesVisible.includes(i.industryTypeId))

    return (
        <g>
            {
                visible.map((site) => <IndustryMapObject
                    mapSize={mapSize}
                    hex={industryTypes.find(x => x.id === site.industryTypeId)?.hex ?? '000000ff'}
                    tooltipType={ToolTipType.INDUSTRY}
                    data={site}
                    TTComponent={IndustryToolTip}
                    infoPanelMode={InformationPaneMode.Industry}
                    key={site.industryId}
                    {...props}
                />)
            }
        </g>
    )
}

export default IndustryMap;