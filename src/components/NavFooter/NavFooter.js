import React from "react";
import { Link } from "react-router-dom";
import "./NavFooter.scss";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

const NavFooter = () => {
  return (
    <nav className="nav-footer">
      <ul>
        <li>
          <a>
            Linkedin
          </a>
        </li>
        <li>
          <a>
            Github
          </a>
        </li>
      </ul>
      <div className="scroll-indicator">
        <p>Hold Shift and Scroll</p>
        <div className="border">
          <Arrow />
        </div>
        
      </div>
    </nav>
  )
}

export default NavFooter;