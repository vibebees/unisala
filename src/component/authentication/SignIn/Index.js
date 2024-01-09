import { IonText } from "@ionic/react"
import GoogleAuth from "../GoogleAuth"
import SignInForm from "./SignInForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"
import clsx from "clsx"

export const SignIn = ({ setauth, auth, setShowSignup = null }) => {
  return (
    <div
      className={clsx(
        "sign-content",
        auth?.state === "welcomeForm"
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      )}
    >
      <IonText className="auth-start">
        <h2 className="text-2xl font-semibold">Sign in</h2>
      </IonText>
      <div className="auth-button">
        <div
          style={{
            width: "234px"
          }}
        >
          <GoogleAuth setauth={setauth} />
        </div>
      </div>
      {/* <div className="auth-button">
        <AppleAuth setauth={setauth} />
      </div> */}

      <div className="auth-or">
        <p className="auth-or-p">or Sign in with Email!</p>
      </div>
      <SignInForm setauth={setauth} setShowSignup={setShowSignup} />
    </div>
  )
}
export default SignIn
