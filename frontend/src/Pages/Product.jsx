import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GrFilter, GrSearch } from "react-icons/gr";
import {
  setSeachTerm,
  setCategory,
  setType,
  setSort,
} from "../features/products/productSlice";
import ProductList from "../components/productList";
import Navbar from "../components/Navbar";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";


const label = { inputProps: { "aria-label": "Switch demo" } };

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { isError, message } = useSelector((state) => state.product);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isError) toast.error(message);

    if (!user) navigate("/login");
  }, [dispatch, isError, message]);

  const onSearchTermChange = (e) => {
    dispatch(setSeachTerm(e.target.value));
  };

  const onCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const onTypechange = (e) => {
    dispatch(setType(e.target.checked ? "Non Veg" : "Veg"));
    setChecked(!checked);
  };

  const onSort = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <>
      <Navbar />
      <div className="px-[2vw] mt-16">
        <div className="relative flex flex-row flex-wrap gap-2 ">
          <div className="flex flex-1 min-w-full text-lg font-semibold mt-2">
            Search
          </div>
          <div className="w-full relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Find dishes here"
              onChange={(e) => onSearchTermChange(e)}
              className="w-full py-1 px-2 mr-2 border text-md border-black focus:outline-none rounded-md"
              autoComplete="on"
            />
            <GrSearch className="absolute top-[0.55rem] right-2" size={20} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-1 items-center min-w-full text-lg font-semibold ">
              Filters
              <GrFilter className="ml-2" size={16} />
            </div>

            <div className={`flex`}>
              <div className="text-md font-medium w-full">
                <select
                  name="category"
                  id="category"
                  onChange={(e) => onCategoryChange(e)}
                  className="w-[47vw] mt-2 py-1 px-1 mr-0 border border-black rounded-md"
                >
                  <option value="">Meals</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div className="text-md font-medium w-full">
                <select
                  name="type"
                  id="type"
                  onChange={(e) => onSort(e)}
                  className="w-[47vw] mt-2 py-1 px-2 ml-1 border border-black rounded-md"
                >
                  <option value="">Sort</option>
                  <option value="HTL">high to low</option>
                  <option value="LTH">low to high</option>
                  <option value="Rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-2 w-full items-center">
          <div className=" text-lg font-semibold ">Category :</div>
          <div className="font-normal ml-4"> Veg</div>
          <div className="-mx-4">
            <FormControl className="-pr-4">
              <FormGroup>
                <FormControlLabel
                  labelPlacement="top"
                  control={
                    <Switch
                      {...label}
                      checked={checked}
                      onChange={(event) => onTypechange(event)}
                      color="error"
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </div>
          <div className=" font-normal">Non Veg</div>
          <div><button className="absolute right-2 top-[14.45rem]   px-3 py-1 text-md hover:border border-black rounded-[0.25rem]" onClick={(e) => { dispatch(setType("")); setChecked(false) }}>Reset</button>
          </div>
        </div>
        <ProductList />
      </div>
    </>
  );
};

export default Product;
