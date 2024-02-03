import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  word-break: keep-all;
}

html {
  overflow-y: scroll;
  background-color: #f9f9f9;
}

body {
  margin: 0;
}

a
a:hover,
a:active,
a:visited {
  color: #494949;
  text-decoration: none;
}

:root {
  --box-shadow: 5px 5px 10px 0 rgb(0 0 0 / 5%);
}

:global(#root) {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav,
.footer {
  flex: none;
}

.body {
  position: relative;
  flex-grow: 1;
}

`;
