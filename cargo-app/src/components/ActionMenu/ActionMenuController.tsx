import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './ActionMenuController.module.css'
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Action, ACTION_MENU_OPTIONS } from "./actionMenuOptions";

// all the data needed to open a menu window
export interface ActionMenuState {
    action: Action,
    initial: any | null
}

export interface ActionMenuOption {
    action: Action,
    title: string,
    icon: IconDefinition
}

interface MenuControllerProps {
    setAction: React.Dispatch<React.SetStateAction<Action>>;
    initial: any,
    action: Action
}


const ActionController = ({ action, setAction }: MenuControllerProps) => {

    const handleClick = (index: Action) => {
        if (action !== index) {
            // change current action
            setAction(index);
        } else {
            // reset to default
            setAction(Action.Default);
        }
    };

    const actionData = Array.from(ACTION_MENU_OPTIONS);

    return (
        <ButtonToolbar className={styles.menu}>
            <ButtonGroup >
                {actionData.map(([key, item]) => (
                    <Button variant='dark' key={key} className={styles.menuItem} onClick={() => handleClick(key)}>
                        <div>
                            <FontAwesomeIcon icon={item.icon} color={key === action ? '#42c312' : 'white'} />
                            <div className={styles.tooltip}>
                                <span><strong>{item.title}</strong></span>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </Button>
                ))}
            </ButtonGroup>
        </ButtonToolbar>
    );
}

export default ActionController;
