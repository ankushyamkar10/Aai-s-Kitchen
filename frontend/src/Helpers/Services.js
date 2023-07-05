import { MdVerified, MdLocalPhone, MdDeliveryDining, MdHealthAndSafety} from 'react-icons/md'


const services = [
    {
      title: "Organic Food",
      icons: <MdVerified className='text-yellow-500 h-10 w-10' />,
      desc: "Prepares foods that have been grown using organic products by our farmers"
    },
    {
      title: "Fast Delivery",
      icons: <MdDeliveryDining className='text-yellow-500 h-10 w-10' />,
      desc: " Products are delivered in maximum 45 mins & minimum 15 mins in Mumbai "
    },
    {
      title: "Well Hygienic",
      icons: <MdHealthAndSafety className='text-yellow-500 h-10 w-10' />,
      desc: " Kitchens are kept clean and hygienic and monthly sanitization are carried out "
    },
    {
      title: "Contact us",
      icons: <MdLocalPhone className='text-yellow-500 h-10 w-10' />,
      desc: "For any queries reach us at +91 9321892495 / yamkar. ab10@gmail.com"
    }]

export default services