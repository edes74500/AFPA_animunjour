import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.form`
  display: flex;
  gap: 50px;
  width: 100%;
  color: white;
  justify-content: flex-end;

  div {
    display: flex;
    /* gap: 50px; */
    /* width: 100%; */
    height: 80px;
    align-items: center;
    background-color: black;
    /* padding: 0 50px; */
    /* padding: 10px; */
    input {
      margin: 0 10px;
      width: 100px;
      height: 20px;
    }
  }
`;
const NavLogin = () => {
  return (
    <StyledNavbar>
      <div>
        <label htmlFor="id">ID</label>
        <input type="text" id="id" name="id" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
    </StyledNavbar>
  );
};

export default NavLogin;
