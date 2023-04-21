import { useEffect, useRef, useState } from "react"
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  setupIonicReact
} from "@ionic/react"
import {
  home,
  people,
  chatbubble,
  notifications,
  addCircleOutline,
  personCircle
} from "ionicons/icons"

import { IonReactRouter } from "@ionic/react-router"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store/store"
import { useDispatch, useSelector, Provider } from "react-redux"
import jwtDecode from "jwt-decode"

/* Core CSS required for Ionic components to work properly */

import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */

import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"
import Nav from "./ui/component/NavBar"
import { PageRoute } from "./ui/component/PageRoute"
import MessagePop from "./ui/component/messagePop"
import AuthModal from "./ui/component/authentication"
import { getUserProfile } from "./store/action/userProfile"

/* Theme variables */

const R = require("ramda")
const axios = require("axios")
const lib = {}

lib.R = R
lib.axios = axios
setupIonicReact()

const App = () => {
  const [width, setWidth] = useState(window.innerWidth),
    handleResize = () => {
      const { innerWidth } = window

      if (width !== innerWidth) {
        setWidth(innerWidth)
      }
    },
    socket = useRef(null)
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const [activeNavDrop, setActiveNavDrop] = useState({
    profile: false,
    message: false,
    notification: false
  })

  const dispatch = useDispatch(),
    { loggedIn } = useSelector((store) => store?.userProfile)

  useEffect(() => {
    const accessToken = localStorage?.getItem("accessToken"),
      decode = accessToken && jwtDecode(accessToken)
    dispatch(getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) }))
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <IonApp>
          <IonPage>
            <IonReactRouter>
              {width >= 768 && (
                <div>
                  <div>
                    <Nav
                      setActiveNavDrop={setActiveNavDrop}
                      activeNavDrop={activeNavDrop}
                    />
                  </div>

                  {/* {loggedIn && location.pathname !== "/messages" && (
                    <MessagePop />
                  )} */}

                  <IonRouterOutlet
                    style={{
                      marginTop: "65px"
                    }}
                  >
                    <PageRoute />
                  </IonRouterOutlet>
                </div>
              )}
              {activeNavDrop.profile && (
                <AuthModal
                  setActiveNavDrop={setActiveNavDrop}
                  activeNavDrop={activeNavDrop}
                />
              )}
              {width < 768 && (
                <IonTabs>
                  <IonRouterOutlet>
                    <PageRoute />
                  </IonRouterOutlet>

                  {loggedIn ? (
                    <IonTabBar slot="bottom">
                      <IonTabButton tab="Home" href="/">
                        <IonIcon icon={home} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Home
                        </IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="network" href="/mynetwork">
                        <IonIcon icon={people} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Network
                        </IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="post">
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <IonIcon size="large" icon={addCircleOutline} />
                        </div>
                      </IonTabButton>

                      <IonTabButton tab="message" href="/messages">
                        <IonIcon icon={chatbubble} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Messages
                        </IonLabel>
                        <IonBadge>3</IonBadge>
                      </IonTabButton>

                      <IonTabButton tab="notification" href="/notifications">
                        <IonIcon icon={notifications} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Notifications
                        </IonLabel>
                        <IonBadge>6</IonBadge>
                      </IonTabButton>
                    </IonTabBar>
                  ) : (
                    <IonTabBar slot="bottom">
                      <IonTabButton tab="Home" href="/">
                        <IonIcon icon={home} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Home
                        </IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="login" href="/login">
                        <IonIcon icon={personCircle} />
                        <IonLabel
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          Login
                        </IonLabel>
                      </IonTabButton>
                    </IonTabBar>
                  )}
                </IonTabs>
              )}
            </IonReactRouter>
          </IonPage>
        </IonApp>
      </PersistGate>
    </Provider>
  )
}

export default App
