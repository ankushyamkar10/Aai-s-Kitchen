import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { getAllProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import foodDelivery from "../assets/FoodDelivery.gif";
import { localUrl, deployUrl } from "../Helpers/Urls";

const user = JSON.parse(localStorage.getItem("user"));

const setProducts = async () => {
  const response = await axios.get(`${deployUrl}/api/product`);

  if (response.data) {
    localStorage.setItem("products", JSON.stringify(response.data));
  }
};

const getOrder = async (session_id) => {
  localStorage.removeItem("orderId");
  const response = await axios.post(`${deployUrl}/api/stripe/success`, {
    session_id,
  });

  if (response?.data?.session?.payment_status === "paid") {
    const invoice = response.data?.invoice;
    const orderData = invoice.lines.data;
    const purchasedItems = [];

    orderData.forEach((item) => {
      const obj = {
        name: item.description,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
      };

      purchasedItems.push(obj);
    });

    const purchased = await axios.post(
      `${deployUrl}/api/order/`,
      {
        userId: user._id,
        orderedItems: purchasedItems,
        invoice: invoice.hosted_invoice_url,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (purchased.data) {
      toast.success("Order Placed!");
      const products = await getAllProducts();
      localStorage.setItem("products", JSON.stringify(products));

      const result = await axios.patch("${deployUrl}/api/users/cart", {
        userId: user._id,
        productId: "",
      });
    } else {
      toast.info("Order not placed . your money will be refunded");
    }
    return invoice;
  } else {
    console.log("error");
  }
};

const Success = () => {
  const [invoice, setInvoice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("orderId")) navigate("/");

    getOrder(JSON.parse(localStorage.getItem("orderId"))).then((res) =>
      setInvoice(res)
    );
  }, [setInvoice]);

  !invoice && setProducts();

  return (
    <div>
      <Navbar />
      <div className="ml-2 md:flex md:items-center md:justify-center md:flex-col">
        <div className="flex items-center mt-20 text-sm md:text-md">
          <span className="text-yellow-500 text-2xl md:text-3xl font-semibold">
            Success
          </span>
          , your order is placed!{" "}
          <MdVerified color="green" size={25} className="ml-2" />
        </div>
        {invoice ? (
          <div className="mt-4 text-sm md:text-md md:text-center">
            <div>Download order's invoice here</div>
            <button
              onClick={() => (window.location = invoice.hosted_invoice_url)}
              className="text-blue-700 underline"
            >
              {invoice.id}
              nkesdm,iikemld,
            </button>

            <div className="flex items-center gap-4 mt-8 md:justify-center">
              <div className="px-2 py-1 bg-yellow-500 text-white rounded text-sm md:text-md cursor-pointer">
                <Link to="/product"> Order More</Link>
              </div>
              <div className="px-2 py-1 bg-yellow-500 text-white rounded text-sm md:text-md cursor-pointer">
                <Link to="/orders"> My Orders</Link>
              </div>
            </div>

            <div className="mx-auto mt-8">
              <img src={foodDelivery} alt="" className="w-72 h-72 mx-auto" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <CircleLoader
              color="black"
              size={25}
              loading={true}
              className="absolute top-[50vh] left-[50vw]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
