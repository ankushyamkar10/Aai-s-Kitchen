// import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import images from '../Helpers/images';

// const CarouselComponent = () => {
//     return (
//         <Carousel autoPlay={true} showThumbs={false} showStatus={false} interval={2000} infiniteLoop={true} className='relative border border-gray-100' >
//             <div className='w-[90%] mx-auto'>
//                 <img src={images[2]} className='h-[78vw] w-full rounded-full' />
//             </div>
//             <div className='w-[90%] mx-auto'>
//                 <img src={images[17]} alt='carousal' className='h-[78vw] w-full rounded-full' />
//             </div>
//             <div className='w-[90%] mx-auto'>
//                 <img src={images[16]} alt='carousal' className='h-[78vw] w-full rounded-full' />
//             </div>
//             <div className='w-[90%] mx-auto'>
//                 <img src={images[1]} alt='carousal' className='h-[78vw] w-full rounded-full' />
//             </div>
//             <div className='w-[90%] mx-auto'>
//                 <img src={images[15]} alt='carousal' className='h-[78vw] w-full rounded-full' />
//             </div>
//         </Carousel>
//     )
// }

// export default CarouselComponent

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 767 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1
    }
};

const CarouselComponent = () => {
    return (
        <Carousel responsive={responsive} autoPlay={true} arrows={false} shouldResetAutoplay={true} rewind={true} rewindWithAnimation={true}>
            <div><img src={images[2]} className='h-72  w-72   mx-auto rounded-full md:w-[35vw] md:h-[35vw] lg:w-[20vw] lg:h-[20vw] '/></div>
            <div><img src={images[17]} className='h-72  w-72  mx-auto rounded-full md:w-[35vw] md:h-[35vw] lg:w-[20vw] lg:h-[20vw]'/></div>
            <div><img src={images[15]} className='h-72  w-72  mx-auto rounded-full md:w-[35vw] md:h-[35vw] lg:w-[20vw] lg:h-[20vw]'/></div>
            <div><img src={images[16]} className='h-72  w-72  mx-auto rounded-full md:w-[35vw] md:h-[35vw] lg:w-[20vw] lg:h-[20vw]'/></div>
            <div><img src={images[1]} className='h-72  w-72  mx-auto rounded-full md:w-[35vw] md:h-[35vw] lg:w-[20vw] lg:h-[20vw]'/></div>
        </Carousel>
    )
}

export default CarouselComponent
// /**/