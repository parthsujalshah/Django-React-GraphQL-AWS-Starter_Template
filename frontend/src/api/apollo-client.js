import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import { apiUrl } from "./urls";

export function newApolloClient() {
    const httpLink = createHttpLink({
        uri: `${apiUrl}graphql/`,
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        const authorizationDirty = token ? `JWT ${token}` : "";
        console.log('authorizationDirty', authorizationDirty)
        // var authorizationClean = "";
        // for (var i in authorizationDirty) {
        //     if (i !== `${4}` && i !== `${authorizationDirty.length - 1}`) {
        //         authorizationClean += authorizationDirty[i];
        //     }
        // }
        // console.log('authorizationClean', authorizationClean)
        return {
            headers: {
                ...headers,
                authorization: authorizationDirty
            }
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        credentials: 'include'
    });
};

export function newApolloImageClient() {
    const httpLink = createUploadLink({
        uri: `${apiUrl}graphql/file-upload/`,
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        const authorizationDirty = token ? `JWT ${token}` : "";
        // var authorizationClean = "";
        // for (var i in authorizationDirty) {
        //     if (i !== `${4}` && i !== `${authorizationDirty.length - 1}`) {
        //         authorizationClean += authorizationDirty[i];
        //     }
        // }
        return {
            headers: {
                ...headers,
                authorization: authorizationDirty
            }
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        credentials: 'include'
    });
};