import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
    list-style: none;
    display: flex;
    
}

a{
    text-decoration:none;    
}




`;
