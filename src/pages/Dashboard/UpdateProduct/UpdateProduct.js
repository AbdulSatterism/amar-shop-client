import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SectionTitle from '../../../Component/SectionTitle';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const UpdateProduct = () => {
    const product = useLoaderData();
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const imageHostingToken = process.env.REACT_APP_image_token;
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`

    const handleUpdate = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(imageHostingURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageRes => {
                if (imageRes.success) {
                    const imgURL = imageRes.data.display_url;
                    const { name, quantity, price, description } = data;
                    const updateProduct = { name, image: imgURL, price: parseFloat(price), quantity: parseInt(quantity), description }

                    axiosSecure.put(`/update/${product?._id}`, updateProduct)
                        .then(data => {
                            reset();
                            if (data.data.modifiedCount > 0) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'product updated successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            navigate('/dashboard/manage-product');
                        })
                }
            })
    };


    return (
        <div className='w-full px-10 '>

            <SectionTitle subHeading="What's new" heading="Update a Product"></SectionTitle>
            <h1>{product?.name}</h1>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="form-control w-full mb-4 ">
                    <label className="label">
                        <span className="label-text font-semibold">Product Name* </span>
                    </label>
                    <input type="text"
                        defaultValue={product?.name}
                        {...register("name", { required: true })}
                        className="input input-bordered w-full  " />

                </div>

                <div className='flex my-4'>

                    <div className="form-control w-full ml-4 ">
                        <label className="label">
                            <span className="label-text font-semibold">quantity* </span>
                        </label>
                        <input type="number"
                            defaultValue={product?.quantity}
                            {...register("quantity", { required: true })}
                            className="input input-bordered w-full  " />

                    </div>
                    <div className="form-control w-full ml-4 ">
                        <label className="label">
                            <span className="label-text font-semibold">Price* </span>
                        </label>
                        <input type="number"
                            defaultValue={product?.price}
                            {...register("price", { required: true })}
                            className="input input-bordered w-full  " />

                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Description*</span>
                    </label>
                    <textarea
                        defaultValue={product?.description}
                        {...register("description")}
                        className="textarea textarea-bordered h-24" ></textarea>
                </div>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Product Image*</span>
                    </label>
                    <input type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered w-full  " />

                </div>
                <input className='btn btn-sm mt-4 ' type="submit" value="Update Product" />
            </form>

        </div>
    );
};

export default UpdateProduct;