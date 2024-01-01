import React from 'react';
import useProducts from '../../../hooks/useProducts/useProducts';
import Product from './Product';

const AllProduct = () => {
    const [products] = useProducts();
    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}

                    >

                    </Product>)
                }

            </div>
        </div>
    );
};

export default AllProduct;