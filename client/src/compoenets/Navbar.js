import React from "react";
import { Component } from "react";
import { menudata } from "./menudata";
import "./Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <Link to="/">
                    <i className="fa fa-bars"></i>
                </Link>
                <ul className="nav-menu">
                    {menudata.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <div>
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <span> {item.title} </span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link to="/signin">
                    <i className="fa fa-sign-in"></i>
                </Link>
            </nav>
        );
    }
}

export default Navbar;
