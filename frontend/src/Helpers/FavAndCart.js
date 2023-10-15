import axios from "axios";
import { localUrl, deployUrl } from "../Helpers/Urls";

export const getFavAndCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    const response = await axios.post(`${deployUrl}/api/users/cart`, {
      userId: user._id,
    });

    const result = await axios.post(`${deployUrl}/api/users/favourites`, {
      userId: user._id,
    });
    return {
      favList: result.data,
      cartList: response.data,
    };
  }
};
