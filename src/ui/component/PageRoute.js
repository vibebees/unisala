// eslint-disable-next-line no-use-before-define
import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { HomePage } from "../pages/home/index"
import { UniversityPage } from "../pages/university"
import PageNotFound from "./PageNotFound"
import ProfilePage from "../pages/profilePage"
import Messages from "../pages/messages"
import SearchResults from "../pages/searchResults"
import MyNetwork from "../pages/myNetwork"
import Notifications from "../pages/notifications"
import UniSearchResults from "../pages/searchResults/uniSearchResults"
export const PageRoute = ({ setPopup }) => (
    <Switch>
        <Route exact path="/home">
            <HomePage setPopup={setPopup} />
        </Route>

        <Route exact path="/">
            <Redirect to="/home" />
        </Route>

        <Route exact path="/university/:id">
            <UniversityPage />
        </Route>

        <Route path="/university/:id">
            <UniversityPage />
        </Route>
        <Route path="/user/:username">
            <ProfilePage />
        </Route>
        <Route path="/messages">
            <Messages />
        </Route>
        <Route exact path="/search">
            <SearchResults />
        </Route>
        <Route path="/mynetwork">
            <MyNetwork />
        </Route>
        <Route path="/notifications">
            <Notifications />
        </Route>
        <Route path="/search/uni/:name">
            <UniSearchResults />
        </Route>
        <Route path="">
            <PageNotFound />
        </Route>
    </Switch>
)
