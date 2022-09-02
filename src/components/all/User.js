import React,{useState} from 'react';
import { Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout as out, selectUser } from '../../services';
import { auth, getAuth, logout } from '../../firebase';
import { DynamicMDIcon, DynamicAIIcon } from './DynamicIcon';

export function User(){
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const login = useSelector(state => state.login?.user);
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    logout();
    dispatch(out());
    // console.log(user)
  };
  const menuStyle = {paddingTop: 5, paddingBottom: 5, borderRadius: 5};


  const menu = (
    <Menu style={menuStyle}>
      <Menu.Item >
        <div className='drop_user_back'>
          <DynamicAIIcon className='drop_user_icon' name='AiOutlineUser' />
          <div>
            <p className='drop_user_name'>{user?.displayName}</p>
            <p className='drop_user_email'>{login?.CpnyID }</p>
            <p className='drop_user_email'>{login?.WebUserID  }</p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='divider' />
      </Menu.Item>
      <Menu.Item
             >
        <div className='menu_language_back' onClick={logoutOfApp}>
          <span className='menu_language' >{t('login.logout')}</span>
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