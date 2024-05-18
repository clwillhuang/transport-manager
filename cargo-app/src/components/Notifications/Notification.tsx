import { useEffect, useState } from "react"
import { Toast } from "react-bootstrap"
import styles from './Notifications.module.css'

export type NotificationProps = {
    message: string,
    date: Date,
    title: string,
    id: string,
    context?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    removeToast: (id: string) => void
}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

// Auto hide after X milliseconds
const NOTIFICATION_AUTO_HIDE_DELAY = 5000;

const Notification = ({ message, date, title, id, removeToast, context }: NotificationProps) => {
    const [isMouseOver, setMouseOver] = useState(false)
    const [show, setShow] = useState(true);
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (!show && !isMouseOver) {
            removeToast(id)
        }
    }, [show])

    return (
        <Toast
            autohide={!isMouseOver}
            id={id}
            onClose={() => setShow(false)}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onEntered={() => setEntered(true)}
            show={show}
            delay={NOTIFICATION_AUTO_HIDE_DELAY}
            bg={context ?? 'info'}
            className={`${entered ? styles.toastEntered : styles.toast}`}
        >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{title}</strong>
                <small className="text-muted">{date.toLocaleDateString('en-US', options)}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}

export default Notification;


