import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import pencilLogo from '../assets/images/pencil.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      <div className="logo">
        <img src={pencilLogo} alt="logo" height={40} />
      </div>
      <div className="heading" style={{ fontFamily: 'sans-serif' }}>
        <h1>Keep My Notes</h1>
      </div>
      <div className="btn-container">
        {isHomePage && (
          <Link to="/add-note" className="btn btn-primary">
            <FaPlus />
          </Link>
        )}
        {!isHomePage && <div className="empty-space-for-button"></div>}
      </div>
    </div>
  );
};

export default Header;
