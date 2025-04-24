import "./Signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.userAuthorLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleFormSignin(userCred) {
    dispatch(userAuthorLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginUserStatus && currentUser) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      } else if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus, currentUser, navigate]);
  
  console.log("Login Status:", loginUserStatus);
  console.log("Current User:", currentUser);

    return (
        <div>
            <div>
                <form className='w-50 mx-auto mt-5 border p-4 bg-light' onSubmit={handleSubmit(handleFormSignin)}>
                    <h3 className='text-center'>SignIn</h3>
                    <div className='init'>
                        <div>Login as</div>
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
                    <button className='btn btn-success d-block m-auto mt-5'> Login</button>
                </form>
            </div>
        </div>
    )
}

export default Signin;
