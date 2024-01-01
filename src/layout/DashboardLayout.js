import React from 'react';
import { FaBars, FaHome, FaShoppingCart, FaUsers, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart/useCart';
import useAdmin from '../hooks/useAdmin/useAdmin';
import { GiClothes } from "react-icons/gi";

const DashboardLayout = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-center">
                <label htmlFor="my-drawer-2" className="btn btn-active btn-ghost drawer-button lg:hidden"><FaBars></FaBars> </label>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin ? <>

                            <li className='text-whit'><NavLink to='/dashboard/add-product' ><GiClothes></GiClothes> Add Product</NavLink></li>
                            <li className='text-whit'><NavLink to='/dashboard/manageitems' ><FaWallet></FaWallet> Manage Item</NavLink></li>
                            <li className=' '><NavLink to='/dashboard/all-users' ><FaUsers></FaUsers> All Users</NavLink></li>
                        </>
                            :
                            <>

                                <li className=' '>
                                    <NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart> My Cart
                                        <span className="badge badge-secondary">+{cart?.length || 0}</span>
                                    </NavLink>

                                </li>
                            </>
                    }


                    <div className="divider"></div>

                    <li className=' '><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;