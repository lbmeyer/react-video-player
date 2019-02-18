import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body {
    font-size: 10px;
    font-family: 'Hind', sans-serif;
  }
`;

export default GlobalStyle;
