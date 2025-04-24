import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import { useSelector,useDispatch } from 'react-redux'

import { resetState } from '../../redux/slices/userAuthorSlice'

function Navbar() {
  let {loginUserStatus,errorOccured,errMsg,currentUser} = useSelector(state=>state.userAuthorLoginReducer)



  let dispatch = useDispatch();

  function SignOut(){

      localStorage.removeItem('token');

      dispatch(resetState());
  }

  return (
    <div>
        <div className='Nav'>
        {loginUserStatus===false ?( <>
          <li className='nav-item'>
              <Link className='nav-link' to="/">Home</Link>
          </li>
          <li className='nav-item'>
              <Link className='nav-link' to="Signup">Signup</Link>
          </li>
          <li className='nav-item'>
              <Link className='nav-link' to="Signin">Signin</Link>
          </li>
          </>):(
          <li className="nav-item">
               
          <Link
            className="nav-link"
            to="Signin"
            style={{ color: "var(--light-grey)" }}
            onClick={SignOut}
          >
             <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#994570" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.username}
             <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
             </span>
            Signout
          </Link>
        </li>
        )}
        </div>
    </div>
  )
}

export default Navbar; 