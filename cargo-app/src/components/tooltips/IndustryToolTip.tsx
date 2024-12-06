import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import { AdditionalIndustryMapObjectProps } from '../MapObjects/IndustryMapObject';
import { ConnectionProps } from '../MapObjects/ConnectableMapObject';
import { MapObjectProps } from '../MapObjects/MapObject';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../../tools/serverConn';
import type { Industry } from '@dbtypes/db/schema/industry';
import type { GETOneIndustryResponse } from '@dbtypes/api/schema/apiIndustry';

// NOTE: Cannot directly use IndustryMapObjectProps b/c has extra prop for tooltip. It expands to
// ConnectableMapObjectProps<Industry, AdditionalIndustryMapObjectProps> & AdditionalIndustryMapObjectProps
// => HoverableMapObjectProps<Industry, AdditionalIndustryMapObjectProps> & ConnectionProps & AdditionalIndustryMapObjectProps & AdditionalIndustryMapObjectProps
// => MapObjectProps<Industry> & HoverProps<ToolTipProps<Industry, AdditionalIndustryMapObjectProps>> & AdditionalIndustryMapObjectProps & ConnectionProps
// However, these options work:
// ToolTipProps<Industry, MapObjectProps<Industry> & ConnectionProps & AdditionalIndustryMapObjectProps>
// => MapObjectProps<Industry> & ConnectionProps & AdditionalIndustryMapObjectProps;


export const IndustryToolTip: ToolTipRenderer<
	ToolTipProps<Industry, MapObjectProps<Industry> & ConnectionProps & AdditionalIndustryMapObjectProps>
> = (props) => {
	const { data: { id }, saveId } = props;

	const { data: industryData, isLoading, isError } = useQuery<GETOneIndustryResponse>({
        queryKey: ['industry', id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industries/${id}`, {method: 'GET'}).then(res => res.json())
    })

	if (!industryData || isLoading || isError) return <></>

	const { name, x, y } = industryData
	const { produces, accepts, name: type_name } = industryData.type

	return <>
		<h4>{name}</h4>
		<h5>Industry Type</h5>
		<p>{type_name}</p>
		<h5>Location</h5>
		<p>{x}, {y}</p>
		<h5>Accepts</h5>
		<p>{accepts.length > 0 ? accepts.map(c => c.cargo.name).join(', ') : 'Nothing'}</p>
		<h5>Produces</h5>
		<p>{produces.length > 0 ? produces.map(c => c.cargo.name).join(', ') : 'Nothing'}</p>
	</>;
}

export default IndustryToolTip;