import React from 'react';
import SectionTitle from '../../../Component/SectionTitle';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddProduct = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();

    const imageHostingToken = process.env.REACT_APP_image_token;
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`

    const onSubmit = data => {
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
                    const newProduct = { name, image: imgURL, price: parseFloat(price), quantity: parseInt(quantity), description }
                    console.log('added new product demo', newProduct)
                    axiosSecure.post("/products", newProduct)
                        .then(data => {
                            reset();
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'success',
                                    title: 'New item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };



    return (
        <div className='w-full px-10 '>

            <SectionTitle subHeading="What's new" heading="Add a Product"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4 ">
                    <label className="label">
                        <span className="label-text font-semibold">Product Name* </span>
                    </label>
                    <input type="text" placeholder="Product Name"
                        {...register("name", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full  " />

                </div>

                <div className='flex my-4'>

                    <div className="form-control w-full ml-4 ">
                        <label className="label">
                            <span className="label-text font-semibold">quantity* </span>
                        </label>
                        <input type="number" placeholder="Type here"
                            {...register("quantity", { required: true })}
                            className="input input-bordered w-full  " />

                    </div>
                    <div className="form-control w-full ml-4 ">
                        <label className="label">
                            <span className="label-text font-semibold">Price* </span>
                        </label>
                        <input type="number" placeholder="Type here"
                            {...register("price", { required: true })}
                            className="input input-bordered w-full  " />

                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Description*</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered h-24" placeholder="recipe details"></textarea>
                </div>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Product Image*</span>
                    </label>
                    <input type="file"
                        {...register("image", { required: true })}
                        className="file-input file-input-bordered w-full  " />

                </div>
                <input className='btn btn-sm mt-4 ' type="submit" value="Add Product" />
            </form>

        </div>
    );
};

export default AddProduct;