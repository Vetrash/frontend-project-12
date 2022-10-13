import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { channelState, setChannel, WaitSwitchChanellOn } from '../../../store/channelSlice.js';
import { modalSwitch } from '../../../store/modalSlice.js';
import DropDownMenu from './DropDownMenu.js';

const ChannelList = () => {
  const dispatch = useDispatch();
  const {
    channels,
    activChatId,
  } = useSelector(channelState);
  const [dropDownMenu, setDropDownMenu] = useState({
    isShow: false,
    elem: '',
    chanelList: '',
  });

  const { t } = useTranslation();
  const chanelRef = useRef();
  const showDropMenu = (elem) => {
    setDropDownMenu({
      isShow: true,
      elem,
      chanelList: chanelRef.current,
    });
  };
  const handleClick = (e) => {
    const targetClick = e.target;
    const IsdropdownItem = (targetClick.classList.contains('dropdown-item') || targetClick.classList.contains('dropdown-toggle')
    );
    if (!IsdropdownItem) {
      setDropDownMenu({
        isShow: false,
        elem: '',
        chanelList: '',
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
  }, []);

  const switchChanel = (e) => {
    const newIdChanel = Number(e.target.attributes.id.nodeValue);
    if (newIdChanel !== activChatId) {
      dispatch(WaitSwitchChanellOn());
      dispatch(setChannel(newIdChanel));
    }
  };

  const list = channels.map((item) => {
    if (item.removable) {
      return (
        <li className="nav-item w-100 flex-grow-0" key={item.id}>
          <div role="group" className="d-flex dropdown btn-group">
            <button
              onClick={switchChanel}
              type="button"
              className={cn('w-100  btn  rounded-0 text-start text-truncate', { 'btn-secondary': Number(item.id) === activChatId })}
              id={item.id}
            >
              <span className="me-1">#</span>
              {item.name}
            </button>
            <button
              onClick={showDropMenu}
              type="button"
              id={item.id}
              aria-expanded="false"
              className={cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', { 'btn-secondary': Number(item.id) === activChatId })}
            >
              <span className="visually-hidden">{t('channelControl')}</span>
            </button>
          </div>
        </li>
      );
    }
    return (
      <li className="nav-item w-100 flex-grow-0" key={item.id}>
        <button
          onClick={switchChanel}
          type="button"
          className={cn('w-100 btn rounded-0 text-start text-truncate', { 'btn-secondary': Number(item.id) === activChatId })}
          id={item.id}
        >
          <span className="me-1">#</span>
          {item.name}
        </button>
      </li>
    );
  });
  const addChannel = () => {
    dispatch(modalSwitch({ show: true, modalType: 'add' }));
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <button onClick={addChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
          <img src="./img/add_box.svg" alt="add" />
          <span className="visually-hidden">{t('addChanel')}</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 overflow-auto flex-grow-1 flex-nowrap myscroll mb-3" ref={chanelRef}>
        <DropDownMenu
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...dropDownMenu}
        />
        {list}
      </ul>
    </>
  );
};
export default ChannelList;
