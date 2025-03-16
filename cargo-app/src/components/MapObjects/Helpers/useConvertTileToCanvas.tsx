import { useAppSelector } from "../../../app/hooks";
import { selectMapDimensions } from "../../../features/saves/saveSlice";

const useConvertTileToCanvas = () => {
    const mapSize = useAppSelector(selectMapDimensions);

    const ConvertTileToCanvasCoordinate = ({x, y}: { x: number, y: number }): { x: number, y: number } => {
        return {x: mapSize.mapWidth - x, y: y}
    }

    return { ConvertTileToCanvasCoordinate };
}

export default useConvertTileToCanvas;