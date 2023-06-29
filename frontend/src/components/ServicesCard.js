import React from 'react'



const ServicesCard = ({ service }) => {
    return (
            <div className="w-[45vw] h-[17rem] max-h-[17.5rem] bg-white flex flex-col items-center border-2 border-[#e3e3e3] shadow-xl p-4 rounded hover:w-[11.5rem] hover:h-[17.5rem]">
                <h5 className="text-center text-xl font-semibold my-2 ">{service?.title}</h5>
                <div className='my-2'>{service?.icons}</div>
                <p className="text-gray-700 text-md text-center my-2">
                    {service?.desc}
                </p>
            </div>
    )
}

export default ServicesCard