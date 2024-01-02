import React, { useContext } from 'react';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart/useCart';
import { AuthContext } from '../../../Provider/AuthProvider';

const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(() => { })
    }

    const navItems = <>
        <li><Link className='text-xl  ' to='/'>Home</Link></li>
        <li><Link className='text-xl  ' to='/all-product'>All Product</Link></li>
        <li><Link className='text-xl  ' to='/dashboard'>Dashboard</Link></li>
        <li>
            <Link to='/dashboard/my-cart'>
                <button className="btn btn-sm">
                    <FaShoppingCart></FaShoppingCart>
                    <div className="badge badge-secondary">+{cart?.length || 0}</div>
                </button>
            </Link>
        </li>

        {
            user ? <>
                <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
            </> : <>
                <li><Link className='text-xl  ' to='/login'>Login</Link></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-slate-300 top-0 sticky z-10 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">Amar Shop</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn">{user ? user.displayName : <FaUserAlt></FaUserAlt>}</Link>
            </div>
        </div>
    );
};

export default Navbar;