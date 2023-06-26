import React, { useState } from "react";
import axios from "axios";

const CheckOutWrapper = ({ product, onChange, setCart, src }) => {
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
    <div className="flex flex-row flex-wrap border border-gray-600 relative w-full my-4 ">
      <div className="relative">
        <img src={src} alt="" className="w-32 h-[7.85rem]" />
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

      <div className="flex flex-col ml-4">
        <h3 className="text-md">{product.name}</h3>
        <h3 className="text-sm">{product.description}</h3>

        <p className="text-sm">Price : {product.price}</p>
        <p className="text-sm">Rating : {product.rating}</p>

        <div className="flex flex-row my-2 items-center">
          <div className="flex flex-row">
            <button
              className=" px-2 border border-black"
              onClick={() => {
                if (quantity > 1) {
                  onChange(product.price * -1, quantity - 1);
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>
            <p className=" px-2 border border-black">{quantity}</p>
            <button
              className=" px-2 border border-black"
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
            className="ml-4 border border-black px-2 "
            onClick={handleCart}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutWrapper;
