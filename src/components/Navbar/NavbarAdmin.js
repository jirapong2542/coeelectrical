import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuListAdmin";
import "./Navbar.css";

const NavbarAdmin = () => {


    const [clicked, setClicked] = useState(false);
    const menuList = MenuList.map(({ url, title }, index) => {
        return (
            <li key={index}>
                <NavLink exact to={url} activeClassName="active">
                    {title}
                </NavLink>
            </li>
        );
    });

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav>
            <div className="logo">
                COE<font>11  </font>
            </div>
            <div className="headname">ระบบเฝ้าสังเกตการใช้พลังงานไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย</div>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "menu-list  my-auto " : "menu-list close  my-auto"}>{menuList}</ul>
        </nav>
    );
};

export default NavbarAdmin;