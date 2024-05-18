// Draw shape icons on the map
import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
import SignToolTip from "../tooltips/SignToolTip";
import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
import SignMapObject from "./SignMapObject";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";
import type { GETAllSignResponse } from "~shared/api/schema/apiSign";
import type { Sign } from "~shared/db/schema/sign";

interface SignMapProps extends GenericMapProps, OpensInfoPanel {
}

function SignMap(props: SignMapProps) {
    const { data } = useQuery<GETAllSignResponse>({
        queryKey: ['sign'],
        queryFn: () => fetch(`${baseUrl}/data/${props.saveId}/signs`).then(res => res.json())
    })

    if (!data) return <></>

    return (
        <g>
            {
                data.map((data: Sign) => <SignMapObject
                    key={`signmapobject${data.id}`}
                    tooltipType={ToolTipType.SIGN}
                    data={data}
                    TTComponent={SignToolTip}
                    {...props}
                    infoPanelMode={InformationPaneMode.Sign}
                />)
            }
        </g>
    )
}

export default SignMap;