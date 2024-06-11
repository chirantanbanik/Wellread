import React from 'react'
import {Container, Logo, LogoutBtn} from '../index.js'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()


  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Features",
      slug: "/features",
      active: !authStatus,
  },
  {
      name: "About us",
      slug: "/about",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  }
  ]




  return (
    <header className='py-2 w-full rounded-xl items-center justify-center bg-blue-600 shadow'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />


              </Link>
          </div>
          <ul className='flex items-center'>
            {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-8 py-2 duration-200 hover:bg-blue-100 hover:text-blue-600 rounded-full text-white text-md font-semibold'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
           
          </ul>
          {
              !authStatus && <button
                    onClick={() => navigate('/login')}
              className='text-white bg-blue-700 rounded-full px-6 py-1 hover:bg-blue-800 hover:scale-105 transition-transform duration-200 font-semibold text-md items-center justify-center'>
              Login
            </button>
            }
        </nav>
        </Container>
    </header>
  )
}


export default Header;