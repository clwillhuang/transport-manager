import { Alert } from "react-bootstrap"
import { ActionMenuState } from "./ActionMenuController"
import styles from './ActionIndicator.module.css'
import { Action, ACTION_MENU_OPTIONS } from "./actionMenuOptions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMousePointer } from "@fortawesome/free-solid-svg-icons/faMousePointer"

type ActionIndicatorProps = {
    actionState: ActionMenuState
}

// map each possible action to the text title and description that the alert will show

// Show a bootstrap alert in the center of the screen indicating which action is currently selected
const ActionIndicator = ({actionState }: ActionIndicatorProps ) => {
    const { action }: { action: Action } = actionState
    const alertData = ACTION_MENU_OPTIONS.get(action) ?? { title: 'Unknown Action', description: `Action type ${Action[action]} selected.`, icon: faMousePointer }
    const { title, description, icon } = alertData;
    
    if (!title || !description || typeof action === 'undefined' || action === Action.Default) {
        return null
    }

    return (
        <Alert className={styles.actionIndicator} variant="warning">
            <span className={styles.header}>Active Tool</span><br/>
            <span className={styles.title}><FontAwesomeIcon icon={icon}/> {title}<br /></span>
            <span>{description}</span>
        </Alert>
    )
}

export default ActionIndicator;