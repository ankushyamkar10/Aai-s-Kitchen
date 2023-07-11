import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { toast } from 'react-toastify'
import { FaEnvelope, FaShoppingCart, FaStar, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    let ratingRef = useRef()
    let reviewRef = useRef()

    const bggray3 = 'bg-yellow-500'
    const brgray2 = 'border-gray-200'
    const brgray3 = 'border-gray-500'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/api/review', {
            rating: Number(ratingRef.current.value),
            review: reviewRef.current.value
        },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

        if (response.data) {
            toast.success('Review posted')
        }
        else {
            toast.error('Error posting review')
        }
        ratingRef.current.value = ''
        reviewRef.current.value = ''
    }


    return (
        <div>
            <Navbar />
            <div className="mt-[4rem] mx-4 relative md:mx-auto md:w-[60vw]">
                <div className="text-yellow-500 text-2xl font-semibold text-center mt-20">We Appreciate Your Review</div>
                <div className="text-xs text-center">Your review will help us to improve our quality products and customer services.</div>
                <form className={`mt-4 mx-2 flex flex-col px-4 border ${brgray2} py-4 bg-gray-100 rounded`} onSubmit={(e) => handleSubmit(e)}>

                    <div className='flex items-center my-2'>
                        <label htmlFor="" className={`${bggray3} border ${brgray3} px-6 py-3`}>
                            <FaUser size={20} />
                        </label>
                        <input type="text" value={user.name} className={`text-sm py-3 px-4 border ${brgray3} border-l-0  outline-none w-full`} readOnly={true} />
                    </div>

                    <div className='flex items-center my-2'>
                        <label htmlFor="" className={`py-3 ${bggray3} border ${brgray3} px-6`}>
                            <FaEnvelope size={20} />
                        </label>
                        <input type="text" value={user.email} className={`text-sm border ${brgray3} border-l-0 py-3 px-4 outline-none w-full`} readOnly={true} />
                    </div>

                    <div className='flex items-center my-2'>
                        <label htmlFor="" className={`px-6 py-3 ${bggray3} border ${brgray3}`}>
                            <FaStar size={20} />
                        </label>
                        <input type="number" ref={ratingRef} className={`text-sm border ${brgray3} border-l-0 py-3 px-4 outline-none w-full`} required min='0' max='5' step={0.1} />
                    </div>

                    <div className='my-2'>
                        <textarea cols="36" rows="5" ref={reviewRef} placeholder='Write a review here' className={`w-full text-sm border ${brgray3} py-2 px-3 outline-none`} required></textarea>
                    </div>
                    <button className=' py-2 px-4 mb-2 text-md font-semibold tracking-wider bg-yellow-500 text-white rounded'>Submit</button>
                </form>

                <div className='bg-yellow-500 p-4 fixed bottom-4 right-4 rounded-full w-fit' onClick={() => navigate('/cart')}>
                    <FaShoppingCart size={30} className='pr-[1px] text-white' />
                </div>
            </div>
        </div>
    )
}

export default Review
