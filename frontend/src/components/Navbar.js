import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LOGO.svg'
import avatar from '../assets/avatar.png'
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa'
import SideBar from '../components/SideBar'

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  return (
    <div className='bg-[#f8c034] w-full shadow-lg pr-2 fixed top-0 z-50'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center justify-start ' onClick={() => { navigate('/') }}>
          <img src={logo} alt="Logo" className='w-36 h-[4rem] ml-2' />
          {/* <h2 className='text-xl font-semibold'>aai's kitchen</h2> */}
        </div>
        <div className="flex items-center gap-4">
          {window.location.pathname !== '/favourites' && <div className='' onClick={() => navigate('/favourites')}><FaHeart className='h-5 w-5' /></div>}
          {window.location.pathname !== '/cart' && <div className='' onClick={() => navigate('/cart')}><FaShoppingCart className='h-5 w-5' /></div>}
          <div>{user ? <SideBar /> : <FaUser className='h-5 w-5' onClick={()=>navigate('/login')}/> }</div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
