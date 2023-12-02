import { IonText } from "@ionic/react"
import GoogleAuth from "../GoogleAuth"
import SignUpForm from "./SignUpForm"
import AppleAuth from "../AppleAuth"
import "../auth.css"

export const SignUp = ({ setauth, allProps }) => {
  return (
    <div className="sign-content">
      <IonText className="auth-start">
        <p>Start for free.</p>
      </IonText>

      <IonText className="mb-1">
        <h4 className="text-xl font-semibold text-neutral-600">
          Create a new account.
        </h4>
      </IonText>
      <div className="auth-button">
        <div
          style={{
            width: "234px"
          }}
        >
          <GoogleAuth setauth={setauth} allProps={allProps} />
        </div>
      </div>
      {/* <div className="auth-button">
        <AppleAuth />
      </div> */}
      <div className="auth-or">
        <p className="auth-or-p">OR</p>
      </div>
      <SignUpForm setauth={setauth} />
    </div>
  )
}
export default SignUp
