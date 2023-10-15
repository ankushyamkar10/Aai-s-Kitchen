import axios from "axios";

const url = "https://aais-kitchen-backend.onrender.com/api/users/";
const productsUrl = "https://aais-kitchen-backend.onrender.com/api/product/";

// const url = 'http://localhost:3001/api/users/'
// const productsUrl = 'http://localhost:3001/api/product/'

const register = async (userData) => {
  const response = await axios.post(url + "register", userData);
  const result = await axios.get(productsUrl);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  if (result.data) {
    localStorage.setItem("products", JSON.stringify(result.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(url + "login", userData);
  const result = await axios.get(productsUrl);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  if (result.data) {
    localStorage.setItem("products", JSON.stringify(result.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("products");
};

const getMe = async (user) => {
  const response = await axios.get(url + "me", {
    headers: { Authorization: `Bearer ${user.token}` },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = { register, login, logout, getMe };

export default authService;
