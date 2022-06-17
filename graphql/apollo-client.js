import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'
import {setContext} from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU1MzcyODg1LCJleHAiOjE2NTc5NjQ4ODV9.OxpeK8GIS9aZdBc_GvgB8tmx1A4Dghxn-esij9cei_Q"
    }
    }
  });
  
  const upoloadLink = createUploadLink({
    uri:"http://localhost:1337/graphql"
   });

    const httpLink =  createHttpLink({
        uri:"http://localhost:1337/graphql"
    })

const client = new ApolloClient({
    link:authLink.concat(upoloadLink,httpLink),
    cache: new InMemoryCache(),
});

export default client;