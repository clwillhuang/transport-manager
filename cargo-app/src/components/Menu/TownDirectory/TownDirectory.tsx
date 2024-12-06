import { useCallback, useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import styles from './TownDirectory.module.css'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../tools/serverConn";
import { GETTownDirectoryResponse } from "@dbtypes/api/schema/apiTown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSort, faSortDown } from "@fortawesome/free-solid-svg-icons";

interface IndustryDirectoryProps {
    saveId: number | null,
}

// an array with restricted set of possible attributes ('population', 'name'), with each attribute value being 'asc' or 'desc'
export type ColumnSetting = { key: string, order: 'asc' | 'desc' };
export type SortSettings = ColumnSetting[];

const PAGE_SIZE = 10;

/* Show a window that allows user to see a table of cities visible on the map. Table filtered by selected industry type and is paginated */
const TownDirectory = ({ saveId }: IndustryDirectoryProps) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<SortSettings>([]);

    const { data: response, isLoading: industriesLoading, isSuccess } = useQuery<GETTownDirectoryResponse>({
        queryKey: [`dirTown`, page, saveId ],
        queryFn: () => {
            const queryBuilder = new URLSearchParams({
                page: page.toString(),
                size: PAGE_SIZE.toString(),
                sort: order.map(o => `${o.order === 'asc' ? '' : '-'}${o.key}`).join(',')
            }).toString();
            return fetch(`${baseUrl}/data/${saveId}/towns/directory?${queryBuilder}`, { method: 'GET' })
            .then(res => res.json())
            .catch((e) => { console.error(e); })
        },
        enabled: !!saveId
    })

    const { data: towns, total, pages } = isSuccess ? response : { data: [], total: 0, pages: 0 };

    // Cycle the sort order setting of a column. 
    const toggleSort = (key: string) => {
        const pastOrder = order.find(o => o.key === key)?.order;
        const newOrder = order.filter(o => o.key !== key);

        // Cycle order: Not sorted => ascending => descending => Not sorted
        if (pastOrder === 'asc') newOrder.push({ key, order: 'desc' });
        else if (!pastOrder) newOrder.push({ key, order: 'asc' });
        
        setOrder(newOrder);
    }

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

    useEffect(() => {
        if (saveId) {
            queryClient.invalidateQueries({ queryKey: ['dirTown', page, saveId] });
        }
    }, [order.map(o => o.order)])

    const renderTable = () => {
        if (industriesLoading) return <>Loading...</>;
        else if (towns.length === 0) return <>No results</>;
        else return (
            <>
                <Table striped bordered hover className={styles.table}>
                    <thead>
                        <tr>
                            {renderColumnHeader('name', 'Name')}
                            {renderColumnHeader('population', 'Population')}
                            {renderColumnHeader('isCity', 'Status')}
                            <th>Location (x, y)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            towns?.map((town) => <tr key={town.id}>
                                <td>{town.name}</td>
                                <td>{town.population}</td>
                                <td>{town.isCity ? 'City' : 'Town'}</td>
                                <td>({town.x}, {town.y})</td>
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
            {total} results
            {renderTable()}
        </div>
    )
}

export default TownDirectory;