import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
function MyApp({ Component, pageProps }) {
  return (
    <>
    <ApolloProvider client={client}>
      <NextUIProvider>
        {/* <Header/> */}
        <Component {...pageProps} />
      </NextUIProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
