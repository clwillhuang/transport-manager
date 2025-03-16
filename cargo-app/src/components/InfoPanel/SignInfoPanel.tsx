import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl, fetchDELETEFactory } from "../../tools/serverConn";
import type { GETOneSignResponse } from "@dbtypes/api/schema/apiSign";
import type { Sign } from "@dbtypes/db/schema/sign";
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import UpdateSignModal from "../Modals/UpdateSignModal";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";
import { selectInfoPanelProps } from "../../features/infoPanel/infoPanelSlice";

export interface SignInfoPanelProps extends BaseInfoPanelProps {}

const SignInfoPanel = ({ onClose }: SignInfoPanelProps) => {

    const saveId = useAppSelector(selectSaveId);
    const panelProps = useAppSelector(selectInfoPanelProps);
    const id = panelProps?.id;

    const queryClient = useQueryClient();

    const { data } = useQuery<GETOneSignResponse>({
        queryKey: ['sign', id],
        queryFn: (): Promise<Sign> => 
            fetch(`${baseUrl}/data/${saveId}/signs/${id}`, {method: 'GET'}).then(res => res.json()),
        enabled: saveId !== null
    })

    const { isError, ...mutation } = useMutation({
        mutationKey: ['sign', id],
        mutationFn: () => fetchDELETEFactory(`${baseUrl}/data/${saveId}/signs/${id}`, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sign']})
            onClose();
        }
    })

    if (!id || saveId === null || !data || !data.id) return <></>

    const { x, y, text } = data;

    const deleteStation = () => {
        mutation.mutate()
    }

    return (
        <>
            <span id='card-type'>SIGN</span>
            <h2>{text}</h2>
            <h3>Location</h3>
            <div>
                <span>X: {x}, Y: {y}</span>
            </div>
            <div>
                <UpdateSignModal signData={data} />
                <Button onClick={deleteStation}>
                    Delete
                </Button>
            </div>
        </>
    )
}

export default SignInfoPanel;

