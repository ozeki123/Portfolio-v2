import React from "react";
import "./NavHeader.scss";
import { ReactComponent as MailIcon } from "../../assets/icons/mail-icon.svg";
import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <nav className="nav-header">
      <h3>
        <Link to="/">
          AO
        </Link>
      </h3>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <MailIcon />
        </li>
      </ul>
    </nav>
  )
}

export default NavHeader;