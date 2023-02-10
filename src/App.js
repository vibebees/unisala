
import React, { useEffect, useState } from "react"

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
    addCircleOutline
} from "ionicons/icons"

import { IonReactRouter } from "@ionic/react-router"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store/store"

import { Provider } from "react-redux"

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
import PostPopup from "./ui/component/post/PostPopup"
import MessagePop from "./ui/component/messagePop"
import SignIn from "./ui/component/authentication"

/* Theme variables */

const R = require("ramda")

const axios = require("axios")

const lib = {}

lib.R = R

lib.axios = axios
setupIonicReact()
const App = () => {

    const [width, setWidth] = useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    const [popup, setPopup] = useState(false)
    const [activeNavDrop, setActiveNavDrop] = useState({
        profile: false,
        message: false,
        notification: false
    })
    return (
        // <IonApp>
        //     <IonReactRouter>
        //         <IonRouterOutlet>
        //             <Route exact path="/home">
        //                 <Home />
        //             </Route>
        //             <Route exact path="/">
        //                 <Redirect to="/home" />
        //             </Route>
        //         </IonRouterOutlet>
        //     </IonReactRouter>
        // </IonApp>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <IonApp>
                    <IonPage>
                        <PostPopup setPopup={setPopup} popup={popup} />

                        <IonReactRouter>
                            {width >= 768 && (
                                <div>
                                    <div>
                                        <Nav
                                            setActiveNavDrop={setActiveNavDrop}
                                            activeNavDrop={activeNavDrop}
                                        />
                                    </div>

                                    {window?.location?.href.match(
                                        "messages"
                                    ) ? null : (
                                        <MessagePop />
                                    )}
                                    <IonRouterOutlet
                                        style={{
                                            marginTop: "65px"
                                        }}
                                    >
                                        <PageRoute setPopup={setPopup} />
                                    </IonRouterOutlet>
                                </div>
                            )}
                            {activeNavDrop.profile && (
                                <SignIn
                                    setActiveNavDrop={setActiveNavDrop}
                                    activeNavDrop={activeNavDrop}
                                />
                            )}
                            {width < 768 && (
                                <IonTabs>
                                    <IonRouterOutlet>
                                        <PageRoute />
                                    </IonRouterOutlet>

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

                                        <IonTabButton
                                            tab="network"
                                            href="/network"
                                        >
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
                                                onClick={() => {
                                                    setPopup(true)
                                                }}
                                            >
                                                <IonIcon
                                                    size="large"
                                                    icon={addCircleOutline}
                                                />
                                            </div>
                                        </IonTabButton>

                                        <IonTabButton
                                            tab="message"
                                            href="/messages"
                                        >
                                            <IonIcon icon={chatbubble} />
                                            <IonLabel
                                                style={{
                                                    fontSize: "10px"
                                                }}
                                            >
                                                Messeges
                                            </IonLabel>
                                            <IonBadge>3</IonBadge>
                                        </IonTabButton>

                                        <IonTabButton
                                            tab="notification"
                                            href="/notification"
                                        >
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
