// Represents a connection between a station and a connectable object (e.g. industry, town, etc.)

import type { Station } from "@dbtypes/db/schema/station";
import type { Cargo } from "@dbtypes/db/schema/cargo";

// inplemented by all map objects that can be connected to a source
export interface IConnectableMapObjectProps {
    // Get unique string used to add/remove connections
    data: ICoverageCoverable;
}

// inplemented by all models that can be connected to a source
export interface ICoverageCoverable {
    // Get unique string used to add/remove connections
    getConnectionId(): string;
    getName(): string;
    getProduces(economyId: string): Cargo[];
    getAccepts(economyId: string): Cargo[];
    getLocation(): {x: number, y: number};
}

// implemented by all objects that can be treated as a source
export interface ICoverageCreatable {
    coverage: CoverageConnection[];
    addCoverageConnection(other: ICoverageCoverable): void;
    removeCoverageConnection(other: ICoverageCoverable): void;
}

class CoverageConnection {

    station: Station;
    connectedObject: ICoverageCoverable;

    constructor(station: Station, connectedObject: ICoverageCoverable) {
        this.station = station;
        this.connectedObject = connectedObject;
    }

    public getProduces(economyId: string) {
        return this.connectedObject.getProduces(economyId);
    }

    public getAccepts(economyId: string) {
        return this.connectedObject.getProduces(economyId);
    }

    public getOtherConnectionId(): string {
        return this.connectedObject.getConnectionId();
    }

    public getConnectionId(): string {
        return this.station.id + '-' + this.connectedObject.getConnectionId();
    }
}

export default CoverageConnection;