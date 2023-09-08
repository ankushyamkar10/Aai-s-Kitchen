import axios from "axios";

export const getFavAndCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const response = await axios.post(`https://aais-kitchen-backend.onrender.com/api/users/cart`, {
      userId: user.id,
    });

    const result = await axios.post(
      `https://aais-kitchen-backend.onrender.com/api/users/favourites`,
      {
        userId: user.id,
      }
    );
    return {
      favList: result.data,
      cartList: response.data,
    };
  }
};
