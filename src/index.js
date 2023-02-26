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

import { createRoot } from "react-dom/client"
import { AddPost } from "./graphql/user"
import { client } from "./servers/endpoints"

// const client = new ApolloClient({
//     link: from([authLink, errorLink, user]),
//     cache: new InMemoryCache()
// })
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
