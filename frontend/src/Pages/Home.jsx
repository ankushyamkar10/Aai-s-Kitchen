import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CarouselComponent from '../components/Carousel'
import gif from '../assets/cooking.gif'
import Footer from '../components/Footer'
import ServicesCard from '../components/ServicesCard'
import services from '../Helpers/Services'
import { FiArrowUpRight, FiPenTool } from 'react-icons/fi'
import Review from '../components/Review'
import { FaShoppingCart } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div className='mt-[5rem] mx-4 relative md:flex md:flex-row-reverse md:-mt-5'>
        <div className=''><img src={gif} alt="cooking.gif" /></div>
        <div className='absolute top-0 left-auto w-[80%] font-sans md:relative md:mt-28'>
          <span className='text-xl md:text-3xl font-bold block text-yellow-500'>Are you hungry ?</span>
          <span className='text-md md:text-xl font-medium '>Aai's kitchen brings
            <span className='text-xl md:text-3xl font-bold text-yellow-500'> "Maa" </span>
            ke hath ka khana for you!</span>
          <div className="flex items-center absolute top-24 md:top-28 bg-yellow-500 text-white text-sm w-fit px-2 py-1 md:text-lg" onClick={() => { navigate('/product') }}>Try out <FiArrowUpRight className='ml-1' /></div>
        </div>
      </div>

      {/* <hr className='border-0 h-[1px] mb-4' style={{backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))'}}/> */}

      <hr className='border-0 h-[1px] mb-6' style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))' }} />

      <div className='mx-4 md:my-8'>
        <CarouselComponent />
      </div>

      <hr className='border-0 h-[1px] my-6' style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))' }} />

      <div className="text-center">
        <div className='text-2xl font-bold text-yellow-500 mb-6 tracking-wide'>Our Services</div>
        <div className='flex flex-wrap ml-[0.87rem] -mt-4 py-4 gap-2 md:items-center md:justify-center md:mx-[10vw] md:gap-8'>
          {services.map((service, i) => {
            return <ServicesCard key={i} service={service} />
          })}</div>
      </div>

      <hr className='border-0 h-[1px] my-4' style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))' }} />

      <div className='mx-4 mb-6'>
        <div className='text-center text-2xl font-bold text-yellow-500 mb-4 tracking-wide'>Reviews</div>
        <div className="border border-gray-300 md:mx-[16vw]">
          <Review />
        </div>
        <div className="flex items-center justify-between my-4 md:mx-[16vw]">
          <div className="text-sm">
            Want to express yourself about us ?
          </div>
          <div className='py-1 px-2 ml-4 flex items-center gap-2 text-sm  bg-yellow-500 text-white border hover:bg-white hover:text-yellow-500 hover:border-yellow-500 rounded-sm' onClick={() => { navigate('/review') }}>
            Write <FiPenTool />
          </div>
        </div>
      </div>
      <div className='bg-yellow-500 p-4 fixed bottom-4 right-4 rounded-full w-fit' onClick={() => navigate('/cart')}>
        <FaShoppingCart size={30} className='pr-[1px] text-white' />
      </div>
      <Footer />
    </div>
  )
}

export default Home