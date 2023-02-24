// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonText } from "@ionic/react"
import "../auth.css"
import GoogleAuth from "../GoogleAuth"
import SignUpForm from "./SignUpForm"
import AppleAuth from "../AppleAuth"

export const SignUp = ({ setauth }) => {
    return (
        <div className="sign-content">
            <IonText className="auth-start">
                <p>Start for free.</p>
            </IonText>

            <IonText>
                <h4>Create a new account.</h4>
            </IonText>
            <div className="auth-button">
                <div
                    style={{
                        width: "234px"
                    }}
                >
                    <GoogleAuth />
                </div>
            </div>
            <div className="auth-button">
                <AppleAuth />
            </div>
            <div className="auth-or">
                <p className="auth-or-p">OR</p>
            </div>
            <SignUpForm setauth={setauth} />
        </div>
    )
}
export default SignUp
