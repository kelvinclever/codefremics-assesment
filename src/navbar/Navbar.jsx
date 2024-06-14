import React, { useState, useEffect, useRef } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();
  const menuRef = useRef();
  const bookRef = useRef();
  const user = localStorage.getItem("user");

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <header className="nav">
        <div className="content">
          <div className="logo">
            <p>
              <span>CODE</span>FREMICS
            </p>
          </div>
          <div className="listItems">
            <ul>
              <a href="/">Home</a>
              <a href="/aboutus">About Us</a>
              <a href="/contactus">Contact Us</a>
            </ul>
          </div>
          <div className="other_btn">
            {!user ? (
              <div>
                <a href="/login">Login</a>
              </div>
            ) : (
              <a onClick={handleLogout}>Logout</a>
            )}
          </div>
          <div>
            <span className="menuIcon">
              {menu ? (
                <MdMenu
                  style={{ color: "white", fontSize: "3rem" }}
                  className="menuClose"
                  onClick={toggleMenu}
                  ref={menuRef}
                />
              ) : (
                <MdClose
                  style={{ color: "white", fontSize: "2rem", backgroundColor: "red" }}
                  className="menuClose"
                  onClick={toggleMenu}
                  ref={menuRef}
                />
              )}
            </span>
            {!menu ? (
              <div className="menuItems">
                <a href="/">Home</a>
                <a href="/account">Account</a>
                {!user ? (
                  <a href="/login">Login</a>
                ) : (
                  <button onClick={handleLogout}>Logout</button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
