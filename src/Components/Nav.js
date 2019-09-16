import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <NavLink to="/search/jungle">Jungle</NavLink>
      </li>
      <li>
        <NavLink to="/search/ocean">Ocean</NavLink>
      </li>
      <li>
        <NavLink to="/search/mountains">Mountains</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
