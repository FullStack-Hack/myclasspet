import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <BrowserRouter>
      <header>
        <div class="logo">
          <img alt="logo" src="./public/logo.png" />
        </div>
        <nav>
          <div class="nav-item">
            <Link to="/students">Students</Link>
          </div>
          <div class="nav-item">
            <Link to="/activities">Activities</Link>
          </div>
          <div class="nav-item">
            <Link to="/rewards">Rewards</Link>
          </div>
          <div class="nav-item">
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
    </BrowserRouter>
  );
};

export default Navbar;
