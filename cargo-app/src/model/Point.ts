export type TileCoordinate = {
	x: number;
	y: number;
};

export function arePointsEqual(point1: TileCoordinate, point2: TileCoordinate): boolean {
    return point1.x === point2.x && point1.y === point2.y;
}

export const calculateManhattanDistance = (p1: TileCoordinate, p2: TileCoordinate): number => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}