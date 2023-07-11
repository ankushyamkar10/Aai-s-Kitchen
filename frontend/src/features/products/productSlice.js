import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://aais-kitchen.onrender.com/api/product'

const initialState = {
  searchTerm: "",
  category: "",
  type: "",
  sort: "",
  data: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const getAllProducts = async () => {
  const response = await axios.get(url);
  return response.data
}

export const getProducts = createAsyncThunk('product/getProduct', async (_, thunkAPI) => {
  try {
    return await getAllProducts()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const productSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setSeachTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload

      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }

})

export const { setSeachTerm, setCategory, setType, setSort } = productSlice.actions;
export { getAllProducts }
export const productReducer = productSlice.reducer