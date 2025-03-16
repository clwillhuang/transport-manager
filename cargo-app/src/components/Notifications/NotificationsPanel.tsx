import { useState, useEffect } from 'react';
import { socket } from '../../tools/clientSocket';
import { ToastContainer } from 'react-bootstrap';
import Notification, { NotificationProps } from './Notification';
import styles from './Notifications.module.css'
import { useAppDispatch } from '../../app/hooks';
import { NotificationConnectionStatus } from './ServerNotifications';
import { setSaveId } from '../../features/saves/saveSlice';

export default function Notifications() {
  const dispatch = useAppDispatch();
  const [_isConnected, setIsConnected] = useState(socket?.connected);
  const [toasts, setToasts] = useState<Array<NotificationProps>>([]);
  const removeToast = (id: string) =>
  setToasts((toasts) => toasts.filter((e) => e.id !== id));
  const addToast = (newToast: Omit<NotificationProps, 'date' | 'id' | 'removeToast'>) => setToasts((toasts) => [...toasts, { date: new Date(), id: Math.random().toString(16), removeToast, ...newToast}]);

  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_SOCKET !== 'on' || !socket) return;

    function onConnect() {
      addToast({
        title: 'Notifications Active',
        message: 'Successfully connected to notifications service. You will be notified of server and game events here.',
        context: 'success'
      });
      setIsConnected(true);
    }

    function onDisconnect() {
      addToast({
        title: 'Notifications Inactive',
        message: 'Disconnected to notifications service. You will be not be notified of server and game events here.',
        context: 'danger'
      });
      setIsConnected(false);
    }

    function onMessageEvent(value: any) {
      console.log('Received message', value);
      const { title, message } = value;
      const context = ('context' in value) ? value.context : undefined
      addToast({ title, message, context });
    }

    function onConnectionEvent(value: any) {
      console.log('Received connection notification', value);
      const { status, saveId } = value;
      if (status === NotificationConnectionStatus.CONNECTED) {
        addToast({ title: 'Connected', message: 'Successfully connected', context: 'success' });
        dispatch(setSaveId(saveId));
      } else if (status === NotificationConnectionStatus.CONNECTING) {
        addToast({ title: 'Connecting', message: 'Attempting to connect.', context: 'info' });
      } else if (status === NotificationConnectionStatus.DISCONNECTED) {
        addToast({ title: 'Disconnected', message: 'Disconnected', context: 'info' })
      } else if (status === NotificationConnectionStatus.CONNECTION_UNSUCCESSFUL) {
        addToast({ title: 'Connection Unsuccessful', message: 'Connection was unsuccessful', context: 'danger' });
      } else if (status === NotificationConnectionStatus.ABORTED) {
        addToast({ title: 'Connection Aborted', message: 'Connection was aborted', context: 'warning' });
      } else if (status === NotificationConnectionStatus.INTERRUPTED) {
        addToast({ title: 'Connection Unexpectedly Interrupted', message: 'Connection was interrupted unexpectedly', context: 'danger' });
      } else {
        console.error("Unknown connection status: ", status, value);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);
    socket.on('connection', onConnectionEvent);

    return () => {
      if (socket) {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('message', onMessageEvent);
        socket.off('connection', onConnectionEvent);
      }
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