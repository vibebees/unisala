// eslint-disable-next-line no-use-before-define
import React from "react"
import App from "./App"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store/store"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
    fromPromise,
    from
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

import axios from "axios"
import urls from "./utils/urls"
import { createRoot } from "react-dom/client"

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken")
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ""
        }
    }
})

const getNewToken = async () => {
    try {
        const { data } = await axios.post(
            urls["base"] + "/user/refreshToken",
            {
                refreshToken: localStorage.getItem("refreshToken")
            }
        )
        data?.refreshToken &&
            localStorage.setItem("refreshToken", data?.refreshToken || "")
        data?.accessToken &&
            localStorage.setItem("accessToken", data?.accessToken || "")

        return data.accessToken
    } catch (error) {
        console.log(error)
    }
}

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            )
        }
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.message) {
                    case "UNAUTHORIZED":
                        return fromPromise(
                            getNewToken().catch((error) => {
                                return error
                            })
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
)
const user = new HttpLink({
    uri: urls["base"] + "/user/graphql"
})
const uni = new HttpLink({
    uri: urls["base"] + "/uni/graphql"
})
// const client = new ApolloClient({
//     link: from([authLink, errorLink, user]),
//     cache: new InMemoryCache()
// })

const client = new ApolloClient({
    link: ApolloLink.split(
        (operation) => operation.getContext().clientName === "uni",
        uni,
        from([authLink, errorLink, user])
    ),
    headers: {
        authorization: localStorage?.getItem("accessToken") || ""
    },
    cache: new InMemoryCache()
})

const root = createRoot(document.getElementById("root"))
root.render(<ApolloProvider client={client}>
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
</ApolloProvider>)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
