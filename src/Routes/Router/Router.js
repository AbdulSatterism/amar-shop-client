import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home/Home";
import MainLayout from "../../layout/MainLayout";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import AllProduct from "../../pages/Home/Products/AllProduct";


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
    }
]);

export default router;