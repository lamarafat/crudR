import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';

export default function Form() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const registerUser = async (user) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BURL}/users`, user);
            if (response.status === 201) {
                navigate('/user');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit(registerUser)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            {...register('userName', { required: 'Name is required' })}
                            type="text"
                            className="form-control"
                            id='name'
                            placeholder=" "
                        />
                        {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            type="email"
                            className="form-control"
                            id='email'
                            placeholder=" "
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                            type="password"
                            className="form-control"
                            id="pass"
                            placeholder=" "
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            {...register('phone', { required: 'Phone number is required', pattern: { value: /^\d{10}$/, message: 'Invalid phone number' } })}
                            type="tel"
                            className="form-control"
                            id='phone'
                            placeholder=" "
                        />
                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <DevTool control={control} />
            </div>
        </>
    );
}