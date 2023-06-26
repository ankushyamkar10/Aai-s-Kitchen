import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../app/store'
import Navbar from '../components/Navbar'
import CarouselComponent from '../components/Carousel'
import gif from '../assets/cooking.gif'
import Footer from '../components/Footer'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)

  useEffect( ()=>{
    if(!user)
      navigate('/login')
  },[dispatch,navigate,user])

  
  return (
    <div>
        <Navbar />
        <div><img src={gif} alt="" /></div>
        {/* <CarouselComponent /> */}
        <Link to='/product'>Product</Link>
        <hr />
        <Link to='/cart'>Cart</Link>
        <hr />
        <Link to='/favourites'>Favourites</Link>
        <hr />
        <button onClick={()=>dispatch(logout())}>Logout</button>
        <Footer />
    </div>
  )
}

export default Home