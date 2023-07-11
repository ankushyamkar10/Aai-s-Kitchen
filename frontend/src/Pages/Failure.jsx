import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ErrorGif from '../assets/Error.gif'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
  const orderId = JSON.parse(localStorage.getItem('orderId'))
  const navigate = useNavigate()

  useEffect(()=>{
    if(!orderId)
      navigate('/')
    localStorage.removeItem('orderId')
  },[])
  return (
    <div>
      <Navbar />
      <div className='mt-[4.5rem] ml-4 relative flex flex-col'>
        <div className="text-lg mt-2 flex items-center">Order Failed !  </div>
        <div className='mt-4 flex items-center'>

          <button className="bg-yellow-500 text-white border border-yellow-500 py-1 px-2 hover:bg-white hover:text-yellow-500 rounded" onClick={() => { navigate('/checkout')}}>
            Try Again
          </button>

          <button className="ml-4 bg-yellow-500 border text-white border-yellow-500 py-1 px-2 hover:bg-white hover:text-yellow-500 rounded" onClick={() => {navigate('/orders')}}>
            My Orders
          </button>

        </div>
        <div className="absolute top-24 left-[20%] md:left-[38%]">
          <img src={ErrorGif} alt="" className='h-96' /></div>
      </div>
    </div>
  )
}

export default Failure
