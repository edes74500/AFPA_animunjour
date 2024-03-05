import React, { createRef, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { currentUserName, userLogin, userLogout } from "./auth.slice";

const StyledNavbar = styled.div`
  display: flex;
  /* gap: 50px; */
  width: 100%;
  color: white;
  justify-content: flex-end;
  align-items: center;
  form {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    /* gap: 50px; */
    /* width: 100%; */
    height: 80px;
    align-items: center;
    input {
      margin: 0 10px;
      width: 150px;
      height: 30px;
    }
  }
  input {
    margin: 0 10px;
    width: 150px;
    height: 30px;
  }
  div {
    display: flex;
    /* gap: 50px; */
    /* width: 100%; */
    height: 80px;
    align-items: center;
    background-color: black;
    /* padding: 0 50px; */
    /* padding: 10px; */
  }
`;
const NavLogin = () => {
  const userName = useSelector(currentUserName);

  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let handleCreateAccount = () => {
    handleFormSubmit();
  };

  let handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));

    setEmail("");
    setPassword("");
  };

  const handleLogOut = (e) => {
    dispatch(userLogout());
  };

  if (userName) {
    return (
      <StyledNavbar>
        <p>Welcome {userName}</p>
        <input type="button" value="Se deconnecter" onClick={handleLogOut} />
      </StyledNavbar>
    );
  }

  return (
    <StyledNavbar>
      <form onSubmit={handleLogin}>
        <label htmlFor="email ">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="connexion" />
      </form>

      <input type="button" value="Creer un compte" onClick={handleCreateAccount} />
    </StyledNavbar>
  );
};

export default NavLogin;
