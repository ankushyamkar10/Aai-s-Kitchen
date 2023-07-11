import React, { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import avatar from '../assets/avatar.png'
import { MdLogout,MdFoodBank } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../app/store';


export default function SideBar() {

  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  const list = () => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['My Orders'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate('/orders')}>
              <MdFoodBank className='mr-2 h-6 w-6' />
              <ListItemText primary={text} className='font-black' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>

      <Fragment>
        <button onClick={toggleDrawer(true)}><img src={avatar} alt='avatar' className='h-8 w-8 rounded-full' /></button>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className='flex items-center justify-between py-2 mx-4'>
            <div className="">
              <div className='text-lg'>Hi, <span className='text-yellow-500 text-xl font-semibold'>{user.name}</span></div>
              <div className='text-sm'>{user.email}</div></div>
            <div className="flex items-center ml-4 border border-black py-2 px-4 hover:text-white hover:bg-yellow-500 hover:border-yellow-500" onClick={() => { dispatch(logout()); navigate('/') }}><MdLogout className='mr-1' /> Logout</div></div>
          {list()}
        </SwipeableDrawer>
      </Fragment>

    </div>
  );
}
