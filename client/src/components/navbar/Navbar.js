import React, { useState } from "react";
import { Component } from "react";
import { menudata } from "./menudata";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);

  const handleIconClick = (index) => {
    if (selectedIconIndex === index) {
      setSelectedIconIndex(null); // 클릭한 아이콘을 다시 클릭하면 크기를 원래대로 돌립니다.
    } else {
      setSelectedIconIndex(index);
    }
  };

    return (
      <nav className="NavbarItems">
      <Link to="/">
        <i
          className="fa fa-bars"
          onClick={() => setSelectedIconIndex(null)}
        ></i>
      </Link>
      <ul className="nav-menu">
        {menudata.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.url}
                onClick={() => handleIconClick(index)}
              >
                <div>
                  <i
                    className={item.icon}
                    style={{
                      fontSize:
                        selectedIconIndex === index ? "28px" : "20px",
                    }}
                  ></i>
                  </div>
                  <div>
                    <span> {item.title} </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <span className="login"> LOGIN</span>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span className="signin"> SIGN UP</span>
          </Link>
        </div>
        <Link to="/signin">
          <i className="fa fa-sign-in"></i>
        </Link>
      </nav>
    );
  }

export default Navbar;
