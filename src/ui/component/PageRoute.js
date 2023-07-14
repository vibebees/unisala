import { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router"
import ProtectedRoute from "../../utils/lib/protectedRoute"
import { StudyAbroadRoadmap } from "../pages/roadmap"
import PreLoader from "./preloader"

const HomePage = lazy(() => import("../pages/home"))
const ProfilePage = lazy(() => import("../pages/profilePage"))
const Messages = lazy(() => import("../pages/messages"))
const MyNetwork = lazy(() => import("../pages/myNetwork"))
const Notifications = lazy(() => import("../pages/notifications"))
const UniversityPage = lazy(() => import("../pages/university"))
const Search = lazy(() => import("../pages/search"))
const PageNotFound = lazy(() => import("./PageNotFound"))
const Login = lazy(() => import("../pages/login"))
const SpacePage = lazy(() => import("../pages/space"))

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
      <Route path="/space/:category" exact>
        <SpacePage />
      </Route>
    </ProtectedRoute>
  </>
)

export const PageRoute = () => (
  <Switch>
    <Suspense fallback={<PreLoader />}>
      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route exact path="/university/:id">
        <UniversityPage />
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
        <Login />
      </Route>

      <Route path="/roadmap" exact>
        <StudyAbroadRoadmap />
      </Route>

      <Route path="" exact>
        <PageNotFound />
      </Route>
    </Suspense>
  </Switch>
)
