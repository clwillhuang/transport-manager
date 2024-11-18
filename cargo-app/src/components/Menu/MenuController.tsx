import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useMemo } from "react"
import IndustryPane from "./IndustryPane";
import ChangeIndustryPane from "./ChangeIndustryPane";
import styles from './MenuController.module.css'
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import FetchPane from "./FetchPane";
import GraphPane from "../PaymentGraphs/GraphPane";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { ListGroup, Modal } from "react-bootstrap";

// This is the top bar of the app, with options to view different windows
export enum Windows {
    Closed,
    EconomyOptions,
    Graphs,
    IndustryChain,
    Saves,
}

interface MenuWindowData {
    index: Windows,
    title: String | ReactElement,
    content: ReactElement
}

// all the data needed to open a menu window
export interface WindowState {
    window: Windows,
    initial: any | null
}

export interface IWindowOpenable {
    setWindowIndex(data: WindowState): void,
}

interface MenuControllerProps extends IWindowOpenable {
    initial: any,
    window: Windows,
    saveId: number | null,
    setSaveId: React.Dispatch<React.SetStateAction<number | null>>
}

const MenuController = ({
    window,
    setWindowIndex,
    initial,
    saveId,
    setSaveId
}: MenuControllerProps) => {

    const handleClick = (index: Windows) => {
        var initial = null
        setWindowIndex({
            window: window === index ? Windows.Closed : index,
            initial
        });
    };

    const items: MenuWindowData[] = useMemo(() => [
        ... (import.meta.env.VITE_ENABLE_SOCKET === 'on' ? [{ 
            index: Windows.EconomyOptions,
            title: <><FontAwesomeIcon icon={faCog} /> Economies</>,
            content: <ChangeIndustryPane {...{ saveId, initial }} />
        }] : []),
        {
            index: Windows.Saves,
            title: <><FontAwesomeIcon icon={faSave} /> Saves</>,
            content: <FetchPane {...{ saveId, setSaveId }} />
        },
        {
            index: Windows.Graphs,
            title: <><FontAwesomeIcon icon={faChartLine} />Graphs</>,
            content: <GraphPane {...{ saveId }} />
        },
        {
            index: Windows.IndustryChain,
            title: <><FontAwesomeIcon icon={faIndustry} />Industries</>,
            content: <IndustryPane {...initial} saveId={saveId} />
        }
    ], [initial, saveId, setSaveId]);

    const activeElement: MenuWindowData | undefined = window !== Windows.Closed ? items.find(x => x.index === window) : undefined;

    return (
        <>
            <ListGroup className={styles.menu} horizontal='md'>
                {items.map((item) => (
                    <ListGroup.Item key={item.index} className={styles.menuItem}>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleClick(item.index)}
                        >
                            <strong>{item.title}</strong>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {
                activeElement &&
                <Modal show size='xl' className={styles.modalSizing} onHide={() => handleClick(Windows.Closed)}>
                    <Modal.Header className={styles.header} closeButton>
                        <h2>{activeElement?.title}</h2>
                    </Modal.Header>
                    <Modal.Body className={styles.content}>
                        <div className={styles.defined}>
                            {activeElement?.content}
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}

export default MenuController;
