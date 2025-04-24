import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
    let { register, handleSubmit, formState: { errors } } = useForm();

    let [err,seterr] = useState('');

    let navigate = useNavigate()

    async function handleFormSignup(userobj) {

        if(userobj.userType === 'user'){
            let res = await axios.post('http://localhost:4000/user-api/register',userobj);

            console.log(res);

            if(res.data.message === "user created"){
                navigate('/Signin')
            }
            else{
                seterr(res.data.message);
            }
        }
        else{
            let res = await axios.post('http://localhost:4000/author-api/register',userobj);

            console.log(res);

            if(res.data.message === "author created"){
                navigate('/Signin')
            }
            else{
                seterr(res.data.message);
            }
        }
        
        
    }

    return (
        <div>
            <div>
                {err.length !== 0 && <p className='p-lead text-danger'>{err}</p>}
                <form className='w-50 mx-auto mt-5 border p-4 bg-light' onSubmit={handleSubmit(handleFormSignup)}>
                    <h3 className='text-center'>SignUp</h3>
                    <div className='init'>
                        <div>Register as</div>
                        <div className='form-check'>
                            <input 
                                type='radio' 
                                id='author' 
                                {...register("userType")} 
                                className='form-check-input' 
                                value="author" 
                            />
                            <label htmlFor='author' className='form-check-label'>Author</label>
                        </div>
                        <div className='form-check'>
                            <input 
                                type='radio' 
                                id='user' 
                                {...register("userType")} 
                                className='form-check-input' 
                                value="user" 
                            />
                            <label htmlFor='user' className='form-check-label'>User</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input 
                            type="text" 
                            id='username' 
                            className='form-control' 
                            {...register("username")} 
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            className='form-control' 
                            {...register("password")} 
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input 
                            type="email" 
                            id='email' 
                            className='form-control' 
                            {...register("email")} 
                        />
                    </div>
                    <button className='btn btn-success d-block m-auto mt-5'> Register</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
