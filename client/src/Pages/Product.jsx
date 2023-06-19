import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { setSeachTerm,setCategory, setType, setSort } from '../features/products/productSlice';
import ProductList from '../components/productList';

const Product = () => {
  
    const  dispatch = useDispatch()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))

    const {isError,message} = useSelector((state=>state.product))
    
    
    useEffect(()=>{
      
      if(isError)
        toast.error(message)

      if(!user)
        navigate('/login')
      
    },[dispatch,isError, message])

    const onSearchTermChange = (e) => {
      dispatch(setSeachTerm(e.target.value))
    }

    const onCategoryChange = (e) => {
      dispatch(setCategory(e.target.value))
    }

    const onTypechange = (e) => {
      dispatch(setType(e.target.value))
    }

    const onSort = (e) => {
      dispatch(setSort(e.target.value))
    }
    
    return (
    <div className='relative flex flex-row flex-wrap gap-2'>
      <div>
        <input type="text" name="search" id="search" onChange={(e)=>onSearchTermChange(e)} className='mt-5 mr-2 border border-black'/>
        <select name="category" id="category" onChange={(e)=>onCategoryChange(e)} className='mt-5 mx-2 border border-black'>
          <option value="" >All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <select name="type" id="type" onChange={(e)=>onTypechange(e)} className='mt-5 mx-2 border border-black'>
          <option value="" >All</option>
          <option value="Veg">Veg</option>
          <option value="Non Veg">Non Veg</option>
        </select>
        <select name="type" id="type" onChange={(e)=>onSort(e)} className='mt-5 mx-2 border border-black'>
          <option value="" >All</option>
          <option value="HTL">high to low</option>
          <option value="LTH">low to high</option>
          <option value="Rating">Rating</option>
        </select>
      </div>
      <ProductList/>
    </div>
  )
}

export default Product
/*category
: 
"Breakfast"
countInStock
: 
8
createdAt
: 
"2023-03-05T10:57:27.722Z"
description
: 
"ZhanZhanit Misal"
name
: 
"Misal Pav"
price
: 
50
rating
: 
4
type
: 
"Veg" */