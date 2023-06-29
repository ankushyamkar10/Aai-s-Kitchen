import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../app/store'
import Navbar from '../components/Navbar'
import CarouselComponent from '../components/Carousel'
import gif from '../assets/cooking.gif'
import Footer from '../components/Footer'
import ServicesCard from '../components/ServicesCard'
import services from '../Helpers/Services'

const Home = () => {
  const dispatch = useDispatch()
  
  return (
    <div>
      <Navbar/>
      <div className='mt-[4rem] relative'>
        <img src={gif} alt="cooking.gif" />
        <div className='absolute top-4 left-auto ml-4 w-[80%] font-sans'>
          <span className='text-2xl font-bold block text-yellow-500'>Are you hungry ?</span>
          <span className='text-lg font-medium '>Aai's kitchen brings
            <span className='text-2xl font-bold text-yellow-500'> "Maa" </span>
            ke hath ka khana for you!</span>
        </div>
      </div>
      
      {/* <hr className='border-0 h-[1px] mb-4' style={{backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/> */}

      <div className="text-center">
        <div className='text-2xl font-bold text-yellow-500 mb-6 tracking-wide'>Our Services</div>
        <div className='flex flex-wrap ml-4 -mt-4 py-4 gap-2'>{services.map((service, i) => {
          return <ServicesCard key={i} service={service} />
        })}</div>
      </div>

      <hr className='border-0 h-[1px] mt-4 mb-6' style={{backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/>

      <div className='mx-4'>
        <CarouselComponent />
      </div>

      <Link to='/product'>Product</Link>
      <hr />
      <Link to='/cart'>Cart</Link>
      <hr />
      <Link to='/favourites'>Favourites</Link>
      <hr />
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Footer />
    </div>
  )
}

export default Home