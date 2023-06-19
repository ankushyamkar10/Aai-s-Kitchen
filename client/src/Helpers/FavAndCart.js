import axios from "axios";

export const getFavAndCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const response = await axios.post(`http://localhost:3001/api/users/cart`, {
    userId: user.id,
  });

  const result = await axios.post(
    `http://localhost:3001/api/users/favourites`,
    {
      userId: user.id,
    }
  );

  return {
    favList: result.data,
    cartList:response.data
  };
};
