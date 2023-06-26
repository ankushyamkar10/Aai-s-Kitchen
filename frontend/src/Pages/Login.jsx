import React, { useEffect,useState } from 'react'
import RegisterImg from '../assets/Register.gif'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../app/store'
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import {CircleLoader} from 'react-spinners'

const Login = () => {
  const [formData,setFormData] = useState({
    email:'test2@email',
    currPassword:'Test234',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user,isError,isSuccess,isLoading,message} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    
      if(isSuccess || user )
        navigate('/')

      dispatch(reset());

  },[user,isError,isSuccess,message,navigate,dispatch])

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({email:formData.email,password:formData.currPassword}))
  }

  if(isLoading)
    return <div className="mt-48 ml-44"><CircleLoader color="black" size={25} loading={true}/></div>

  return (
    <main className='flex flex-col mt-2 px-2 mx-auto border-2 w-2/3 md:flex-row lg:flex-row  '>
    <div className='h-fit w-fit'>
      <img src={RegisterImg} alt='Register' className='' />
    </div>
      <div>
        <h3 className='text-xl text-center'>Welcome Back</h3>
        <form className='flex flex-col' onSubmit={(e)=>handleSubmit(e)}>
          <div className='my-2'>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} className='border border-black mx-2 px-2' autoComplete='on' onChange={(e)=>{handleChange(e)}} />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <input type='password' name='currPassword' value={formData.currPassword} className='border border-black mx-2 px-2' autoComplete='on' onChange={(e)=>{handleChange(e)}}/>
          </div>
          <button type="submit" className='border border-black'>Submit</button>
        </form>
        <Link to='/register'><p className='border border-black mt-2'>Regsiter</p></Link>
      </div>
    </main>
  )
}

export default Login
