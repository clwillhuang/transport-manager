// Draw shape icons on the map
import CircleMapObject from "./CircleMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllCircleResponse } from "@dbtypes/api/schema/apiCircle";
import type { Circle } from "@dbtypes/db/schema/circle";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

function ShapeMap() {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllCircleResponse>({
        queryKey: ['circle'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/circles`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>

    return (
        <g>
            {
                data.map((data: Circle, index: number) => <CircleMapObject
                    key={`mapcircle${index}`}
                    data={data}
                />)
            }
        </g>
    )
}

export default ShapeMap;