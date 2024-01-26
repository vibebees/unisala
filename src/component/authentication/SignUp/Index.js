import { IonText } from "@ionic/react"
import GoogleAuth from "../GoogleAuth"
import SignUpForm from "./SignUpForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"

export const SignUp = ({ setauth, setShowSignup = null }) => {
  const params = new URLSearchParams(window.location.search)
  const isInvited = params.get("org")
  return (
    <div className="sign-content bg-white">
      <IonText className="auth-start">
        <p>Start for free.</p>
      </IonText>

      <IonText className="mb-1">
        <h4 className="text-xl font-semibold text-neutral-600">
          Create a new account.
        </h4>
      </IonText>
      {!isInvited && (
        <div className="auth-button">
          <div
            style={{
              width: "234px"
            }}
          >
            <GoogleAuth setauth={setauth} />
          </div>
          <div className="auth-or">
            <p className="auth-or-p">OR</p>
          </div>
        </div>
      )}
      {/* <div className="auth-button">
        <AppleAuth />
      </div> */}

      <SignUpForm setauth={setauth} setShowSignup={setShowSignup} />
    </div>
  )
}
export default SignUp
