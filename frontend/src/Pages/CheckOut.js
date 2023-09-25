import React, { useState, useEffect } from "react";
import CheckOutWrapper from "../components/CheckOutWrapper";
import { Link, useNavigate } from "react-router-dom";
import { getFavAndCart } from "../Helpers/FavAndCart";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import EmptyCart from "../assets/empty-cart.gif";
import { toast } from "react-toastify";

const handleClick = async (data, email) => {
  const items = data.map((product) => {
    return {
      quantity: product.quantity,
      price: product.price,
      name: product.name,
      stock: product.stock,
    };
  });

  const res = await axios.post(
    "https://aais-kitchen-backend.onrender.com/api/stripe/pay",
    {
      items,
      email,
    }
  );

  if (!res) {
    toast.error("An internal error occured");
  } else if (res.data) {
    if (res.status === 500) toast.error(res.data.message);
    localStorage.setItem("orderId", JSON.stringify(res.data.session.id));
    window.location = res.data.url;
  }
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [checkOutData, setcheckOutData] = useState({ data: [], totalPrice: 0 });

  const user = JSON.parse(localStorage.getItem("user"));
  const productsData = JSON.parse(localStorage.getItem("products"));
  let toShow;

  useEffect(() => {
    if (!user) navigate("/login");

    getFavAndCart()
      .then(({ cartList }) => setCart(cartList))
      .catch((e) => console.log(e));
  }, [setCart, setcheckOutData]);

  if (!Cart)
    return (
      <div className="mt-48 ml-44">
        <CircleLoader color="black" size={25} loading={true} />
      </div>
    );

  if (Cart?.length !== 0) {
    const data = productsData?.filter((product) =>
      Cart?.some((cart) => cart.id === product._id)
    );

    if (checkOutData?.data?.length === 0) {
      let totalCost = 0;
      let arr = [];
      for (var p in data) {
        const obj = {
          name: data[p].name,
          price: data[p].price,
          quantity: 1,
          stock: data[p].countInStock,
        };
        arr.push(obj);
        totalCost += data[p].price;
      }
      setcheckOutData({ data: arr, totalPrice: totalCost });
    }

    toShow = (
      <div className="flex flex-wrap gap-3 md:gap-6">
        {data?.map((product) => {
          const handleChange = (price, quantity) => {
            let arr = checkOutData.data;
            if (quantity === 0) {
              arr = checkOutData.data.filter((p) => p.name !== product.name);
            } else {
              const index = arr.findIndex((object) => {
                return object.name === product.name;
              });
              arr[index].quantity = quantity;
            }
            const totalCost = checkOutData.totalPrice + price;
            setcheckOutData({ data: arr, totalPrice: totalCost });
          };

          return (
            <div key={product._id}>
              <CheckOutWrapper
                product={product}
                onChange={handleChange}
                setCart={setCart}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="mt-[5.5rem] px-2 relative">
        <div className=" text-xl font-semibold tracking-wider text-yellow-500">
          Checkout
        </div>
        {Cart?.length !== 0 ? (
          <div>
            {toShow}
            <p className="text-lg font-semibold">
              Total Price :{" "}
              <span className="text-md font-medium ml-2">
                {" "}
                ₹{checkOutData.totalPrice}{" "}
              </span>
            </p>
            <button
              className="mt-8 border border-black py-2 px-4 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white"
              onClick={() => handleClick(checkOutData.data, user.email)}
            >
              Buy Now!
            </button>
            <button className="ml-4 border border-black py-2 px-4 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white">
              <Link to="/product">Products</Link>
            </button>
          </div>
        ) : (
          <>
            <div className="mt-[22vh] mx-auto w-fit">
              <img src={EmptyCart} alt="" />
            </div>
            <div className=" border border-black py-1 px-3 w-20 mx-auto text-sm rounded hover:bg-yellow-500 hover:border-yellow-500 hover:text-white ">
              <Link to="/product">Products</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CheckOut;
