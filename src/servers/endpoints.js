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
import { UNIVERSITY_SERVICE } from "./types"

const
    config = require("./config"),
    { messagingServiceAddress, universityServiceAddress } = urls,
    getNewToken = async () => {
        try {
            const { data } = await axios.post(urls["base"] + "/user/refreshToken", { refreshToken: localStorage.getItem("refreshToken") })
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
    messageServer = new HttpLink({
        uri: config.NODE_ENV === "PRODUCTION"
            ? urls["base"] + "/user/graphql"
            : messagingServiceAddress + "/graphql",
        server: "MESSAGING_SERVICE"
    }),
    universityServer = new HttpLink({
        uri: config.NODE_ENV === "PRODUCTION"
            ? urls["base"] + "/uni/graphql"
            : universityServiceAddress + "/graphql",
            server: "UNIVERSITY_SERVICE"
    }),
    authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem("accessToken")
        return {
            headers: {
                ...headers,
                authorization: token ? `${token}` : ""
            }
        }
    })

export const client = new ApolloClient({
    link: split(
        (operation) => operation.getContext().clientName === UNIVERSITY_SERVICE,
        universityServer,
        from([authLink, errorLink, messageServer])
    ),
    headers: {
        authorization: localStorage?.getItem("accessToken") || ""
    },
    cache: new InMemoryCache()
})
