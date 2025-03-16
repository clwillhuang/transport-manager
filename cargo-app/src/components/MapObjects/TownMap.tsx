// Draw shape icons on the map
import { ConnectionProps } from "./ConnectableMapObject";
import TownMapObject from "./TownMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { Town } from "@dbtypes/db/schema/town";
import type { GETAllTownResponse } from "@dbtypes/api/schema/apiTown";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

interface TownMapProps extends ConnectionProps {}

function TownMap(props: TownMapProps) {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllTownResponse>({
        queryKey: ['town'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/towns`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>
    
    return (
        <g>
            {
                data.map((data: Town) => <TownMapObject
                    key={`townmapobject${data.id}`}
                    data={data}
                    {...props}
                />)
            }
        </g>
    )
}

export default TownMap;