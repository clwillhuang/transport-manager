import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, fetchDELETEFactory } from "../../tools/serverConn";
import type { GETOneTownResponse } from "@dbtypes/api/schema/apiTown";
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import UpdateTownModal from "../Modals/UpdateTownModal";
import { Button } from "react-bootstrap";


export interface TownInfoPanelProps extends BaseInfoPanelProps {}

const TownInfoPanel = ({ id, saveId, onClose }: TownInfoPanelProps) => {
    const queryClient = useQueryClient();

    const { data } = useQuery<GETOneTownResponse>({
        queryKey: ['town', saveId, id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/towns/${id}`, {method: 'GET'}).then(res => res.json()),
    })

    const { isError, ...mutation } = useMutation({
        mutationFn: () => fetchDELETEFactory(`${baseUrl}/data/${saveId}/towns/${id}`, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['town']})
            onClose();
        }
    })

    if (!data || !data.id) return <></>

    const { name, x, y, isCity, population } = data;

    const deleteStation = () => {
        mutation.mutate();
    }

    return (
        <>
            <span id='card-type'>SETTLEMENT</span>
            <h2>{name} ({isCity ? 'City' : 'Town'})</h2>
            <h3>Population</h3>
            <div>
                <p style={{ margin: 0}}>{population}</p>
            </div>
            <h3>Location</h3>
            <div>
                <p>X: {x}, Y: {y}</p>
            </div>
            <div>
                <UpdateTownModal townData={data} saveId={saveId}/>
                <Button onClick={deleteStation}>
                    Delete
                </Button>
            </div>
        </>
    )
}

export default TownInfoPanel;

