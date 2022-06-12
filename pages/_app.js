import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import {SSRProvider} from '@react-aria/ssr';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <ApolloProvider client={client}>
      <SSRProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      </SSRProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
