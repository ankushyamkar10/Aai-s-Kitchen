import React, { useState } from "react";
import { FaHeart, FaCaretDown, FaCaretUp, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { Rating } from "@mui/material";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";

const ProductWrapper = ({ product, favAndCart, setFavAndCart }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showDrawer, setShowDrawer] = useState(false);

  const path = window.location.pathname;
  const color = product.type === "Non Veg" ? "red" : "green";

  const addedToCart = favAndCart?.cartList?.some((p) => p.id === product._id);
  const addedToFav = favAndCart?.favList?.some((p) => p.id === product._id);

  const handleFavoutites = async (pathname) => {
    let action;

    if (addedToFav) action = "remove";
    else action = "add";

    const response = await axios.patch(
      `http://localhost:3001/api/users${pathname}?action=${action}`,
      {
        userId: user.id,
        productId: product._id,
      }
    );

    if (response.data) {
      setFavAndCart({ ...favAndCart, favList: response.data });
    }
  };

  const handleCart = async (pathname) => {
    let action;
    action = addedToCart ? "remove" : "add";

    const response = await axios.patch(
      `http://localhost:3001/api/users${pathname}?action=${action}`,
      {
        userId: user.id,
        productId: product._id,
      }
    );

    if (response.data) {
      setFavAndCart({ ...favAndCart, cartList: response.data });
    }
  };

  return (
    <div className=" relative w-[47vw] my-4 h-[20rem]">
      <div className="flex flex-col flex-wrap">
        {product.countInStock === 0 && (
          <div className="bg-white bg-opacity-10 w-[47vw] h-[19.1rem] absolute z-50 backdrop-blur-[1px] "></div>
        )}
        <img src={product.imgUrl} alt={product.name} className=" h-44 max-h-38 " />
        <div className="px-1 border border-gray-200 border-t-0">
          <h3 className="text-md font-semibold ">{product.name}</h3>
          <h3 className="text-sm">{product.description}</h3>
          <div
            className={` w-4 h-4  absolute right-2 top-2 bg-white border-2 `}
            style={{ borderColor: color }}
          >
            <div
              className={` w-2 h-2 z-10 rounded-full absolute top-[20%] left-[20%]`}
              style={{ backgroundColor: color }}
            ></div>
          </div>

          <p className="-mb-1">₹ {product.price}</p>
          <StarRatings
            rating={product.rating}
            starDimension="15px"
            starSpacing="0px"
            starEmptyColor="grey"
            starRatedColor="#FFD93D"
          />
          <span className="text-xs ml-1">{`(${product.rating} / 5)`} </span>

          <div className="flex items-center justify-between relative my-2">
            <button className="flex items-center px-2 py-1 text-xs border border-black  hover:text-white hover:bg-yellow-500 hover:border-0 rounded-[0.25rem]" onClick={() => setShowDrawer(!showDrawer)}  >
              Details {showDrawer ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
            </button>
            {path !== "/checkOut" && (
              <button
                className={`px-3 py-1 text-xs border border-black hover:text-white hover:bg-yellow-500 hover:border-0 rounded-[0.25rem]`}
                onClick={() => handleCart("/cart")}
                disabled={product.countInStock === 0 ? true : false}
              >
                {addedToCart ? "Remove" : "Add"}
              </button>
            )}
          </div>

          {showDrawer && <div className="text-[0.7rem] leading-3 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, obcaecati? Nostrum sunt
          </div>
          }
          {path !== "/checkOut" && (
            <div
              onClick={() => handleFavoutites("/favourites")}
              className="cursor-pointer"
            >
              {addedToFav ? (
                <FaHeart className="w-5 h-5 z-10 absolute top-[11.3rem] right-[2%] text-red-600" />
              ) : (
                <FaRegHeart className="w-5 h-5 z-10 absolute top-[11.3rem]  right-[2%] text-red-600" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductWrapper;

