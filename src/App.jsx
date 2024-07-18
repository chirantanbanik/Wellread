import  {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import { Footer, Header } from "./components";
import { Toaster } from "react-hot-toast";
import ScrollButton from "./components/ScrollButton";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(!userData){
        dispatch(login({userData: {name: "test"}}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-blue-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <br />
        <br />
        <Outlet />
        </main>
        <ScrollButton/> 
        <Footer />    
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  ) : null
}


export default App;