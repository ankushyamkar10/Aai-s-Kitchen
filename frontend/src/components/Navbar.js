import React, { useState } from 'react'
import logo from '../assets/logo.png'
import {GrMenu,GrClose, GrCart} from 'react-icons/gr'
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-white w-full border border-gray-200 shadow-md pr-2 fixed top-0 z-50'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center justify-start' onClick={()=>{navigate('/')}}>
            <img src={logo} alt="Logo" className='w-16 h-16 rounded-full' />
            <h2 className='text-xl font-semibold'>aai's kitchen</h2>
        </div>
        {window.location.pathname !== '/cart' && <div onClick={()=>navigate('/cart')}><GrCart className='h-6 w-6' /></div>}
      </nav>
    </div>
  )
}

export default Navbar
