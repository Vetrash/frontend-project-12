import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { modalSwitch } from '../../../store/modalSlice.js';

const ActivDropMenu = (elem, chanelList) => {
  const idChannel = Number(elem.target.attributes.id.value);
  const { pageY } = elem;
  const posY = pageY - 82;
  const posX = chanelList.offsetWidth / 1.5 + chanelList.offsetLeft;
  return { posX, posY, idChannel };
};

const DropDownMenu = (props) => {
  const { isShow, elem, chanelList } = props;
  const { posX, posY, idChannel } = isShow
    ? ActivDropMenu(elem, chanelList)
    : { posX: 0, posY: 0, idChannel: -1 };
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const RemoveChannelHandler = () => {
    dispatch(modalSwitch({ show: true, modalType: 'remove', idChannel }));
  };
  const RenameChannelHandler = () => {
    dispatch(modalSwitch({ show: true, modalType: 'rename', idChannel }));
  };

  return (
    <div
      className={cn('dropdown-menu', 'mydropmenu', { show: isShow })}
      data-popper-reference-hidden="false"
      data-popper-escaped="false"
      data-popper-placement="bottom-start"
      style={{ left: `${posX}px`, top: `${posY}px` }}
    >
      <button type="button" onClick={RemoveChannelHandler} id="RemoveDropDown" className="dropdown-item">{t('delet')}</button>
      <button type="button" id="RenameDropDown" onClick={RenameChannelHandler} className="dropdown-item">{t('rename')}</button>
    </div>
  );
};

export default DropDownMenu;
