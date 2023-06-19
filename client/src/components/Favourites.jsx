import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductWrapper from "./ProductWrapper";
import { getFavAndCart } from "../Helpers/FavAndCart";
import images from "../Helpers/images";

const Favourites = () => {

  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'))
  const productsData = JSON.parse(localStorage.getItem('products'))
  
  const [favAndCart,setFavAndCart] = useState()
  
  useEffect(() => {
    if (!user) 
      navigate("/login");
    
      getFavAndCart().then(res =>setFavAndCart(res));
  },[setFavAndCart]);

  if(!favAndCart)
    return <div>Laoding...</div>
  
  const favList = favAndCart.favList;
  const data = productsData.filter((product) =>
    favList?.some((cart) => cart.id === product._id)
  );
  
  

  const toShow = data?.map((product) => {
    const src = images.filter((item)=>item.includes(product.name))
    return (
      <div key={product._id} >
        <ProductWrapper product={product} favAndCart={favAndCart} setFavAndCart={setFavAndCart} src = {src}/>
      </div>
    );
  });

  return (
    <div>
      hii
      {toShow}
      <Link to="/product">
        <button>Products</button>
      </Link>
    </div>
  );
};

export default Favourites;
