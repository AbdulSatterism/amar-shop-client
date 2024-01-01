import React from 'react';
import SectionTitle from '../../../Component/SectionTitle';
import Product from './Product';
import useProducts from '../../../hooks/useProducts/useProducts';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DemoProducts = () => {
    const [products] = useProducts()
    const demoProduct = products.slice(0, 3);

    return (
        <div className='my-8 mx-auto'>
            <SectionTitle subHeading={"Explore yourself smartly"} heading={"Our Products"}> </SectionTitle>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                {
                    demoProduct.map(product => <Product
                        key={product._id}
                        product={product}

                    >

                    </Product>)
                }

            </div>
            <div className='flex justify-center my-8'>
                {
                    products.length > 3 &&
                    <Link to='/all-product'>
                        <button className="btn text-xl font-semibold bg-emerald-500 px-8 ">All Products <FaArrowRight></FaArrowRight></button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default DemoProducts;

