import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Nav extends Component {
  handleSubmit = query => {
    this.props.onSubmit(query);
  };

  render() {
    return (
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/jungle" onClick={() => this.handleSubmit("jungle")}>
              Jungle
            </NavLink>
          </li>
          <li>
            <NavLink to="/ocean" onClick={() => this.handleSubmit("ocean")}>
              Ocean
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mountains"
              onClick={() => this.handleSubmit("mountains")}
            >
              Mountains
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
