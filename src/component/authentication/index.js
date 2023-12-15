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
import useWindowWidth from "hooks/useWindowWidth"
import ResetPassword from "./Verification/ForgotPassword/ResetPassword"
import clsx from "clsx"
import LoginText from "./LoginText"
import AuthTemplate from "./template/AuthTemplate"

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
              <LoginText allProps={{ setShowSignup, showSignup, setauth }} />
            </IonCard>

            <AuthTemplate
              singupTrueClass={"slide-out-right"}
              singupFalseClass={"slide-in-right"}
              showSignup={showSignup}
              auth={auth}
              setauth={setauth}
            >
              <SignIn setauth={setauth} auth={auth} allProps={allProps} />
            </AuthTemplate>
            {width > 764 && auth.state !== "welcomeForm" && (
              <AuthTemplate
                auth={auth}
                setauth={setauth}
                showSignup={showSignup}
                singupTrueClass={"slide-in-left"}
                singupFalseClass={"slide-out-left"}
              >
                <SignUp setauth={setauth} allProps={allProps} />
              </AuthTemplate>
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
