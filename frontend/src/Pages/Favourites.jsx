import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductWrapper from "../components/ProductWrapper";
import { getFavAndCart } from "../Helpers/FavAndCart";
import EmptyBox from "../assets/empty-box.gif";
import { CircleLoader } from "react-spinners";
import { FaShoppingCart } from "react-icons/fa";

const Favourites = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const productsData = JSON.parse(localStorage.getItem("products"));

  const [favAndCart, setFavAndCart] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");

    getFavAndCart().then((res) => setFavAndCart(res));
  }, [setFavAndCart]);
  let toShow = null;
  if (!favAndCart) {
    toShow = (
      <div className="relative">
        <CircleLoader
          color="black"
          size={25}
          loading={true}
          className="absolute top-[50vh] left-[50vw]"
        />
      </div>
    );
  } else {
    const favList = favAndCart.favList;
    const data = productsData.filter((product) =>
      favList?.some((cart) => cart.id === product._id)
    );

    toShow =
      favAndCart.favList.length <= 0 ? (
        <div className="flex flex-col items-center mt-40">
          <img src={EmptyBox} alt="empty box" className="w-56" />
          <div className="text-sm font-semibold mb-4 -mt-4">
            Add dishes to favourites!
          </div>
          <Link to="/product">
            <div
              className={`border border-black py-1 px-3 w-fit mx-auto text-sm rounded hover:bg-yellow-500 hover:border-yellow-500 hover:text-white `}
            >
              {" "}
              Products
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-start gap-[2vw] ml-2">
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
    <div className="relative">
      <Navbar />
      <div className="mt-16">{toShow}</div>
      <div
        className="bg-yellow-500 p-4 fixed bottom-4 right-4 rounded-full w-fit"
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart size={30} className="pr-[1px] text-white" />
      </div>
    </div>
  );
};

export default Favourites;
