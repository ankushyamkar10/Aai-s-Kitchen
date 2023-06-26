import React, { useState, useEffect } from 'react';
import RegisterImg from '../assets/Register.gif';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../app/store';
import { toast } from 'react-toastify'
import { CircleLoader } from 'react-spinners'

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
    e.preventDefault()
    if (formData.password !== formData.password2)
      toast.error('Passwords do not match')
    else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading)
    return <div className="mt-48 ml-44"><CircleLoader color="black" size={25} loading={true} /></div>


  return (
    <main className='flex flex-col mt-2 px-2 mx-auto border-2 w-2/3 md:flex-row lg:flex-row  '>
      <div className='h-fit w-fit'>
        <img src={RegisterImg} alt='Register' className='' />
      </div>
      <div>
        <h3 className='text-xl text-center'>Welcome Back</h3>
        <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
          <div className='mt-2'>
            <label>Username</label>
            <input type='text' name='name' value={formData.name} className='border border-black mx-2 px-2' onChange={(e) => { handleChange(e) }} />
          </div>
          <div className='my-2'>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} className='border border-black mx-2 px-2' onChange={(e) => { handleChange(e) }} />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <input type='password' name='password1' value={formData.password} className='border border-black mx-2 px-2' onChange={(e) => { handleChange(e) }} />
          </div>
          <div className='mb-2'>
            <label>Confirm Password</label>
            <input type='password' name='password2' value={formData.password2} className='border border-black mx-2 px-2' onChange={(e) => { handleChange(e) }} />
          </div>
          <button type="submit" className='border border-black'>Submit</button>
        </form>
        <Link to='/login'><p className='border border-black mt-2'>Login ...</p></Link>
      </div>
    </main>
  );
};

export default Register;
