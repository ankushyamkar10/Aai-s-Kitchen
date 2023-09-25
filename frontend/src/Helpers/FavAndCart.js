import axios from "axios";

export const getFavAndCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    const response = await axios.post(
      `https://aais-kitchen-backend.onrender.com/api/users/cart`,
      {
        userId: user._id,
      }
    );

    const result = await axios.post(
      `https://aais-kitchen-backend.onrender.com/api/users/favourites`,
      {
        userId: user._id,
      }
    );
    return {
      favList: result.data,
      cartList: response.data,
    };
  }
};
