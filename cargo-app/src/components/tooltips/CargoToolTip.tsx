import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-bootstrap";
import { baseUrl } from "../../tools/serverConn";
import type { GETOneCargoResponse } from "@dbtypes/api/schema/apiCargo";
import { forwardRef } from "react";
import styles from './Tooltip.module.css'
import { ConvertTEToString } from '@dbtypes/db/utils'
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

type CargoTooltipProps = {
    cargoId: number | null,
}

const CargoTooltip = forwardRef<HTMLDivElement, CargoTooltipProps>((props: CargoTooltipProps & any, ref) => {

    const saveId = useAppSelector(selectSaveId);

    const { cargoId, ...injectedProps } = props

    const { data: cargoData, isLoading, isFetching, isError } = useQuery<GETOneCargoResponse>({
        queryKey: ['cargo', cargoId],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/cargoes/${cargoId}`).then(res => res.json()),
        enabled: !!cargoId && saveId !== null
    })
    let content: string | React.ReactNode = ''

    if (saveId === null) {
		return null;
	} else if (isLoading || isFetching) {
        content = "Loading..."
    } else if (isError || !cargoData) {
        content = "Error"
    } else {
        const { name, label, isPassenger, isMail, isExpress, isArmoured, isBulk, isPieceGoods, isLiquid, isRefrigerated, isHazardous, isCovered, townEffect, grfData } = cargoData;

        const cargoClasses: string[] = [
            ...(isPassenger ? ['Passenger'] : []),
            ...(isMail ? ['Mail'] : []),
            ...(isExpress ? ['Express'] : []),
            ...(isArmoured ? ['Armoured'] : []),
            ...(isBulk ? ['Bulk'] : []),
            ...(isPieceGoods ? ['Piece Goods'] : []),
            ...(isLiquid ? ['Liquid'] : []),
            ...(isRefrigerated ? ['Refrigerated'] : []),
            ...(isHazardous ? ['Hazardous'] : []),
            ...(isCovered ? ['Covered'] : []),
        ]

        // parse grfdata as object into key value pairs
        const grfDataPairs = typeof grfData === 'object' ? Object.entries(grfData as object) : []
        content = <div className={styles.overlay}>
            <h4>{name}</h4>
            <p>Label: {label}</p>
            {grfDataPairs.map(([key, value]) => {
                const titleCase = key.replace(
                    /\w\S*/g,
                    function (txt: string) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                ).replace(
                    /[-_]/g,
                    function (txt: string) { return ' ' + txt.substr(1).toLowerCase(); }
                );
                return <p key={key}>{titleCase}: {value}</p>
                }
            )
            }
            <h5>Cargo Classes</h5>
            <p>{cargoClasses.join(', ')}</p>
            <h5>Town Effect</h5>
            <p>{ConvertTEToString(townEffect)}</p>
        </div>
    }
    
    return <Tooltip id="cargoTooltip" {...injectedProps} ref={ref}>{content}</Tooltip>
})

export default CargoTooltip;