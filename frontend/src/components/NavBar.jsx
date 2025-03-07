import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!sessionStorage.getItem('token');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Remove token
    alert('You have logged out successfully.'); // Optional alert
    navigate('/'); // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img width="22" src="favicon.ico" alt="" /> ECOGROCER</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/Cart">Cart</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-auth">
        {isLoggedIn ? (
          <>
            <div className="user-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>User</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {/* <Link to="/profile">Profile</Link> */}
                  <Link to="/my-orders">My Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;
