import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCar = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        image: null,
        description: '',
        price: '',
        countInStock: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('countInStock', formData.countInStock);
            formDataToSend.append('imageUrl', formData.image);

            await axios.post('http://localhost:8080/api/products/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product added successfully');


            setFormData({
                name: '',
                imageUrl: '',
                description: '',
                price: '',
                countInStock: ''
            });
            // Redirect to shop page
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Count in Stock:</label>
                    <input type="text" name="countInStock" value={formData.countInStock} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddCar;
