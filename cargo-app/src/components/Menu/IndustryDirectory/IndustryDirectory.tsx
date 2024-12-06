import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { Col, Form, FormGroup, FormLabel, Pagination, Table } from "react-bootstrap";
import type { IndustryType } from "@dbtypes/db/schema/industryType";
import styles from './IndustryDirectory.module.css'
import type { GETAllIndustryTypeResponse } from "@dbtypes/api/schema/apiIndustryType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../tools/serverConn";
import { GETIndustryDirectoryResponse } from "@dbtypes/api/schema/apiIndustry";
import { faSortDown, faSortUp, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortSettings } from "../TownDirectory/TownDirectory";

interface IndustryDirectoryProps {
    saveId: number | null,
}

const TYPE_NOT_SELECTED = 'All';

const PAGE_SIZE = 10;

/* Show a window that allows user to see a table of industries visible on the map. Table filtered by selected industry type and is paginated */
const IndustryDirectory = ({ saveId }: IndustryDirectoryProps) => {
    
    const { data: industryTypes, isLoading } = useQuery<GETAllIndustryTypeResponse>({
        queryKey: [`industrytypes`, saveId],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industrytypes/`, { method: 'GET' })
            .then(res => res.json())
            .catch(e => console.error(e)),
        enabled: !!saveId,
    })

    const [page, setPage] = useState(1);
    const [industryType, setIndustryType] = useState<number | typeof TYPE_NOT_SELECTED>(TYPE_NOT_SELECTED);
    
    const onTypeSelect: ChangeEventHandler<HTMLSelectElement> = (e): void => {
        if (e.target.value === TYPE_NOT_SELECTED) setIndustryType(TYPE_NOT_SELECTED);
        else setIndustryType(parseInt(e.target.value));
        setPage(1);
    }

    const { data: response, isLoading: industriesLoading, isSuccess } = useQuery<GETIndustryDirectoryResponse>({
        queryKey: [`dirIndustry`, industryType, page, saveId],
        queryFn: () => {
            const params = new URLSearchParams({
                page: page.toString(),
                size: PAGE_SIZE.toString(),
                sort: order.map(o => `${o.order === 'asc' ? '' : '-'}${o.key}`).join(','),
                industry: industryType === TYPE_NOT_SELECTED ? '' : industryType.toString()
            }).toString();
            // add page number, size, type to query param
            return fetch(`${baseUrl}/data/${saveId}/industries/directory?${params}`, { method: 'GET' })
                .then(res => res.json())
                .catch((e) => { console.error(e); });
        },
        enabled: !!saveId && !isLoading
    });

    const queryClient = useQueryClient();
    const [order, setOrder] = useState<SortSettings>([]);

    // Cycle the sort order setting of a column. 
    const toggleSort = (key: string) => {
        const pastOrder = order.find(o => o.key === key)?.order;
        const newOrder = order.filter(o => o.key !== key);

        // Cycle order: Not sorted => ascending => descending => Not sorted
        if (pastOrder === 'asc') newOrder.push({ key, order: 'desc' });
        else if (!pastOrder) newOrder.push({ key, order: 'asc' });
        
        setOrder(newOrder);
    }

    useEffect(() => {
        if (saveId) {
            queryClient.invalidateQueries({ queryKey: ['dirIndustry', industryType, page, saveId] });
        }
    }, [order.map(o => o.order)])

    const renderColumnHeader = useCallback((key: string, label: string) => {
        let icon = undefined;
        const curr = order.find(o => o.key === key)?.order;
        if (curr === 'asc') icon = faSortDown;
        else if (curr === 'desc') icon = faSortUp;
        else icon = faSort;
        return <td onClick={() => toggleSort(key)}>
            {label} <FontAwesomeIcon className={styles.icon} icon={icon} />
        </td>
    }, [order]);

    const { data: industries, total, pages } = (isSuccess && response) ? response : { data: [], total: 0, pages: 0 };

    const renderTable = () => {
        if (industriesLoading) return <>Loading...</>;
        else if (industries.length === 0) return <>No results</>;
        else return (
            <>
                <Table striped bordered hover className={styles.table}>
                    <thead>
                        <tr>
                            {renderColumnHeader('name', 'Full Name')}
                            <th>Type</th>
                            <th>Location (x, y)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            industries?.map((industry) => <tr key={industry.id}>
                                <td>{industry.name}</td>
                                <td>{industryTypes?.find(x => x.id === industry.industryTypeId)?.name || 'Unknown'}</td>
                                <td>({industry.x}, {industry.y})</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                {
                    pages > 0 &&
                    <Pagination>
                        <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
                        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
                        <Pagination.Item active>{page} of {pages}</Pagination.Item>
                        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === pages} />
                        <Pagination.Last onClick={() => setPage(pages)} disabled={page === pages} />
                    </Pagination>
                }
            </>
        )
    }

    return (
        <div className={styles.parent}>
            <Col md={8}>
                <Form className={styles.form}>
                    <FormGroup>
                        <FormLabel>Type</FormLabel>
                        <Form.Select onChange={onTypeSelect} value={industryType}>
                            <option value={TYPE_NOT_SELECTED}>All</option>
                            {industryTypes?.map((type: IndustryType) => <option key={type.id} value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Form>
            </Col>
            <Col md={4}>
                {total} results
            </Col>
            {renderTable()}
        </div>
    )
}

export default IndustryDirectory;