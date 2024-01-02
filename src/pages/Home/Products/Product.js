import React, { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../hooks/useCart/useCart';

const Product = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [, refetch] = useCart()
    const { name, price, quantity, image, _id } = product;
    const navigate = useNavigate();
    const location = useLocation()

    const handleAddToCart = product => {

        if (user && user?.email) {
            const cartItem = {
                itemId: _id, name, image, price, email: user?.email
            };
            fetch('https://amar-shop-server.onrender.com/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch(); //refetch item from the useCart and update in cart
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'product added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the product',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Available: {quantity}</p>
                <p className='font-bold text-orange-400'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Buy Now <FaShoppingCart></FaShoppingCart></button>
                </div>
            </div>
        </div>
    );
};

export default Product;