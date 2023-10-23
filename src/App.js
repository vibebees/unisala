import { useEffect, useState } from "react"
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store/store"
import { useDispatch, Provider, useSelector } from "react-redux"
import "@ionic/react/css/core.css"
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"
import Nav from "./ui/component/NavBar"
import { PageRoute } from "./ui/component/PageRoute"
import AuthModal from "./ui/component/authentication"
import useWindowWidth from "./hooks/useWindowWidth"
import MobileNav from "./ui/component/MobileNav"
import {getUserProfile} from "store/action/userProfile"
import jwtDecode from "jwt-decode"

/* Theme variables */

const R = require("ramda")
const axios = require("axios")
const lib = {}

lib.R = R
lib.axios = axios
setupIonicReact()

const DesktopView = ({ setActiveNavDrop, activeNavDrop }) => {
  return (
    <div>
      <Nav
        setActiveNavDrop={setActiveNavDrop}
        activeNavDrop={activeNavDrop}
      />
      <IonRouterOutlet style={{ marginTop: "65px" }}>
        <PageRoute />
      </IonRouterOutlet>
    </div>
  )
}

// src/components/organisms/MobileView.js
const MobileView = ({ setCreateAPostPopUp }) => {
  return <MobileNav setCreateAPostPopUp={setCreateAPostPopUp} />
}

// src/components/molecules/AuthModalWrapper.js
const AuthModalWrapper = ({ setActiveNavDrop, activeNavDrop }) => {
  return activeNavDrop.profile ? (
    <AuthModal
      setActiveNavDrop={setActiveNavDrop}
      activeNavDrop={activeNavDrop}
    />
  ) : null
}
const App = () => {
  const width = useWindowWidth()
  const [createAPostPopUp, setCreateAPostPopUp] = useState(false)
  const {refreshToken, accessToken} = useSelector((state) => state?.auth)

  const [activeNavDrop, setActiveNavDrop] = useState({
    profile: false,
    message: false,
    notification: false
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (accessToken) {
      const decode = jwtDecode(accessToken)
      dispatch(getUserProfile({user: {...decode}, loggedIn: Boolean(decode)}))
    }
  }, [refreshToken, accessToken])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <IonApp>
          <IonPage>
          <IonReactRouter>
              {width >= 768 && (
                <DesktopView
                  setActiveNavDrop={setActiveNavDrop}
                  activeNavDrop={activeNavDrop}
                />
              )}

              <AuthModalWrapper
                setActiveNavDrop={setActiveNavDrop}
                activeNavDrop={activeNavDrop}
              />

              {width < 768 && (
                <MobileView setCreateAPostPopUp={setCreateAPostPopUp} />
              )}
            </IonReactRouter>
          </IonPage>
        </IonApp>
      </PersistGate>
    </Provider>
  )
}

export default App
