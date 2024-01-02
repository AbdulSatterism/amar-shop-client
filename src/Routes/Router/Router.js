import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home/Home";
import MainLayout from "../../layout/MainLayout";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import AllProduct from "../../pages/Home/Products/AllProduct";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../layout/DashboardLayout";
import AllUser from "../../pages/Dashboard/AllUser/AllUser";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import ManageProduct from "../../pages/Dashboard/ManageProduct/ManageProduct";
import UpdateProduct from "../../pages/Dashboard/UpdateProduct/UpdateProduct";
import DashboardHome from "../../pages/Dashboard/DashboardHome/DashboardHome";
import MyCart from "../../pages/Dashboard/MyCart/MyCart";
import Payment from "../../pages/Dashboard/Payment/Payment";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-product',
                element: <AllProduct></AllProduct>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            //user path
            {
                path: 'my-cart',
                element: <MyCart></MyCart>
            },
            //payment not implemnt yet!!
            {
                path: 'payment',
                element: <Payment></Payment>
            },


            //admin path
            {

                path: "product-value",
                element: <AdminRoute><DashboardHome></DashboardHome></AdminRoute>
            },
            {

                path: "all-users",
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {

                path: "add-product",
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {

                path: "manage-product",
                element: <AdminRoute><ManageProduct></ManageProduct></AdminRoute>
            },
            {

                path: "update/:id",
                element: <UpdateProduct></UpdateProduct>,
                loader: ({ params }) => fetch(`https://amar-shop-server.onrender.com/update/${params.id}`)
            },
        ]
    }
]);

export default router;