import React from 'react';
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout as out,  } from '../../services';
import { auth, logout } from '../../firebase';
import { DynamicMDIcon, DynamicAIIcon } from './DynamicIcon';
import { vendor_pdf } from '../../assets';

export function User(){
  const { t , i18n} = useTranslation();
  const [user] = useAuthState(auth);

  const login = useSelector(state => state.login?.user);
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    logout();
    dispatch(out());
  };
  const menuStyle = {paddingTop: 5, paddingBottom: 5, borderRadius: 5};

  const onPressLanguage = () => {
    i18n.changeLanguage(i18n?.language === 'mongol' ? 'english' : 'mongol');
  }

  const menu = (
    <Menu style={menuStyle}>
      <Menu.Item >
        <div className='drop_user_back'>
          <DynamicAIIcon className='drop_user_icon' name='AiOutlineUser' />
          <div>
            <p className='drop_user_name'>{user?.displayName}</p>
            {/* <p className='drop_user_email'>{login?.CpnyID }</p> */}
            <p className='drop_user_email'>{login?.WebUserID  }</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key='guide'>
        <a href={vendor_pdf} target='_blank' rel='noopener noreferrer'>
          <div className='menu_language_back2'>
            <DynamicMDIcon className='menu_icon2' name='MdHelpOutline' />
            <span className='menu_language'>{t('guide')}</span>
          </div>
        </a>
      </Menu.Item>
      <Menu.Item key='language' onClick={onPressLanguage}>
        <div className='menu_language_back2'>
          <DynamicMDIcon className='menu_icon2' name='MdLanguage' />
          <span className='menu_language'>{i18n?.language === 'mongol' ? 'Монгол' : 'English'}</span>
        </div>
      </Menu.Item>
      <Menu.Item key='divider'>
        <div className='divider' />
      </Menu.Item>
      <Menu.Item >
        <div className='menu_logout_back' onClick={logoutOfApp}>
         <DynamicAIIcon className='drop_icon' name='AiOutlineLogout'/>
          <span className='menu_logout' iconAiOutlineLogout >{t('login.logout')}</span>
        </div> 
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
       <button className='header_user_back' >
        <DynamicAIIcon className='header_user' name='AiOutlineUser' />
        <span className='header_user_name'>{user?.displayName}</span>
        <DynamicMDIcon className='header_user_icon' name='MdKeyboardArrowDown' />
      </button> 
    </Dropdown>
  )
}