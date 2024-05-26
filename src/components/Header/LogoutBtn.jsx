import React from 'react';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth.js';
import {logout} from '../../store/authSlice.js';
import toast from "react-hot-toast";

function LogoutBtn() {
    const dispatch = useDispatch();
    let successMsg="Logged out successfully";
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout()); 
        });
        toast.success(successMsg);
    }
    
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn