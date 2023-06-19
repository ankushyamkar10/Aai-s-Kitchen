import React, { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductWrapper from "./ProductWrapper";
import {getFavAndCart} from '../Helpers/FavAndCart'
import images from "../Helpers/images";

const ProductList = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const productsData = JSON.parse(localStorage.getItem('products'))
  const [favAndCart,setFavAndCart] = useState()
  
  useEffect(() => {
    if (!user) 
      navigate("/login");
    
      getFavAndCart().then(res =>setFavAndCart(res));
  },[setFavAndCart]);


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
  if(!favAndCart)
    return <div>loading...</div>
  
  const toShow = data?.map((product) => {
    const src = images.filter((item)=>item.includes(product.name))
    if(product.name === 'Vada Pav')
    return (
      <div key={product._id}>
        <ProductWrapper
          product={product}
          favAndCart={favAndCart}
          setFavAndCart={setFavAndCart}
          src={src}
        />
      </div>
    );
  });


  return (
    <>
      {toShow}
      <Link to="/cart">
      <button className="ml-4 mt-4 border border-black py-2 px-4">
        Cart
      </button>
      </Link>
    </>
  );
};

export default ProductList;
