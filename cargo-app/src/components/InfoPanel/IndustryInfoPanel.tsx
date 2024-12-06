import { IWindowOpenable, Windows } from "../Menu/MenuController";
import styles from './IndustryInfoPanel.module.css'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, fetchDELETEFactory } from "../../tools/serverConn";
import type { GETOneIndustryResponse } from "@dbtypes/api/schema/apiIndustry";
import type { CargoToIndustryType } from "@dbtypes/db/schema/cargoesToIndustryTypesRelations"
import type { Cargo } from "@dbtypes/db/schema/cargo"
import UpdateIndustryModal from "../Modals/UpdateIndustryModal";
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import HexColorBox from "../HexColorBox";
import { Button } from "react-bootstrap";

interface IndustryInfoPanelProps extends IWindowOpenable, BaseInfoPanelProps { }

const IndustryInfoPanel = ({ id, saveId, setWindowIndex, onClose }: IndustryInfoPanelProps) => {
    const queryClient = useQueryClient();

    const { data } = useQuery<GETOneIndustryResponse>({
        queryKey: ['industry', id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industries/${id}`, { method: 'GET' }).then(res => res.json())
    })

    const mutation = useMutation({
        mutationKey: [saveId, id],
        mutationFn: () =>
            fetchDELETEFactory(`${baseUrl}/data/${saveId}/industries/${id}`, {}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry'] })
            onClose();
        }
    })

    if (!data) {
        return <></>
    }

    const { name, x, y, type: { name: type_name, accepts, produces, hex } } = data;

    return (
        <>
            <span id='card-type'>INDUSTRY INFORMATION</span>
            <h2>{name}</h2>
            <h3>Industry Type</h3>
            <span>{type_name} <HexColorBox hex={hex} textcolor='white' /></span>
            <h3>Location</h3>
            <div>
                <span>X: {x}, Y: {y}</span>
            </div>
            <div className={styles.cargos}>
                <section>
                    <h3>Accepts</h3>
                    <ul>
                        {
                            accepts.length > 0 ?
                                accepts.map((accept: CargoToIndustryType & { cargo: Cargo }, index) => {
                                    const { cargo: { name, label } } = accept
                                    return <li key={`accepts${label}${index}`}>{name}</li>
                                })
                                : <li>Nothing</li>
                        }
                    </ul>
                </section>
                <section>
                    <h3>Produces</h3>
                    <ul>
                        {
                            produces.length > 0 ?
                                produces.map((accept: CargoToIndustryType & { cargo: Cargo }, index) => {
                                    const { cargo: { name, label } } = accept
                                    return <li key={`produces${label}${index}`}>{name}</li>
                                })
                                : <li>Nothing</li>
                        }
                    </ul>
                </section>
            </div>
            <div>
                <UpdateIndustryModal industryData={data} saveId={saveId} />
                <Button onClick={() => setWindowIndex({
                    window: Windows.IndustryChain,
                    initial: {
                        initialIndustryVisible: data.industryTypeId
                    }
                })}>
                    View industry chain
                </Button>
                <Button onClick={() => mutation.mutate()}>
                    Delete
                </Button>
            </div>
        </>
    )
}

export default IndustryInfoPanel;


