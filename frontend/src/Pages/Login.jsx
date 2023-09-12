import React, { useEffect, useState } from 'react'
import RegisterImg from '../assets/Register.gif'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../app/store'
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import { CircleLoader } from 'react-spinners'
import Navbar from '../components/Navbar'
import GLogin from '../assets/Google.svg'
import axios from 'axios'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    currPassword: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user)
      navigate('/')

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email: formData.email, password: formData.currPassword }))
  }

  const handleGetUrl = async () => {
    const response = await axios.get('https://aais-kitchen-backend.onrender.com/api/users/getGoogleOAUthUrl')
    window.location.assign(response.data)
  }

  if (isLoading)
    return <div className="relative">
      <CircleLoader color="black" size={25} loading={true} className="absolute top-[50vh] left-[50vw]" />
    </div>

  return (
    <div className='bg-gray-200 relative h-[100vh]'>
      <Navbar />
      <div className='flex flex-col gap-4 w-[80vw] mx-[10vw] p-6 bg-white absolute top-[20%] md:w-[60vw] md:mx-[20vw] lg:w-[40vw] lg:mx-[30vw]'>
        <div className='w-52 md:w-60 mx-auto' >
          <img src={RegisterImg} alt='Register' className='h-52 w-full mx-auto' />
        </div>

        <section className='flex items-center justify-center w-fit my-4 mx-auto p-3 border border-gray-400 cursor-pointer' onClick={handleGetUrl}>
          <img src={GLogin} alt="" className='mr-2 ' />
          <div>Google</div>
        </section>
        <div style={{ margin: ' auto' }}>
          OR
        </div>
        <div className=''>
          <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
            <div className='my-2'>
              <input type='email' name='email' value={formData.email} className='text-sm w-full p-2 my-2 border border-gray-400 focus:outline-none rounded ' placeholder='Username' autoComplete='on' onChange={(e) => { handleChange(e) }} />
            </div>
            <div className='mb-2'>
              <input type='password' name='currPassword' value={formData.currPassword} className='text-sm w-full p-2 mb- border border-gray-400 focus:outline-none rounded' placeholder='Password' onChange={(e) => { handleChange(e) }} />
            </div>
            <button type="submit" className='text-md py-2 my-2 bg-yellow-500 text-white rounded'>Submit</button>
          </form>

          <div className='text-xs text-center mt-1'>Didn't have account? <span className='text-sm text-yellow-500'><Link to='/register'>Regsiter</Link></span></div>
        </div>
      </div>
    </div>
  )
}

export default Login

