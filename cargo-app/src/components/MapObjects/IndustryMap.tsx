// draw icons on map 

import { ConnectionProps } from "./ConnectableMapObject";
import IndustryMapObject, { } from "./IndustryMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { Industry } from "@dbtypes/db/schema/industry";
import type { GETAllIndustryResponse } from "@dbtypes/api/schema/apiIndustry";
import type { GETAllIndustryTypeResponse } from "@dbtypes/api/schema/apiIndustryType";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

interface IndustryMapProps extends ConnectionProps {
    industriesVisible: number[],
    industryTypes: GETAllIndustryTypeResponse,
}

function IndustryMap({ industriesVisible, industryTypes }: IndustryMapProps) {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllIndustryResponse>({
        queryKey: ['industries', saveId],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industries`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>

    const visible = data.filter((i: Industry) => industriesVisible.includes(i.industryTypeId))

    return (
        <g>
            {
                visible.map((site) => <IndustryMapObject
                    hex={industryTypes.find(x => x.id === site.industryTypeId)?.hex ?? '000000ff'}
                    data={site}
                    key={site.industryId}
                />)
            }
        </g>
    )
}

export default IndustryMap;