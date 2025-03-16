// Draw shape icons on the map
import SignMapObject from "./SignMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllSignResponse } from "@dbtypes/api/schema/apiSign";
import type { Sign } from "@dbtypes/db/schema/sign";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

function SignMap() {

    const saveId = useAppSelector(selectSaveId);

    const { data } = useQuery<GETAllSignResponse>({
        queryKey: ['sign'],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/signs`).then(res => res.json()),
        enabled: saveId !== null,
    })

    if (saveId === null || !data) return <></>

    return (
        <g>
            {
                data.map((data: Sign) => <SignMapObject
                    key={`signmapobject${data.id}`}
                    data={data}
                />)
            }
        </g>
    )
}

export default SignMap;