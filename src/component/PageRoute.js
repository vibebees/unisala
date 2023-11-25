import { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router"

import PreLoader from "./preloader"
import ProtectedRoute from "utils/lib/protectedRoute"

const ProfilePage = lazy(() => import("../pages/user.profile"))
const Messages = lazy(() => import("../pages/message"))
const MyNetwork = lazy(() => import("../pages/network"))
const Notifications = lazy(() => import("../pages/notification"))
// Assuming StudyAbroadRoadmapInput is a component, if it's not, you can't lazy load it
const StudyAbroadRoadmapInput = lazy(() => import("features/roadmap/template"))
const Search = lazy(() => import("../pages/search"))
const SpacePage = lazy(() => import("../pages/space"))
const UniversityPage = lazy(() => import("../features/university/index"))
const Login = lazy(() => import("../pages/login"))
const StudyAbroadRoadmap = lazy(() => import("../pages/roadmap"))
const SpaceIndex = lazy(() => () => "SpaceIndex") // If SpaceIndex is a component, otherwise keep as it is
const HomePage = lazy(() => import("../pages/home"))
const ThreadDetail = lazy(() => import("../pages/thread.detail"))
const PageNotFound = lazy(() => import("./PageNotFound"))

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
        <ThreadDetail />
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
