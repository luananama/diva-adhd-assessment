import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @media print {
    nav, footer, button, .non-printable {
      display: none !important;
    }

    body {
      background: white;
      margin: 0;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 8px;
    }
  }


:root {
  --color-button-fill: #3297a6;
    /* Base colors */
    --color-white: #ffffff;
    --color-black: #2b2b2b;

    /* Grays */
    --color-gray-100: #f9f9f9;
    --color-gray-200: #f0f0f0;
    --color-gray-300: #eeeeee;
    --color-gray-400: #d7d7d7;
    --color-gray-600: #aeaeae;
    --color-gray-700: #4a4a4a;
    --color-gray-800: #444444;
    --color-gray-900: #333333;

    /* Primary colors */
    --color-primary-light: #ceedf1;
    --color-primary: #3db2c4;
    --color-primary-dark: #1c688a;
    --color-primary-alt: #3297a6;

    /* Accent / Link */
    --color-accent-blue: #4c9ca8;
    --color-accent-pink: #d77b8f;

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
