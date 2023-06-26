import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Favourites from "./components/Favourites";
import CheckOut from "./Pages/CheckOut";
import axios from "axios";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/checkOut"
            element={<CheckOut />}
          />
          <Route path='/success' element={<Success />} />
          <Route path='/failure' element={<Failure />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;