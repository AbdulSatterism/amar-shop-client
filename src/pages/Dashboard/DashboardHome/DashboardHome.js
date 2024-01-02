import React from 'react';
import useProducts from '../../../hooks/useProducts/useProducts';
import { FaMoneyBillWave } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

const DashboardHome = () => {
    const [products] = useProducts();
    const totalPrice = products.reduce((sum, product) => product?.price + sum, 0).toFixed(2)
    const totalProduct = products.reduce((sum, product) => product?.quantity + sum, 0)

    return (
        <div className="stats shadow mx-auto">

            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><FaMoneyBillWave /></svg>
                </div>
                <div className="stat-title">Total Value</div>
                <div className="stat-value text-primary">$ {totalPrice}</div>
                <div className="stat-desc">From All Product</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><GiClothes /></svg>
                </div>
                <div className="stat-title">Total Product</div>
                <div className="stat-value text-primary"> {totalProduct}</div>
                <div className="stat-desc">all product </div>
            </div>

        </div>
    );
};

export default DashboardHome;