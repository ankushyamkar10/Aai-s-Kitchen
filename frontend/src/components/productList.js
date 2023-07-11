import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductWrapper from "./ProductWrapper";
import { getFavAndCart } from "../Helpers/FavAndCart";
// import images from "../Helpers/images";
import { CircleLoader } from "react-spinners";

const ProductList = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const productsData = JSON.parse(localStorage.getItem("products"));
  const [favAndCart, setFavAndCart] = useState();

  useEffect(() => {
    if (!user) navigate("/login");

    getFavAndCart().then((res) => setFavAndCart(res));
  }, [setFavAndCart]);

  const { data } = useSelector(
    ({ product: { searchTerm, category, type, sort } }) => {
      let filteredData = productsData?.filter((product) => {
        let se =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        if (category.length !== 0) se = se && product.category === category;
        if (type.length !== 0) se = se && product.type === type;
        return se;
      });

      if (sort.length !== 0) {
        if (sort === "LTH")
          filteredData.sort((a, b) => {
            return a.price - b.price;
          });
        else if (sort === "HTL")
          filteredData.sort((a, b) => {
            return b.price - a.price;
          });
        else if (sort === "Rating")
          filteredData.sort((a, b) => {
            return b.rating - a.rating;
          });
      }

      return {
        data: filteredData,
      };
    }
  );
  if (!favAndCart) return <div className="relative">
    <CircleLoader color="black" size={25} loading={true} className="absolute top-[50vh] left-[50vw]" />
  </div>

  const toShow = (
    <div className=" flex flex-wrap items-center justify-start gap-2">
    {/* <div className={`grid gap-2 grid-cols-2 grid-rows-[${data.length / 2}] md:gap-4 lg:gap-8  md:mt-8 md:grid-cols-3`} >*/}
      {data?.map((product) => {
        return (
          <div key={product._id} className="item">
            <ProductWrapper
              product={product}
              favAndCart={favAndCart}
              setFavAndCart={setFavAndCart}
            // src={src}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="">
      {toShow}
    </div>
  );
};

export default ProductList;
