import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  fromPromise
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import urls from "."
import { onError } from "@apollo/client/link/error"
import axios from "axios"
import {
  MESSAGE_SERVICE_GQL,
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "./types"
import { io } from "socket.io-client"
import { getNewToken } from "api/authentication"

const config = require("./config"),
  {
    messagingServiceAddress,
    universityServiceAddress,
    messageSocketAddress,
    userServiceAddress,
    callSocketAddress
  } = urls,
  errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    let status = JSON.parse(graphQLErrors?.[0]?.message)

    if (status?.statusCode === 401) {
      localStorage.removeItem("accessToken")
      fromPromise(getNewToken().catch((error) => error))
        .filter((value) => Boolean(value))
        .flatMap((accessToken) => {
          const oldHeaders = operation.getContext().headers
          localStorage.setItem("accessToken", accessToken)

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `${accessToken}`
            }
          })
          return forward(operation)
        })
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        const { message, path } = err || {}
        const { statusCode } = JSON.parse(message) || {}
        switch (statusCode) {
          // case 400:
          case 401:
            return fromPromise(
              getNewToken().catch((error) => {
                return error // Consider whether you should be returning 'error' here
              })
            )
              .filter((value) => {
                return Boolean(value)
              })
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`
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
  }),
  messageServerGql = new HttpLink({
    uri: messagingServiceAddress + "/graphql",
    server: MESSAGE_SERVICE_GQL
  }),
  universityServerGql = new HttpLink({
    uri: universityServiceAddress + "/graphql",
    server: UNIVERSITY_SERVICE_GQL
  }),
  userServerGql = new HttpLink({
    uri: userServiceAddress + "/graphql",
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
    (operation) => operation.getContext().server === UNIVERSITY_SERVICE_GQL,
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

export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    headers: {
      authorization: localStorage?.getItem("accessToken") || ""
    },
    cache: new InMemoryCache()
  }),
  messageSocket = () => io(messageSocketAddress),
  callSocket = () => io(callSocketAddress),
  userServer = userServiceAddress,
  messageServer = messagingServiceAddress,
  universityServer = universityServiceAddress
