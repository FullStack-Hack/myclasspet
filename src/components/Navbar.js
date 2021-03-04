import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      {/* <div className="logo">
        <img alt="logo" src={logo} />
      </div> */}
      <nav>
        <div className="nav-item">
          <Link to="/students">Students</Link>
        </div>
        <div className="nav-item">
          <Link to="/activities">Activities</Link>
        </div>
        <div className="nav-item">
          <Link to="/rewards">Rewards</Link>
        </div>
        <div className="nav-item">
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
