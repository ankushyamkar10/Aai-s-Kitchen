import React, { useState, useEffect } from "react";
import CheckOutWrapper from "../components/CheckOutWrapper";
import { Link, useNavigate } from "react-router-dom";
import { getFavAndCart } from "../Helpers/FavAndCart";
import axios from "axios";
import images from "../Helpers/images";

const handleClick = async (data) => {
  const items = data.map((product) => {
    return {
      quantity: product.quantity,
      price: product.price,
      name: product.name,
    };
  });

  const res = await axios.post("http://localhost:3001/api/stripe/pay", {
    items,
  });

  if (!res) {
    alert("An error occured");
  } else if (res.data) {
    localStorage.setItem("orderId", JSON.stringify(res.data.session.id));
    window.location = res.data.url;
  }
};

let total = 0;
const CheckOut = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [checkOutData, setcheckOutData] = useState({ data: [],totalPrice : 0 });

  const user = JSON.parse(localStorage.getItem("user"));
  const productsData = JSON.parse(localStorage.getItem("products"));

  useEffect(() => {
    if (!user) navigate("/login");

    getFavAndCart()
      .then(({cartList}) => setCart(cartList))
      .catch((e) => console.log(e));
  }, [setCart, setcheckOutData]);

  if (!Cart) return <>loading...</>;

  if (Cart?.length === 0)
    return (
      <>
        <p>No Products</p>
        <Link to="/product">
          <button className=" border border-black py-2 px-4">Products</button>
        </Link>
      </>
    );

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
      };
      arr.push(obj);
      totalCost += data[p].price;
    }
    total = totalCost;
    setcheckOutData({ data: arr,totalPrice:totalCost });
  }

  const toShow = data?.map((product) => {
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
      setcheckOutData({ data: arr,totalPrice: totalCost });
    };

    const src = images.filter((item) => item.includes(product.name));

    return (
      <div key={product._id}>
        <CheckOutWrapper
          product={product}
          onChange={handleChange}
          setCart={setCart}
          src={src}
        />
      </div>
    );
  });

  return (
    <div className=" relative">
      <h1 className="p-2 border shadow-xl z-10">Check Out!</h1>
      {toShow}

      <p>Total price :- $ {checkOutData.totalPrice}</p>
      {/* <Link to="/payment"> */}
      <button
        className="mt-2 border border-black py-2 px-4"
        onClick={() => handleClick(checkOutData.data)}
      >
        Buy Now!
      </button>
      {/* </Link> */}
      <Link to="/product">
        <button className="ml-4 border border-black py-2 px-4">Products</button>
      </Link>
    </div>
  );
};

export default CheckOut;
