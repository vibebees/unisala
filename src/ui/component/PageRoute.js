import { Redirect, Route, Switch } from "react-router"
import { HomePage } from "../pages/home/index"
import { UniversityPage } from "../pages/university"
import PageNotFound from "./PageNotFound"
import ProfilePage from "../pages/profilePage"
import Messages from "../pages/messages"
import MyNetwork from "../pages/myNetwork"
import Notifications from "../pages/notifications"
import UniSearchResults from "../pages/uniSearchResults"
import UserSearchResults from "../pages/userSearchResults"

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
        <Route path="/@/:username">
            <ProfilePage />
        </Route>
        <Route path="/messages">
            <Messages />
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
        <Route path="/search/users/:name">
            <UserSearchResults />
        </Route>
        <Route path="">
            <PageNotFound />
        </Route>
    </Switch>
)
