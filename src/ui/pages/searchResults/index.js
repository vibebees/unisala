// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonContent, IonText } from "@ionic/react"
import { useLocation } from "react-router"
import UniSearchResults from "./uniSearchResults"
import UserSearchResults from "./userSearchResults"
import "./index.css"

function index() {
    const url = useLocation()
    const isUni = url.pathname.includes("uni")
    const isUser = url.pathname.includes("user")
    // eslint-disable-next-line prefer-destructuring
    const query = url.pathname.split("=")[1]

    const searchResults = () => {
        if (isUni) return <UniSearchResults query={query} />
        if (isUser) return <UserSearchResults query={query} />
        return <IonText>Wrong URL</IonText>
    }

    return <IonContent>{searchResults()}</IonContent>
}

export default index
