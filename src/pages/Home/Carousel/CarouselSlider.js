import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from '../../../assets/Images/bannerImages/e-banner1.jpg'
import banner3 from '../../../assets/Images/bannerImages/e-banner3.jpg'
import banner4 from '../../../assets/Images/bannerImages/e-banner4.jpg'
import banner5 from '../../../assets/Images/bannerImages/e-banner5.jpg'

const CarouselSlider = () => {
    return (
        <Carousel showArrows={true} >
            <div className='h-svh'>
                <img src={banner1} alt="" />
                <p className="legend">items 1</p>
            </div>
            <div>
                <img src={banner3} alt="" />
                <p className="legend">items 2</p>
            </div>
            <div>
                <img src={banner4} alt="" />
                <p className="legend">items 3</p>
            </div>
            <div>
                <img src={banner5} alt="" />
                <p className="legend">items 4</p>
            </div>

        </Carousel>
    );
};

export default CarouselSlider;