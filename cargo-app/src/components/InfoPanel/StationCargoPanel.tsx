import { useState } from "react";
import { GETOneStationResponse, GETOneStationResponseCargoEntry } from "@dbtypes/api/schema/apiStation";
import { Button } from "react-bootstrap";

const StationCargoEntry = ({ data }: { data: GETOneStationResponse }) => {
    const [expand, showExpand] = useState<boolean>(false);

    const renderCargo = (cargodata: GETOneStationResponseCargoEntry) => {
        const { cargoType, waiting } = cargodata;
        const { rating } = cargoType;
        const totalUnits = waiting.map(x => x.units).reduce((a, b) => (a || 0) + (b || 0), 0);
        return (
            <li>
                <span>{totalUnits} {cargoType.name}</span><span> ({rating}%)</span><br />
                {expand && <ul>{renderViaStation(cargodata, cargoType.name)}</ul>}
            </li>
        );
    }

    const renderViaStation = (vias: Pick<GETOneStationResponseCargoEntry, 'waiting'>, cargoName: string) => {
        const allVias = Array.from(new Set(vias.waiting.map(x => x.viaStationId))).filter(x => x !== null);
        return Array.from(allVias).filter(x => x !== null).map((viaStationId: number | null) => {
            if (viaStationId === null) {
                return null;
            }
            const relevant = vias.waiting.filter(x => x.viaStationId === viaStationId)
            const totalForVia = relevant.map(x => x.units)
                .reduce((a, b) => (a || 0) + (b || 0), 0);
            const entry = vias.waiting.find(x => x.viaStationId === viaStationId);
            const viaStationData = entry!.cargoViaStationWaiting;
            return (
                <li>
                    <span>{totalForVia} {cargoName} going via {entry?.viaStationId === entry?.atStationId ? 'any station' :viaStationData.name}</span>
                    <ul>{relevant.map(x => {
                        return(
                            <li>{x.units} {cargoName} from {entry?.fromStationId === entry?.atStationId ? 'this station' : x.cargoFromStationWaiting.name}</li>
                        )
                    })}</ul>
                </li>
            )
        })
    }

    return(
        
        <div>
            <Button onClick={() => showExpand(!expand)}>{expand ? 'Hide Details' : 'Expand Details'}</Button>
            <ul>{data.waiting.map(renderCargo)}</ul>
        </div>
    )

};

export default StationCargoEntry;