import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import {
  addMessages,
  onWatcher,
  addChannel,
  removeChannel,
  renameChannel,
  setChannel,
} from '../store/usersSlice.js';

const ToastNewChannel = () => toast.success(i18n.t('toast.NewChannel'));
const ToastRenameChannel = () => toast.success(i18n.t('toast.RenameChannel'));
const ToastRemoveChannel = () => toast.success(i18n.t('toast.RemoveChannel'));
const Watcher = (socket) => {
  const { watcher } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if (watcher === 'off') {
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      dispatch(setChannel(payload.id));
      ToastNewChannel();
    });
    socket.on('newMessage', (payload) => {
      dispatch(addMessages(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
      ToastRemoveChannel();
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
      ToastRenameChannel();
    });
  }
  dispatch(onWatcher());
};

export default Watcher;
