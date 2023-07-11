import { configureStore } from '@reduxjs/toolkit';
import { productReducer,setCategory, setSeachTerm,setType,setSort } from '../features/products/productSlice';
import { authReducer } from '../features/auth/authSlice';
import { reset,register,login,logout } from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    auth : authReducer,
  },
});

export {store,setCategory, setSeachTerm,setType,setSort,reset,register,login,logout};