import React from 'react';
import CarouselSlider from '../Carousel/CarouselSlider';
import DemoProducts from '../Products/DemoProducts';
import Contact from '../Contact/Contact';


const Home = () => {
    return (
        <div>
            <CarouselSlider></CarouselSlider>
            <DemoProducts></DemoProducts>
            <Contact></Contact>
        </div>
    );
};

export default Home;