import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem('user'))

const getOrder = async (session_id) => {
  
  const response = await axios.post(
    "http://localhost:3001/api/stripe/success",
    { session_id }
  );
  if(response.data.session.status === 'complete'){

    const invoice = response.data.invoice; 
    const orderData = invoice.lines.data;
    const purchasedItems = []

    orderData.forEach(item => {
      const obj = {
        name:item.description,
        price: item.price.unit_amount / 100,
        quantity:item.quantity,
      }
      purchasedItems.push(obj);
    });
    
    const result = await axios.post("http://localhost:3001/api/users/purchased",{
      userId:user.id,
      purchasedItems,
      orderId:invoice.id,
    })

    if(result.data)
      return {
        invoice,
      }
    
  }
};

const Success = () => {
  
  const [invoice,setInvoice] = useState();

  useEffect(() => {
    getOrder(JSON.parse(localStorage.getItem("orderId"))).then(res=>setInvoice(res.invoice));
  }, [setInvoice]);

  return <div>success 
    <h1>Download your invoice</h1>
    {invoice ? <button onClick={()=>window.location = invoice.hosted_invoice_url} className="text-blue-700 underline">{invoice.id}</button> : <div>loading ... </div>}
    </div>;
};

export default Success;
