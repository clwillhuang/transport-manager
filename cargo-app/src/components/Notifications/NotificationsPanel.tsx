import { useState, useEffect } from 'react';
import { socket } from '../../tools/clientSocket';
import { ToastContainer } from 'react-bootstrap';
import Notification, { NotificationProps } from './Notification';
import styles from './Notifications.module.css'

export default function Notifications() {
  const [_isConnected, setIsConnected] = useState(socket.connected);
  const [toasts, setToasts] = useState<Array<NotificationProps>>([]);
  const addToast = (newToast: NotificationProps) => setToasts((toasts) => [...toasts, newToast]);
  const removeToast = (id: string) =>
    setToasts((toasts) => toasts.filter((e) => e.id !== id));

  useEffect(() => {
    function onConnect() {
      addToast({
        title: 'Notifications Active',
        message: 'Successfully connected to notifications service. You will be notified of server and game events here.',
        date: new Date(),
        id: Math.random().toString(16),
        removeToast,
        context: 'success'
      });
      setIsConnected(true);
    }

    function onDisconnect() {
      addToast({
        title: 'Notifications Inactive',
        message: 'Disconnected to notifications service. You will be not be notified of server and game events here.',
        date: new Date(),
        id: Math.random().toString(16),
        removeToast,
        context: 'danger'
      });
      setIsConnected(false);
    }

    function onMessageEvent(value: any) {
      console.log('Received message', value);
      const { title, message } = value;
      const context = ('context' in value) ? value.context : undefined
      const id = (Math.random() * 16 ** 4).toString(16)
      addToast({ title, message, date: new Date(), id: id, removeToast, context });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  return (
    <div className={styles.panel}>
      <ToastContainer id='toastcontainer' position='bottom-end'>
        {toasts.map((toast) => (
          <Notification
            key={toast.id}
            title={toast.title}
            message={toast.message}
            date={toast.date}
            id={toast.id}
            removeToast={removeToast}
            context={toast.context}
          />
        ))}
      </ToastContainer>
      {/* <ConnectionManager /> */}
    </div>
  );
}