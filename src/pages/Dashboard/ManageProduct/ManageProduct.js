import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useProducts from '../../../hooks/useProducts/useProducts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Component/SectionTitle';
import { Link } from 'react-router-dom';

const ManageProduct = () => {
    const [products, , refetch] = useProducts();
    const [axiosSecure] = useAxiosSecure();

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, delete ${item?.name}!`
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/products/${item?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                `Your ${item?.name} has been deleted.`,
                                'success'
                            )
                        }

                    })
            }
        })
    }

    return (
        <div className='w-full mx-10'>
            <SectionTitle heading='Manage All Items' subHeading='edit and delete product'></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> Index</th>
                            <th>Product </th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product?.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className='text-center'>${product?.price}</td>
                                <td>
                                    <Link to={`/dashboard/update/${product?._id}`}>
                                        <button className="btn btn-Accent btn-sm">update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(product)} className="btn btn-ghost btn-sm bg-red-600 text-white"><FaTrashAlt></FaTrashAlt> </button>
                                </td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageProduct;