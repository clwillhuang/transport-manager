import { IndustryMapObjectProps } from '../MapObjects/IndustryMapObject';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../../tools/serverConn';
import type { GETOneIndustryResponse } from '@dbtypes/api/schema/apiIndustry';
import { useAppSelector } from '../../app/hooks';
import { selectSaveId } from '../../features/saves/saveSlice';
import { selectToolTipData } from '../../features/tooltips/tooltipSlice';

export const IndustryToolTip = () => {
	const props = useAppSelector(selectToolTipData) as IndustryMapObjectProps;
	const { data: { id } } = props;

	const saveId = useAppSelector(selectSaveId);

	const { data: industryData, isLoading, isError } = useQuery<GETOneIndustryResponse>({
        queryKey: ['industry', id],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industries/${id}`, {method: 'GET'}).then(res => res.json()),
		enabled: saveId !== null,
    })

	if (saveId === null || !industryData || isLoading || isError) return <></>

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