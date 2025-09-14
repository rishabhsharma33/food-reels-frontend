import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/navbar.css';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get('token');
  const role = localStorage.getItem("role");

  const handleUserLogout = () => {
    Cookies.remove('token');
    axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true })
    // Optionally remove other user info cookies
    navigate('/user/login');
  };
  const handleFoodPartnerLogout = () => {
    Cookies.remove('token');
    axios.get("http://localhost:3000/api/auth/food-partner/logout", { withCredentials: true })
    // Optionally remove other user info cookies
    navigate('/food-partner/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Zomato Reels</Link>
      </div>
      <ul className="navbar-links">
        {!accessToken && (
          <>
            <li><Link to="/user/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {accessToken && role === 'user' && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={handleUserLogout} className="navbar-btn">Logout</button></li>
          </>
        )}
        {accessToken && role === 'foodPartner' && (
          <>
            <li><Link to="/create-food">Create Food</Link></li>
            <li><button onClick={handleFoodPartnerLogout} className="navbar-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;