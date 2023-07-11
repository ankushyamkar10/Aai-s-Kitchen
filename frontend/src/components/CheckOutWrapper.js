import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import StarRatings from "react-star-ratings";


const CheckOutWrapper = ({ product, onChange, setCart }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [quantity, setQuantity] = useState(product.countInStock === 0 ? 0 : 1);

  const color = product.type === "Non Veg" ? "red" : "green";

  const handleCart = async () => {
    const response = await axios.patch(
      `http://localhost:3001/api/users/cart?action=remove`,
      {
        userId: user.id,
        productId: product._id,
      }
    );
    if (response.data) {
      onChange(-1 * quantity * product.price, 0);
      setCart(response.data);
    }
  };

  return (
    <div className="flex flex-row flex-wrap relative w-full my-4 border border-black md:w-fit pr-4 ">
      <div className="relative">
        <img src={product.imgUrl} alt="" className="w-32 h-[8.2rem]" />
        <div
          className={` w-4 h-4  absolute right-2 top-2 bg-white border-2 `}
          style={{ borderColor: color }}
        >
          <div
            className={` w-2 h-2 z-10 rounded-full absolute top-[16%] left-[16%]`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col ml-4 ">
        <h3 className="text-lg tracking-wide">{product.name}</h3>
        <h3 className="text-sm">{product.description}</h3>

        <p className="text-sm">Price : ₹{product.price}</p>
        <p className="text-sm"><StarRatings
          rating={product.rating}
          starDimension="15px"
          starSpacing="0px"
          starEmptyColor="grey"
          starRatedColor="#FFD93D"
        /> <span className="text-[0.6rem] ml-1">{`(${product.rating} / 5)`} </span></p>

        <div className="flex flex-row mt-1 mb-2 items-center">
          <div className="flex flex-row items-center">
            <button
              className=" px-2 border border-r-0 text-xl border-black "
              onClick={() => {
                if (quantity > 1) {
                  onChange(product.price * -1, quantity - 1);
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>
            <p className=" px-2 border text-sm py-1 border-black">{quantity}</p>
            <button
              className=" px-2 text-xl border border-l-0 border-black "
              onClick={() => {
                if (quantity < product.countInStock) {
                  console.log(product.countInStock);
                  onChange(product.price * 1, quantity + 1);
                  setQuantity(quantity + 1);
                }
              }}
            >
              +
            </button>
          </div>
          <button
            className="ml-4 px-2 py-[0.38rem] text-red-600 border border-red-600"
            onClick={handleCart}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutWrapper;
