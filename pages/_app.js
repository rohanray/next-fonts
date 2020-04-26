import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'roboto-v20-latin-regular';
  src: url('/fonts/roboto-v20-latin-regular.woff');
}

  p {
    font-family: 'roboto-v20-latin-regular';
  }
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
