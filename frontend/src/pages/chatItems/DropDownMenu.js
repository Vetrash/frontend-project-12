import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { modalSwitch } from '../../store/modalSlice.js';
import { setDropMenu, offDropDownMenu } from '../../store/dropDownMenuSlice.js';
import store from '../../store/index.js';

export const ActivDropMenu = (props) => {
  const { elem, chanelList } = props;
  const idChannel = Number(elem.target.attributes.id.value);
  const { pageY } = elem;
  const posY = pageY - 82;
  const posX = chanelList.offsetWidth / 1.5 + chanelList.offsetLeft;
  store.dispatch(setDropMenu({ posX, posY, idChannel }));
};

const DropDownMenu = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isShowed, posY, posX } = useSelector((state) => state.dropDownMenu);
  const handleClick = (e) => {
    const targetClick = e.target;
    const IsdropdownItem = (targetClick.classList.contains('dropdown-item') || targetClick.classList.contains('dropdown-toggle')
    );
    if (!IsdropdownItem) {
      dispatch(offDropDownMenu());
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
  }, []);

  const RemoveChannelHandler = () => {
    dispatch(modalSwitch({ show: true, modalType: 'remove' }));
  };
  const RenameChannelHandler = () => {
    dispatch(modalSwitch({ show: true, modalType: 'rename' }));
  };

  return (
    <div
      className={cn('dropdown-menu', 'mydropmenu', { show: isShowed })}
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
