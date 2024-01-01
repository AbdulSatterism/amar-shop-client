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
            //admin path
            {

                path: "all-users",
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {

                path: "add-product",
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            }
        ]
    }
]);

export default router;