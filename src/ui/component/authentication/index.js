import { useState, useEffect } from "react"
import {
  IonCol,
  IonGrid,
  IonPopover,
  IonRow,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent
} from "@ionic/react"
import "./auth.css"
import SignIn from "./SignIn/Index"
import SignUp from "./SignUp/Index"
import EmailVerify from "./Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "./Verification/SignUpVerification"
import ForgotPasswordVerification from "./Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "./Verification/ForgotPassword/ResetPassword"
import UserNotVerified from "./Verification/UserNotVerified"

export const Authentication = ({ activeNavDrop, setActiveNavDrop }) => {
  const [auth, setauth] = useState({
    state: "signin",
    email: "",
    code: 0
  })
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

  return (
    // <IonModal
    //   isOpen={activeNavDrop.profile}
    //   onDidDismiss={() =>
    //     setActiveNavDrop({
    //       profile: false
    //     })
    //   }
    // >
    //   <IonHeader>
    //     <IonToolbar>
    //       <IonButtons slot="end">
    //         <IonButton
    //           onClick={() =>
    //             setActiveNavDrop({
    //               profile: false
    //             })
    //           }
    //         >
    //           Close
    //         </IonButton>
    //       </IonButtons>
    //     </IonToolbar>
    //   </IonHeader>

    //   <IonGrid>
    //     <IonRow>
    //       <IonCol>
    //         {auth.state === "signin" ? (
    //           <SignIn setauth={setauth} setActiveNavDrop={setActiveNavDrop} />
    //         ) : auth.state === "signup" ? (
    //           <SignUp setauth={setauth} />
    //         ) : auth.state === "SignUpVerification" ? (
    //           <SignUpVerification setauth={setauth} />
    //         ) : auth.state === "emailVerify" ? (
    //           <EmailVerify setauth={setauth} />
    //         ) : auth.state === "ForgotPasswordVerification" ? (
    //           <ForgotPasswordVerification setauth={setauth} auth={auth} />
    //         ) : auth.state === "resetPassword" ? (
    //           <ResetPassword setauth={setauth} auth={auth} />
    //         ) : auth.state === "userNotVerified" ? (
    //           <UserNotVerified setauth={setauth} auth={auth} />
    //         ) : null}
    //       </IonCol>
    //       {width > 764 && (
    //         <IonCol size="auto">
    //           <img
    //             src="https://images.unsplash.com/photo-1597920940566-a77511f9327d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
    //             alt=""
    //             className="auth-img"
    //           />
    //         </IonCol>
    //       )}
    //     </IonRow>
    //   </IonGrid>
    // </IonModal>

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
              <SignUpVerification setauth={setauth} />
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
  )
}
export default Authentication
