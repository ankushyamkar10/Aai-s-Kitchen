import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const getOrders = async (user) => {
  const response = await axios.get('https://aais-kitchen.onrender.com/api/order', { headers: { Authorization: `Bearer ${user.token}` } })

  if (response.data) {
    return response.data
  }

}

const Orders = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const products = JSON.parse(localStorage.getItem('products'))

  const [orders, setOrders] = useState()

  useEffect(() => {
    getOrders(user).then((result) => { setOrders(result) }).catch((e) => toast.error(e));
  }, [])

  if (!orders)
    return <div className="relative">
    <CircleLoader color="black" size={25} loading={true} className="absolute top-[50vh] left-[50vw]" />
  </div>
    
  const toShow = orders.map((order) => {
    const { _id, orderedItems, invoice, createdAt } = order;
    let totalPrice = 0

    const date = createdAt.slice(0, 10);
    const finalDate = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
    const time = createdAt.substring(11,16)

    const items = products.filter(product => orderedItems.some(order => order.name === product.name))
    
    return <div className='my-4'>

      <div className='text-md'><span className=' font-semibold mr-2'>OrderId :</span>{_id}</div>
      <div className='mb-2 mt-1'><span className='font-semibold mr-2'>Invoice Url :</span><Link to={invoice}><span className='text-blue-700'>{finalDate+'_'+user.name+'_'+time}</span></Link></div>

      {items.length > 0 && 
      <div className=""> 
        <table className='table-auto border-collapse border border-black mt-1'>

          <thead>
            <tr className='bg-yellow-500 border-b border-black'>
              <th className='py-1 px-4'>Prdouct</th>
              <th className='py-1 px-4'>Quantity</th>
              <th className='py-1 px-4'>Price</th>
              <th className='py-1 px-4'>Total </th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {items.map(({ name, price }, i) => {
              const quantity = orderedItems[i].quantity;
              totalPrice += quantity * price
              return (
                <tr>
                  <td className='py-2'>{name}</td>
                  <td className='py-2'>{quantity}</td>
                  <td className='py-2'>{price}</td>
                  <td className='py-2'>{price * quantity}</td>
                </tr>
              )
            })}
            <tr className='border-t border-gray-500'>
              <td>Total Price</td>
              <td></td>
              <td></td>
              <td className='py-2'>₹ {totalPrice}</td></tr>
          </tbody>

        </table>
      </div>}

    </div>
  })

  return (
    <div>
      <Navbar />
      <div className='mt-[4.5rem] ml-4'>
        <div className="mb-2 text-xl font-semibold tracking-wider text-yellow-500">My Orders</div>
        <div className='flex flex-col gap-2'>{toShow}</div>
      </div>
    </div>
  )
}

export default Orders
