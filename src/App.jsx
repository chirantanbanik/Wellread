import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import { Footer, Header } from "./components"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  useEffect(() => {
    navigate("login");
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      {authStatus ? (
        <div className='w-full block'>
          {/* <Header /> */}
          <main>
            <br />
            <br />
            <Outlet />
          </main>
          <Footer />
        </div>
      ) : (
        <div className='w-full flex flex-wrap'>
          <div className='w-3/5 flex flex-row items-center justify-center'>
            <img src="../Clip path group.svg" alt='My Image' className='mt-[-80px] mr-10 h-full object-cover'/>
          </div>
          <div className='w-2/5'>
            <div className='h-full'>
              {/* <Header /> */}
              <main>
                <br />
                <br />
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default App
