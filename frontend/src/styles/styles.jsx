import { css } from "styled-components";

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
  }

  body {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    font-family: "Inter Variable", sans-serif;
  }

  input[type="button"],
  input[type="submit"] {
    font-family: "Inter Variable", sans-serif;
    background-color: #2c2c2c; /* Green */
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
`;
export { styles };
