import React, { useState, useEffect, useRef } from 'react';
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for burger menu

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const menuRef = useRef();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Features", slug: "/login", active: !authStatus },
    { name: "About us", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='py-2 w-full rounded-xl items-center justify-center bg-blue-600 shadow sticky top-0 z-1'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <div className='flex md:hidden'>
            <button onClick={handleMenuToggle} className='text-white'>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul ref={menuRef} className={`flex-col md:flex md:flex-row items-center absolute md:static top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 transition-transform duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full md:opacity-100 md:translate-y-0'}`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='my-2 md:my-0'>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false); // Close menu on navigation
                    }}
                    className='block px-8 py-2 duration-200 hover:bg-blue-100 hover:text-blue-600 rounded-full text-white text-md font-semibold'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='my-2 md:my-0'>
                <LogoutBtn />
              </li>
            )}
            {!authStatus && (
              <li className='my-2 md:my-0'>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false); // Close menu on navigation
                  }}
                  className='text-white bg-blue-700 rounded-full px-6 py-1 hover:bg-blue-800 hover:scale-105 transition-transform duration-200 font-semibold text-md items-center justify-center'
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
