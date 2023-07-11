import React from 'react'



const ServicesCard = ({ service }) => {
    return (
            <div className="w-[45vw] h-[15rem] bg-white flex flex-col items-center border border-[#e3e3e3] shadow-xl p-4 rounded hover:w-[47vw] hover:h-[15.5rem] md:w-[30vw] md:hover:w-[31vw] lg:w-[15vw] lg:hover:w-[16vw]">
                <h5 className="text-center text-lg font-semibold my-2 ">{service?.title}</h5>
                <div className='my-2'>{service?.icons}</div>
                <p className="text-gray-700 text-sm text-center my-2">
                    {service?.desc}
                </p>
            </div>
    )
}

export default ServicesCard