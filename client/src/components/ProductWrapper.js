import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const ProductWrapper = ({ product, favAndCart, setFavAndCart,src }) => {
  const user = JSON.parse(localStorage.getItem("user"));
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
      if (response.data) {
        setFavAndCart({ ...favAndCart, cartList: response.data });
      }
    }
  };

  return (
    <div className="flex flex-col flex-wrap border relative w-32 my-4 ">
      <img src={src} alt={product.name} className="w-full h-32 max-h-32" />
      <h3 className="text-md">{product.name}</h3>
      <h3 className="text-sm">{product.description}</h3>
      <div
        className={` w-4 h-4  absolute right-2 top-2 bg-white border-2 `}
        style={{ borderColor: color }}
      >
        <div
          className={` w-2 h-2 z-10 rounded-full absolute top-[16%] left-[16%]`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <p>{product.price}</p>
      <p>{product.rating}</p>
      {path !== "/checkOut" && (
        <div
          onClick={() => handleFavoutites("/favourites")}
          className="cursor-pointer"
        >
          {addedToFav ? (
            <FaHeart className="w-5 h-5 z-10 absolute top-[2%] left-[2%]" />
          ) : (
            <FaRegHeart className="w-5 h-5 z-10 absolute top-[2%] left-[2%]" />
          )}
        </div>
      )}

      {path !== "/checkOut" && (
        <button
          className="px-2 text-xs border border-black absolute bottom-[2%] right-[2%]"
          onClick={() => handleCart("/cart")}
        >
          {addedToCart ? "Remove" : "Add"}
        </button>
      )}
    </div>
  );
};

export default ProductWrapper;
