import { ChangeEvent } from "react";
import HexColorBox from "../HexColorBox";
import { baseUrl, fetchDELETEFactory, fetchPOSTFactory } from "../../tools/serverConn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Circle, CircleType } from "@dbtypes/db/schema/circle"
import type { GETOneCircleResponse } from "@dbtypes/api/schema/apiCircle"
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import { Form, FormControl } from "react-bootstrap"


export interface CircleInfoPanelProps extends BaseInfoPanelProps { };

const CircleInfoPanel = ({ id, saveId, onClose }: CircleInfoPanelProps) => {
    const { data } = useQuery<GETOneCircleResponse>({
        queryKey: ['circle', id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/circles/${id}`, { method: 'GET' }).then(res => res.json())
    })

    const queryClient = useQueryClient()

    const { isError, ...mutation } = useMutation({
        mutationFn: (newData: Partial<Circle> & { id: number }) => {
            return fetchPOSTFactory(`${baseUrl}/data/${saveId}/circles/${id}`, newData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['circle'] })
        }
    })

    if (!data || !data.id) return <></>

    const handleDistanceTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        mutation.mutate({ id: data.id, circleType: event.target.value as CircleType })
    };

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const radius = parseInt(event.target.value, 10);
        mutation.mutate({ id: data.id, radius: isNaN(radius) ? 0 : radius });
    };

    const deleteCircle = () => {
        fetchDELETEFactory(`${baseUrl}/data/${saveId}/circles/${id}`, {})
        onClose()
    }

    const { x, y, circleType, radius, color } = data;
    const circleTypeOptions: CircleType[] = ['euclidean', 'manhattan'];

    return (
        <>
            <span id='card-type'>SHAPE</span>
            <h2>Distance Measure</h2>
            <h3>Origin</h3>
            <div>
                <span>X: {x}, Y: {y}</span>
            </div>
            <Form.Group>
                <Form.Label>Distance Type</Form.Label>
                <Form.Select onChange={handleDistanceTypeChange} defaultValue={circleType}>
                    {
                        circleTypeOptions.map(
                            t => <option key={t} value={t}>{t}</option>
                        )
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Radius</Form.Label>
                <FormControl
                    type="number"
                    placeholder="Enter radius"
                    value={radius!}
                    onChange={handleRadiusChange}
                />
            </Form.Group>
            <h3>Color</h3>
            <HexColorBox hex={color!} textcolor="white" />
            <div>
                {/* TODO: Delete shape from app */}
                <button onClick={deleteCircle}>
                    Delete shape
                </button>
            </div>
        </>
    )
}

export default CircleInfoPanel;

