import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductWrapper from "../components/ProductWrapper";
import { getFavAndCart } from "../Helpers/FavAndCart";
import images from "../Helpers/images";
import Navbar from "../components/Navbar";
import { CircleLoader } from "react-spinners";

const Cart = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const productsData = JSON.parse(localStorage.getItem("products"));

  const [favAndCart, setFavAndCart] = useState();
  let toShow;
  useEffect(() => {
    if (!user) navigate("/login");
    getFavAndCart().then((res) => setFavAndCart(res));
  }, [setFavAndCart]);

  if (favAndCart) {
    const cartList = favAndCart.cartList;
    const data = productsData?.filter((product) =>
      cartList?.some((cart) => cart.id === product._id)
    );

    toShow = (
      <div className="flex flex-wrap items-center gap-[2vw] ml-2">
        {data?.map((product) => {
          return (
            <div key={product._id}>
              <ProductWrapper
                product={product}
                favAndCart={favAndCart}
                setFavAndCart={setFavAndCart}
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
      {!favAndCart ? (
        <div className="mt-48 ml-44">
          <CircleLoader color="black" size={25} loading={true} />
        </div>
      ) : (
        <div className="mt-[4rem]">
          {toShow}
          <div className="mt-4">
            <Link to="/product">
              <button className=" border border-black py-2 px-4">Products</button>
            </Link>
            <Link to="/checkOut">
              <button className="ml-4 border border-black py-2 px-4">
                Check Out!
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;