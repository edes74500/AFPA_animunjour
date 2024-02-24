import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  gap: 50px;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: black;
  padding: 0 50px;
  ul {
    width: 100%;
    display: flex;
    /* justify-content: space-between; */
    gap: 50px;
  }
  a {
    text-decoration: none;
    color: white;
  }

  .active {
    color: #ff5200; /* Couleur du lien actif */
    font-weight: bold; /* Rendre le texte du lien actif plus gras */
    /* transition: 0.3s ease-in-out; */
  }
`;
const Navbar = () => {
  return (
    <StyledNavbar>
      <ul>
        <li>
          <NavLink to="/" className={(nav) => (nav.isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/jeux" className={(nav) => (nav.isActive ? "active" : "")}>
            Jeux
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={(nav) => (nav.isActive ? "active" : "")}>
            Admin
          </NavLink>
        </li>
      </ul>
    </StyledNavbar>
  );
};

export default Navbar;
