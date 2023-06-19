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
import Stripe from "./Pages/Stripe";
import axios from "axios";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";


function App() {

  const handleToken = async (totalAmount,token) => {
    try {
      const response = await axios.post('http://localhost:3001/api/stripe/pay',{
        token : token.id,
        ammount:totalAmount
      })

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const tokenHandler = (token) => {
    handleToken(100, token)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/product" element={<Product  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart  />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/checkOut"
            element={<CheckOut  />}
          />
          {/* <Route
            path="/stripe"
            element={<Stripe stripeKey="pk_test_51NJH8zSBslZX8EUytHsY2k7Pjzd7XqqHQsyTAj5fR67zOnYd5FPLtxxT72fC7ldE7GHVqyFk77uRex978jSm3L7A00KH6TAzIp" token={tokenHandler} />}
          /> */}
          <Route path='/success' element={<Success />} />
          <Route path='/failure' element={<Failure />} />
          <Route path="/payment" element={<Stripe />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

/*import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NJH8zSBslZX8EUytHsY2k7Pjzd7XqqHQsyTAj5fR67zOnYd5FPLtxxT72fC7ldE7GHVqyFk77uRex978jSm3L7A00KH6TAzIp');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};*/
