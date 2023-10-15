import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { localUrl, deployUrl } from "../Helpers/Urls";

const getOrders = async (user) => {
  const response = await axios.get(`${deployUrl}/api/order`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

  if (response.data) {
    return response.data;
  }
};

const handleClick = async (items, email) => {
  const res = await axios.post(`${deployUrl}/api/stripe/pay`, {
    items,
    email,
  });

  if (!res) {
    alert("An error occured");
  } else if (res.data) {
    localStorage.setItem("orderId", JSON.stringify(res.data.session.id));
    window.location = res.data.url;
  }
};

const Orders = () => {
  const products = JSON.parse(localStorage.getItem("products"));
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState();
  const arr = [];

  useEffect(() => {
    getOrders(user)
      .then((result) => {
        setOrders(result);
      })
      .catch((e) => toast.error(e));
  }, []);

  let toShow = null;

  if (!orders)
    toShow = (
      <div className="relative">
        <CircleLoader
          color="black"
          size={25}
          loading={true}
          className="absolute top-[50vh] left-[50vw]"
        />
      </div>
    );
  else {
    toShow = (
      <div className="md:flex md:flex-wrap md:gap-12 ">
        {orders.length > 0 ? (
          orders.map((order) => {
            const { _id, orderedItems, invoice, createdAt } = order;
            let totalPrice = 0;

            const date = new Date(createdAt);
            const finalDate = date.toLocaleDateString();
            let time = date.toLocaleTimeString();
            time = time.replace(" ", "_");
            const items = products.filter((product) =>
              orderedItems.some((order) => order.name === product.name)
            );

            return (
              <div className="my-4" key={_id}>
                <div className="text-md">
                  <span className=" font-semibold mr-2">OrderId :</span>
                  {_id}
                </div>
                <div className=" mt-1">
                  <span className="font-semibold mr-2">Invoice Url :</span>
                  <Link to={invoice}>
                    <span className="text-blue-700">
                      {finalDate + "_" + user.name + "_" + time}
                    </span>
                  </Link>
                </div>
                <div className="mb-2">
                  <span className="font-semibold"></span>Status : Delivered
                </div>

                {items.length > 0 && (
                  <div className="">
                    <table className="table-auto border-collapse border border-black mt-1">
                      <thead>
                        <tr className="bg-yellow-500 border-b border-black ">
                          <th className="py-1 px-4 font-medium">Prdouct</th>
                          <th className="py-1 px-4 font-medium">Quantity</th>
                          <th className="py-1 px-4 font-medium">Price</th>
                          <th className="py-1 px-4 font-medium">Total </th>
                        </tr>
                      </thead>

                      <tbody className="text-center">
                        {items.map(({ name, price }, i) => {
                          const quantity = orderedItems[i].quantity;
                          totalPrice += quantity * price;
                          const obj = {
                            quantity: quantity,
                            price: price,
                            name: name,
                          };
                          arr.push(obj);
                          return (
                            <tr key={i}>
                              <td className="py-2">{name}</td>
                              <td className="py-2">{quantity}</td>
                              <td className="py-2">{price}</td>
                              <td className="py-2">{price * quantity}</td>
                            </tr>
                          );
                        })}
                        <tr className="border-t border-gray-500">
                          <td>Total Price</td>
                          <td></td>
                          <td></td>
                          <td className="py-2">₹ {totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                <button
                  className="mt-4 py-1 px-2 bg-yellow-500 text-white "
                  onClick={() => {
                    handleClick(orderedItems, user.email);
                  }}
                >
                  Reorder
                </button>
              </div>
            );
          })
        ) : (
          <div className="m-5 flex flex-col gap-3">
            <div> No Orders Yet!</div>
            <div className="px-2 py-1 bg-yellow-500 text-center text-white rounded text-sm md:text-md cursor-pointer">
              <Link to="/product">Try Out!</Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-[5.5rem] ml-4">
        <div className=" text-xl font-semibold tracking-wider text-yellow-500">
          My Orders
        </div>
        <div className="flex flex-col gap-2">{toShow}</div>
      </div>
    </div>
  );
};

export default Orders;
