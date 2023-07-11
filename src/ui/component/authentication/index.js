import { useState } from "react"
import { IonCol, IonGrid, IonPopover, IonRow } from "@ionic/react"
import "./auth.css"
import SignIn from "./SignIn/Index"
import SignUp from "./SignUp/Index"
import EmailVerify from "./Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "./Verification/SignUpVerification"
import ForgotPasswordVerification from "./Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "./Verification/ForgotPassword/ResetPassword"
import UserNotVerified from "./Verification/UserNotVerified"
import useWindowWidth from "../../../hooks/useWindowWidth"

export const Authentication = ({ activeNavDrop, setActiveNavDrop }) => {
  const [auth, setauth] = useState({
    state: "signin",
    email: "",
    code: 0
  })
  const width = useWindowWidth()

  return (
    <>
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
          <IonRow style={{ overflow: "hidden" }}>
            <IonCol>
              {auth.state === "signin" ? (
                <SignIn setauth={setauth} setActiveNavDrop={setActiveNavDrop} />
              ) : auth.state === "signup" ? (
                <SignUp setauth={setauth} />
              ) : auth.state === "SignUpVerification" ? (
                <SignUpVerification setauth={setauth} auth={auth}/>
              ) : auth.state === "emailVerify" ? (
                <EmailVerify setauth={setauth} />
              ) : auth.state === "ForgotPasswordVerification" ? (
                <ForgotPasswordVerification setauth={setauth} auth={auth} />
              ) : auth.state === "resetPassword" ? (
                <ResetPassword setauth={setauth} auth={auth} />
              ) : auth.state === "userNotVerified" ? (
                <UserNotVerified setauth={setauth} auth={auth} />
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
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          display: activeNavDrop.profile ? "block" : "none"
        }}
      />
    </>
  )
}
export default Authentication
