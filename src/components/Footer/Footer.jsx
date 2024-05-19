import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto w-full">
      <div className="container mx-auto">
        {/* Logo section */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <span className="text-3xl font-extrabold text-white">WellRead</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3">
          <div className="footer-section text-gray-300"> {/* Changed text color */}
            <h3 className="font-bold mb-2">About Us</h3>
            <p>WellRead is a blogging application for creative people to express their feelings, thoughts, and ideas.</p>
          </div>
          <div className="footer-section text-gray-300"> {/* Changed text color */}
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul>
              <li><Link to="/" className="text-blue-300 hover:text-blue-200">Home</Link></li> {/* Changed text and hover colors */}
              <li><Link to="/all-posts" className="text-blue-300 hover:text-blue-200">All Posts</Link></li> {/* Changed text and hover colors */}
              <li><Link to="/add-post" className="text-blue-300 hover:text-blue-200">Add Post</Link></li> {/* Changed text and hover colors */}
            </ul>
          </div>
          <div className="footer-section text-gray-300"> {/* Changed text color */}
            <h3 className="font-bold mb-2">Legal</h3>
            <ul>
              <li><Link to="/privacy-policy" className="text-blue-300 hover:text-blue-200">Privacy Policy</Link></li> {/* Changed text and hover colors */}
              <li><Link to="/terms-of-service" className="text-blue-300 hover:text-blue-200">Terms of Service</Link></li> {/* Changed text and hover colors */}
              <li><Link to="/cookie-policy" className="text-blue-300 hover:text-blue-200">Cookie Policy</Link></li> {/* Changed text and hover colors */}
            </ul>
          </div>
          <div className="footer-section text-gray-300"> {/* Changed text color */}
            <h3 className="font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center items-center gap-3">
              <a href="https://github.com/chirantanbanik" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/chirantanbanik/" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-300"> {/* Changed text color */}
          <p>&copy; 2024 WellRead. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
