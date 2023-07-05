import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import images from '../Helpers/images';

const CarouselComponent = () => {
    return (
        <Carousel autoPlay={true} showThumbs={false} showStatus={false} interval={2000} infiniteLoop={true} className='relative border border-gray-100' >
            <div className='w-[82.5%] mx-auto'>
                <img src={images[2]} className='h-[78vw] w-full rounded-full' />
            </div>
            <div className='w-[82.5%] mx-auto'>
                <img src={images[17]} alt='carousal' className='h-[78vw] w-full rounded-full' />
            </div>
            <div className='w-[82.5%] mx-auto'>
                <img src={images[16]} alt='carousal' className='h-[78vw] w-full rounded-full' />
            </div>
            <div className='w-[82.5%] mx-auto'>
                <img src={images[1]} alt='carousal' className='h-[78vw] w-full rounded-full' />
            </div>
            <div className='w-[82.5%] mx-auto'>
                <img src={images[15]} alt='carousal' className='h-[78vw] w-full rounded-full' />
            </div>
        </Carousel>
    )
}

export default CarouselComponent

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// const responsive = {
//     superLargeDesktop: {
//         // the naming can be any, depends on you.
//         breakpoint: { max: 4000, min: 3000 },
//         items: 5
//     },
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 3
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 2
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1
//     }
// };

// const CarouselComponent = () => {
//     return (
//         <Carousel responsive={responsive} autoPlay={true}>
//             <div><img src={images[7]} className='h-[42.5vh] w-full'/></div>
//             <div><img src={images[17]} className='h-[42.5vh] w-full'/></div>
//             <div><img src={images[15]} className='h-[42.5vh] w-full'/></div>
//             <div><img src={images[20]} className='h-[42.5vh] w-full'/></div>
//         </Carousel>
//     )
// }

// export default CarouselComponent
// /**/