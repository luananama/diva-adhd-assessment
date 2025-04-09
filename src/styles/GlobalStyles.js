import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --color-button-fill: #3297a6;
}
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* prevent horizontal scroll */
    overflow-y: auto;   /* scroll only when needed */
  }
  * {
    box-sizing: border-box;
  }
body {
  font-family: 'Roboto', sans-serif;
}
`;

export default GlobalStyles;
