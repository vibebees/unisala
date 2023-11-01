import { useEffect, useState } from "react"
import {
  IonCol,
  IonGrid,
  IonPopover,
  IonRow,
  IonCard,
  IonText,
  IonContent
} from "@ionic/react"
import "./auth.css"
import SignIn from "./SignIn/Index"
import SignUp from "./SignUp/Index"
import EmailVerify from "./Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "./Verification/SignUpVerification"
import ForgotPasswordVerification from "./Verification/ForgotPassword/ForgotPasswordVerification"
import UserNotVerified from "./Verification/UserNotVerified"
import useWindowWidth from "../../../hooks/useWindowWidth"
import ResetPassword from "./Verification/ForgotPassword/ResetPassword"
import clsx from "clsx"

const TextCompnonent = ({ setShowSignup, showSignup, setauth }) => {
  return (
    <IonRow className="w-full flex flex-col">
      <div className="relative h-20">
        <IonText
          className={clsx(
            "w-full  text-center top-0 absolute text-3xl font-bold",
            showSignup ? "slide-out-right-text" : "slide-in-right"
          )}
        >
          Welcome Back!
        </IonText>
        <IonText
          className={clsx(
            "w-full  absolute top-0 text-center text-3xl font-bold",
            showSignup ? "slide-in-left" : "slide-out-left-text"
          )}
        >
          Hello There!, Welcome to Unisala
        </IonText>
      </div>

      <div className=" bordre-white h-20 relative   ">
        <IonText
          className={clsx(
            " mt-2 px-10 bg-transparent absolute top-0  text-neutral-200 w-full  text-center text-base font-medium",
            showSignup ? "slide-out-right-text" : "slide-in-right"
          )}
        >
          To keep connected with us please login with your personal info.
        </IonText>
        <IonText
          className={clsx(
            " mt-2 px-8 absolute top-0 text-neutral-200 w-full  text-center text-base font-medium",
            showSignup ? "slide-in-left" : "slide-out-left-text"
          )}
        >
          We&lsquo;re thrilled to have you join our community. Let&lsquo;s get
          you set up.
        </IonText>
      </div>

      <button
        onClick={() => {
          if (!showSignup) {
            setauth({
              state: "signup",
              email: "",
              code: 0
            })
          }
          setShowSignup(!showSignup)
        }}
        className={clsx(
          " border mx-auto border-solid   mt-1  px-6 text-lg py-1 text-white bg-blue-500   border-neutral-300  rounded-full"
        )}
      >
        {showSignup ? "Login" : "Sign Up"}
      </button>
    </IonRow>
  )
}

export const Authentication = ({ allProps }) => {
  const { activeNavDrop, setActiveNavDrop } = allProps
  const [showSignup, setShowSignup] = useState(false)
  const [auth, setauth] = useState({
    state: "signin",
    email: "",
    code: 0
  })

  const width = useWindowWidth()
  return (
    <>
      <IonPopover
        isOpen={activeNavDrop?.profile}
        onDidDismiss={() =>
          setActiveNavDrop({
            profile: false
          })
        }
        className="auth-pop "
      >
        <IonGrid className="!max-w-4xl w-full overflow-hidden ">
          <IonRow className="ion-no-padding">
            <IonCard
              className={clsx(
                "p-4 m-0 absolute max-md:h-1/2 max-md:w-full  transition-all duration-300 ease-linear w-1/2 z-20 flex flex-col justify-center gap-5 bottom-0 top-0 py-6 text-white bg-blue-500",
                showSignup
                  ? "left-0 right-1/2 max-md:right-0   max-md:bottom-0"
                  : "right-0 left-1/2 max-md:left-0 max-md:top-1/2"
              )}
            >
              <TextCompnonent
                setShowSignup={setShowSignup}
                showSignup={showSignup}
                setauth={setauth}
              />
            </IonCard>
            <IonCol
              className={clsx(
                showSignup ? "slide-out-right" : "slide-in-right"
              )}
            >
              <SignIn setauth={setauth} auth={auth} allProps={allProps} />
            </IonCol>
            {width > 764 && auth.state !== "welcomeForm" && (
              <IonCol
                className={clsx(
                  showSignup ? "slide-in-left" : "slide-out-left"
                )}
              >
                {auth.state === "signup" ? (
                  <SignUp setauth={setauth} allProps={allProps} />
                ) : auth.state === "SignUpVerification" ? (
                  <SignUpVerification setauth={setauth} auth={auth} />
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
          display: activeNavDrop?.profile ? "block" : "none"
        }}
      />
    </>
  )
}
export default Authentication
