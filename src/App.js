import { useEffect, useState } from "react"
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from "@ionic/react"
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
import AuthModal from "./ui/component/authentication"
import { getUserProfile } from "./store/action/userProfile"
import useWindowWidth from "./hooks/useWindowWidth"
import MobileNav from "./ui/component/MobileNav"
import { CreateAPost } from "./ui/component/post/CreateAPost"

/* Theme variables */

const R = require("ramda")
const axios = require("axios")
const lib = {}

lib.R = R
lib.axios = axios
setupIonicReact()

const App = () => {
  const width = useWindowWidth()
  const [createAPostPopUp, setCreateAPostPopUp] = useState(false)

  const [activeNavDrop, setActiveNavDrop] = useState({
    profile: false,
    message: false,
    notification: false
  })

  const dispatch = useDispatch()

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
                  <Nav
                    setActiveNavDrop={setActiveNavDrop}
                    activeNavDrop={activeNavDrop}
                  />

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
              <CreateAPost
                setPopup={setCreateAPostPopUp}
                popup={createAPostPopUp}
              />
              {width < 768 && (
                <MobileNav setCreateAPostPopUp={setCreateAPostPopUp} />
              )}
            </IonReactRouter>
          </IonPage>
        </IonApp>
      </PersistGate>
    </Provider>
  )
}

export default App
