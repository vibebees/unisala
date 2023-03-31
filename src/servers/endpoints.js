import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    split,
    fromPromise,
    from
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import urls from "."
import { onError } from "@apollo/client/link/error"
import axios from "axios"
import { MESSAGE_SERVICE_GQL, UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "./types"
import { io } from "socket.io-client"
import { getMainDefinition } from "@apollo/client/utilities"
const
    config = require("./config"),
    { messagingServiceAddress, universityServiceAddress, messageSocketAddress, userServiceAddress } = urls,
    getNewToken = async () => {
        try {
            const { data } = await axios.post(

                config.NODE_ENV === "PRODUCTION"
                    ? urls["base"] + "/user/refreshToken"
                    : userServiceAddress + "/refreshToken",
                { refreshToken: localStorage.getItem("refreshToken") })
            data?.refreshToken &&
                localStorage.setItem("refreshToken", data?.refreshToken || "")
            data?.accessToken &&
                localStorage.setItem("accessToken", data?.accessToken || "")
            return data.accessToken
        } catch (error) {
            console.log(error)
        }
    },
    errorLink = onError(
        ({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                )
            }
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    switch (err.message) {
                        case "UNAUTHORIZED":
                            return fromPromise(
                                getNewToken().catch((error) => error)
                            )
                                .filter((value) => Boolean(value))
                                .flatMap((accessToken) => {
                                    const oldHeaders =
                                        operation.getContext().headers
                                    operation.setContext({
                                        headers: {
                                            ...oldHeaders,
                                            authorization: `${accessToken}`
                                        }
                                    })
                                    return forward(operation)
                                })
                        default:
                    }
                }
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        }
    ),
    messageServerGql = new HttpLink({
        uri: config.NODE_ENV === "PRODUCTION"
            ? urls["base"] + "/message/graphql"
            : messagingServiceAddress + "/graphql",
        server: MESSAGE_SERVICE_GQL
    }),
    universityServerGql = new HttpLink({
        uri: config.NODE_ENV === "PRODUCTION"
            ? urls["base"] + "/uni/graphql"
            : universityServiceAddress + "/graphql",
        server: UNIVERSITY_SERVICE_GQL
    }),
    userServerGql = new HttpLink({
        uri: config.NODE_ENV === "PRODUCTION"
            ? urls["base"] + "/user/graphql"
            : userServiceAddress + "/graphql",
        server: USER_SERVICE_GQL
    }),
    authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem("accessToken")
        return {
            headers: {
                ...headers,
                authorization: token ? `${token}` : ""
            }
        }
    }),
    httpLink = split(
        (operation) => (operation.getContext().server === UNIVERSITY_SERVICE_GQL),
        universityServerGql,
        split(
            (operation) => operation.getContext().server === MESSAGE_SERVICE_GQL,
            messageServerGql,
            split(
                (operation) => operation.getContext().server === USER_SERVICE_GQL,
                userServerGql
            )
        )
    )

export
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        headers: {
            authorization: localStorage?.getItem("accessToken") || ""
        },
        cache: new InMemoryCache()
    }),
    messageSocket = () => io(messageSocketAddress),
    userServer = config.NODE_ENV === "PRODUCTION"
        ? urls["base"] + "/user/"
        : userServiceAddress,
    messageServer = config.NODE_ENV === "PRODUCTION"
        ? urls["base"] + "/message/"
        : userServiceAddress,
    universityServer = config.NODE_ENV === "PRODUCTION"
        ? urls["base"] + "/uni/"
        : userServiceAddress
