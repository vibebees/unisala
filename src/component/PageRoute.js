import { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router"

import PreLoader from "./preloader"
import { StudyAbroadRoadmap } from "ui/pages/roadmap/visaRoadMap"
import { StudyAbroadRoadmapInput } from "ui/pages/roadmap"
import ProtectedRoute from "utils/lib/protectedRoute"

/*
const SpaceIndex = lazy(() => import("../pages/space/SpaceIndex/SpaceIndex"))
const HomePage = lazy(() => import("../pages/home"))
const ProfilePage = lazy(() => import("../pages/profilePage"))
const Messages = lazy(() => import("../pages/messages"))
const MyNetwork = lazy(() => import("../pages/myNetwork"))
const Notifications = lazy(() => import("../pages/notifications"))
const UniversityPage = lazy(() => import("../pages/university"))
const Search = lazy(() => import("../pages/search"))
const PageNotFound = lazy(() => import("./PageNotFound"))
const Login = lazy(() => import("../pages/login"))
const SpacePage = lazy(() => import("../ui/pages/space"))
const SingleThread = lazy(() => import("../ui/pages/thread"))


*/

import ProfilePage from "../pages/user.profile"
import Messages from "../pages/message"

const SpaceIndex = () => "SpaceIndex"
const HomePage = lazy(() => import("../pages/home"))
// const ProfilePage = () => lazy(() => import("../pages/user.profile"))
// const Messages = () => lazy(() => import("../pages/message"))
const MyNetwork = () => "MyNetwork"
const Notifications = () => "Notifications"
const UniversityPage = () => "UniversityPage"
const Search = () => "Search"
const PageNotFound = () => "PageNotFound"
const Login = () => "Login"
const SpacePage = () => "SpacePage"
const SingleThread = () => "SingleThread"

const messagingRoutes = () => (
  <>
    <ProtectedRoute>
      <Route path="/messages" exact>
        <Messages />
      </Route>
      <Route path="/messages/:username" exact>
        <Messages />
      </Route>
    </ProtectedRoute>
  </>
)
const spaceRoutes = () => (
  <>
    <ProtectedRoute>
      <Switch>
        <Route path="/space" exact>
          <SpaceIndex />
        </Route>
        <Route path="/space/:category" exact>
          <SpacePage />
        </Route>
      </Switch>
    </ProtectedRoute>
  </>
)

export const PageRoute = ({ allProps }) => (
  <Switch>
    <Suspense fallback={<PreLoader />}>
      <Route path="/roadmap" exact>
        <StudyAbroadRoadmap />
      </Route>

      <Route path="/myjourney" exact>
        <StudyAbroadRoadmapInput />
      </Route>

      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/">
        <HomePage propsall={allProps} />
      </Route>

      <Route exact path="/university/:id">
        <UniversityPage />
      </Route>

      <Route exact path="/thread/:id">
        <SingleThread />
      </Route>

      <Route path="/@/:username" exact>
        <ProfilePage />
      </Route>

      {messagingRoutes()}
      {spaceRoutes()}
      <Route path="/mynetwork" exact>
        <ProtectedRoute>
          <MyNetwork />
        </ProtectedRoute>
      </Route>

      <Route path="/notifications" exact>
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      </Route>

      <Route path="/search" exact>
        <Search />
      </Route>

      <Route path="/login" exact>
        <Login allProps={allProps} />
      </Route>

      <Route path="*" exact>
        <PageNotFound />
      </Route>
    </Suspense>
  </Switch>
)
