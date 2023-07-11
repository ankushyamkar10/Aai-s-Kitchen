import React, { useState, useEffect } from 'react';
import RegisterImg from '../assets/Register.gif';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../app/store';
import { toast } from 'react-toastify'
import { CircleLoader } from 'react-spinners'
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError)
      toast.error(message)

    if (isSuccess || user)
      navigate('/')

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

  }

  const handleSubmit = (e) => {

    console.log(formData);
    e.preventDefault()
    if (formData.password1 !== formData.password2)
      toast.error('Passwords do not match')
    else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password1
      }
      dispatch(register(userData))
    }
  }

  if (isLoading)
    return <div className="relative">
      <CircleLoader color="black" size={25} loading={true} className="absolute top-[50vh] left-[50vw]" />
    </div>


  return (
    <div className='bg-gray-200 relative h-[100vh]'>
      <Navbar />
      <div className='flex flex-col gap-4 w-[80vw] mx-[10vw] p-6 bg-white absolute top-[15%] md:w-[60vw] md:mx-[20vw] lg:w-[40vw] lg:mx-[30vw]'>
        <div className='w-64' >
          <img src={RegisterImg} alt='Register' className='h-52 w-full mx-auto' />
        </div>
        <div className=''>
          <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
            <div className='mt-2'>
              <input type='email' name='name' title='Enter your name' value={formData.name} className='text-sm w-full p-2 my-2 border border-gray-400 focus:outline-none rounded ' placeholder='Username' autoComplete='on' required onChange={(e) => { handleChange(e) }} />
            </div>
            <div className=''>
              <input type='email' name='email' title='Enter your email' value={formData.email} className='text-sm w-full p-2 my-2 border border-gray-400 focus:outline-none rounded ' placeholder='Email' autoComplete='on' required onChange={(e) => { handleChange(e) }} />
            </div>
            <div className=''>
              <input type='password' name='password1' title='Enter your password' value={formData.password1} className='text-sm w-full p-2 my-2 border border-gray-400 focus:outline-none rounded ' placeholder='Password' required onChange={(e) => { handleChange(e) }} />
            </div>
            <div className='my-2'>
              <input type='password' name='password2' title='Confirm password' value={formData.password2} className='text-sm w-full p-2 mb- border border-gray-400 focus:outline-none rounded' placeholder='Confirm password' required onChange={(e) => { handleChange(e) }} />
            </div>
            <button type="submit" className='text-md py-2 my-2 bg-yellow-500 text-white rounded'>Submit</button>
          </form>
          <div className="text-xs text-center">Have an account? <span className='text-sm text-yellow-500'><Link to='/login'>Login</Link></span></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
