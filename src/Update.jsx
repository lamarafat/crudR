import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'

export default function Update() {
    const {id} = useParams();
    const {register, handleSubmit, setValue}= useForm();
    const getDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_BURL}/users/${id}`);
        setValue("userName",data.user.userName);
        setValue("email",data.user.email);
        setValue("phone",data.user.phone);
        console.log(data);
    }
    useEffect(()=>{
        getDetails();
    },[])
    const updateUser = async (value)=>{
        const response = await axios.put(`${import.meta.env.VITE_BURL}/users/${id}`,
            {
                userName:value.userName
            }
        );
        if(response.statuse ===200){
            Navigate('/user');
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit()}>
        <div className='form-floating mb-3'>
            <input type='text' className='form-control' {...register('userName')} placeholder='${users.userName} ' />
            <label htmlFor='userName'>User name</label>
            <input type='email' className='form-control' {...register('email')} placeholder='${users.email} ' disabled/>
            <label htmlFor='email'>User name</label>
            <input type='password' className='form-control' {...register('password')} placeholder='${users.password} ' disabled />
            <label htmlFor='password'>User name</label>
            <button className='btn btn-primary' onClick={updateUser} > submit </button>
        </div>
    </form>
    </>
  )
}
