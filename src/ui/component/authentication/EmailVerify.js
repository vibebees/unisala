// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { IonButton, IonText, IonSpinner } from "@ionic/react"
import "./auth.css"
import AuthInput from "./AuthInput"
import axios from "axios"
import urls from "../../../utils/urls"

export const EmailVerify = ({ setauth }) => {
    const [errors, seterrors] = useState({})
    const [datacheck, setdatacheck] = useState(false)
    const [save, setsave] = useState(false)

    const [input, setInput] = useState({
        email: ""
    })
    const HandleChange = (e) => {
        const { name, value } = e.target
        setInput((pre) => {
            return { ...pre, [name]: value }
        })
        seterrors({
            ...errors,
            [name]: ""
        })
    }
    const validate = (data) => {
        const errors = {}
        if (
            !data.email.match(
                /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
            )
        ) {
            errors.email = "Invalid email address."
            // error = false;
        }
        seterrors(errors)
        return errors
    }
    const submitHandler = (e) => {
        e.preventDefault()
        seterrors(validate(input))
        setdatacheck(true)
    }
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && datacheck) {
            setsave(true)
            axios
                .post(urls["base"] + `/user/login`, input)
                .then((res) => {
                    setsave(false)
                    // setMessage("User saved sucessfully")
                    // setOpen(true)
                    setdatacheck(false)
                })
                .catch((err) => {
                    setsave(false)
                    console.log(err)
                    setdatacheck(false)
                })
        }
    }, [errors])
    return (
        <form onSubmit={submitHandler} className="sign-content">
            <IonText className="ion-margin-bottom">
                <h4>Verify your email address</h4>
            </IonText>
            <div className="auth-input-div ion-margin-top">
                <label className="auth-label">Email</label>
                <br />
                <AuthInput
                    validation={errors?.email}
                    HandleChange={HandleChange}
                    type="text"
                    name="email"
                    value={input?.email}
                />
            </div>
            <IonButton
                disabled={save}
                type="submit"
                className="ion-margin-top"
                expand="full"
                shape="round"
            >
                {save ? <IonSpinner></IonSpinner> : "Next"}
            </IonButton>
            {/* <IonText color="primary" className="auth-change">
                <p>Didn’t receive a email?</p>
            </IonText> */}
        </form>
    )
}
export default EmailVerify
