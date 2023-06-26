import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import images from '../Helpers/images';

const CarouselComponent = () => {
  return (
    <Carousel autoPlay={!true} showThumbs={false} showStatus={false} interval={3000} infiniteLoop={true}>
                <div>
                    <img src={images[4]} className='h-[50vh] w-full'/>
                </div>
                <div>
                    <img src={images[7]} className='h-[50vh] w-full'/>
                </div>
                <div>
                    <img src={images[2]} className='h-[50vh] w-full'/>
                </div>
            </Carousel>
  )
}

export default CarouselComponent
