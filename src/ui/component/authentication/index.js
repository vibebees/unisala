// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCol, IonGrid, IonPopover, IonRow } from "@ionic/react"
import "./auth.css"
import SignIn from "./SignIn/Index"
import SignUp from "./SignUp/Index"
import Verification from "./Verification"

export const Authentication = ({ activeNavDrop, setActiveNavDrop }) => {
    const [auth, setauth] = React.useState("signin")
    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
    return (
        <IonPopover
            isOpen={activeNavDrop.profile}
            onDidDismiss={() =>
                setActiveNavDrop({
                    profile: false
                })
            }
            className="auth-pop"
        >
            <IonGrid>
                <IonRow>
                    <IonCol>
                        {auth === "signin" ? (
                            <SignIn setauth={setauth} />
                        ) : auth === "verify" ? (
                            <Verification setauth={setauth} />
                        ) : auth === "signup" ? (
                            <SignUp setauth={setauth} />
                        ) : null}
                    </IonCol>
                    {width > 764 && (
                        <IonCol size="auto">
                            <img
                                src="https://images.unsplash.com/photo-1597920940566-a77511f9327d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                                alt=""
                                className="auth-img"
                            />
                        </IonCol>
                    )}
                </IonRow>
            </IonGrid>
        </IonPopover>
    )
}
export default Authentication
