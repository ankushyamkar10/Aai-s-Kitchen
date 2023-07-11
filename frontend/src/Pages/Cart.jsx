import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductWrapper from "../components/ProductWrapper";
import { getFavAndCart } from "../Helpers/FavAndCart";
import Navbar from "../components/Navbar";
import { CircleLoader } from "react-spinners";
import EmptyCart from '../assets/empty-cart.gif'

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
      <div className={` flex flex-wrap items-center justify-start gap-2 md:gap-8`} >
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
        <div className="relative">
        <CircleLoader color="black" size={25} loading={true} className="absolute top-[50vh] left-[50vw]"/>
      </div>
      ) : (
        <div className="mt-[4rem] mx-2 ">
          {toShow}
          <div className={`mt-4 ${favAndCart.cartList?.length > 0 && 'flex'}`} >
            {favAndCart.cartList?.length > 0 ? <Link to="/checkOut">
              <button className=" border border-black py-2 px-4 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white md:mt-8">
                Check Out!
              </button>
            </Link> : <div className="mt-[22vh] mx-auto w-fit"><img src={EmptyCart} alt=""  />
            </div>
            }
             <Link to="/product">
              <div className={` border border-black ${favAndCart.cartList?.length > 0 ? 'ml-4 w-fit py-2 px-4' : 'py-1 px-3 w-20 mx-auto text-sm rounded'} hover:bg-yellow-500 hover:border-yellow-500 hover:text-white md:mt-8 `}>Products</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
//<div className={`border border-black py-1 px-3 w-fit mx-auto text-sm rounded hover:bg-yellow-500 hover:border-yellow-500 hover:text-white `}> Products</div>
