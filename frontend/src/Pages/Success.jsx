import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { getAllProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

const setProducts = async () => {
  const response = await axios.get('http://localhost:3001/api/product');

  if (response.data) {
    localStorage.setItem('products', JSON.stringify(response.data))
  }
}

const getOrder = async (session_id) => {
  localStorage.removeItem('orderId')
  const response = await axios.post(
    "http://localhost:3001/api/stripe/success",
    { session_id }
  );

  if (response.data.session.payment_status === "paid") {
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
      "http://localhost:3001/api/order/",
      {
        userId: user.id,
        orderedItems: purchasedItems,
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
      localStorage.setItem('products', JSON.stringify(products))

      const result = await axios.patch("http://localhost:3001/api/users/cart", {
        userId: user.id,
        productId: ''
      })

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

    if (!localStorage.getItem('orderId'))
      navigate('/');

    getOrder(JSON.parse(localStorage.getItem("orderId"))).then((res) =>
      setInvoice(res)
    );
  }, [setInvoice]);

  !invoice && setProducts();

  return (
    <div>
      success
      <h1>Download your invoice</h1>
      {invoice ? (
        <button
          onClick={() => (window.location = invoice.hosted_invoice_url)}
          className="text-blue-700 underline"
        >
          {invoice.id}
        </button>
      ) : (
        <div className="mt-48 ml-44">
          <CircleLoader color="black" size={25} loading={true} />
        </div>
      )}
    </div>
  );
};

export default Success;

