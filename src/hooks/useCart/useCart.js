import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../useAxiosSecure';

const useCart = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        // queryFn: async () => {
        //     const res = await fetch(`https://amar-shop-server.onrender.com/carts?email=${user?.email}`)
        //     return res.json();
        // }
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            // console.log(res)
            return res.data;
        }
    })
    return [cart, refetch]
};

export default useCart;