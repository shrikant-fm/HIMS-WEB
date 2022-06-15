import { ApolloClient, InMemoryCache } from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'

const client = new ApolloClient({
    link:createUploadLink({
        uri:"http://localhost:1337/graphql"
    }),
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
});

export default client;