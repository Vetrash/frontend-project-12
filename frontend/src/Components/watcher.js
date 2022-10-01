import { useSelector, useDispatch } from 'react-redux';
import { onWatcher } from '../store/userSlice.js';
import {
  addMessages,
  addChannel,
  removeChannel,
  renameChannel,
  setChannel,
} from '../store/chatSlice.js';

const Watcher = (socket) => {
  const { watcher } = useSelector((state) => state.user);
  // const { waitSwitchChanell } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  if (watcher === 'off') {
    socket.once('newChannel', (payload) => {
      dispatch(addChannel(payload));
      // if (waitSwitchChanell) {
      dispatch(setChannel(payload.id));
      // }
    });
    socket.on('newMessage', (payload) => {
      dispatch(addMessages(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });
  }
  dispatch(onWatcher());
};

export default Watcher;
