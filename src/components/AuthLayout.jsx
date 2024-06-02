import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

export default function Protected({children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // if(authStatus === true){
        //     navigate("/")
        // } else if (authStatus === false){
        //     navigate("/login")
        // }
        
        if(authentication && authStatus !== authentication){
            navigate("/")
        } else if(!authentication && authStatus !== authentication){
            navigate("/home")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])


  return loader ? <h1>Loading....</h1> : <>{children}</>
}

