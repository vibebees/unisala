// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import "../auth.css"
import {
    IonButton,
    IonRow,
    IonSpinner,
    useIonToast
} from "@ionic/react"
import { Link } from "react-router-dom"
import AuthInput from "../AuthInput"
import axios from "axios"
let url = require("../../../../utils/urls")

export const SignUpForm = ({ setauth }) => {
    console.log("url ------> ", url)
    const [errors, seterrors] = useState({})
    const [present, dismiss] = useIonToast()
    const [datacheck, setdatacheck] = useState(false)
    const [save, setsave] = useState(false)

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
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
        if (!data.firstName) {
            errors.firstName = "First name required"
        }
        if (!data.lastName) {
            errors.lastName = "Last name required"
        }
        if (
            !data.email.match(
                /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
            )
        ) {
            errors.email = "Invalid email address."
            // error = false;
        }
        if (!data.password) {
            errors.password = "Password field is required"
        } else if (
            !data.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
            )
        ) {
            errors.password =
                "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
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
                .post(url["backend"] + `/user/register`, input)
                .then((res) => {
                    setsave(false)
                    if (res.data.success === true) {
                        localStorage.setItem("email", input.email)
                        setdatacheck(false)
                        setauth("verify")
                    }
                })
                .catch((err) => {
                    setsave(false)
                    present({
                        duration: 200000,
                        message: err.response.data.message,
                        buttons: [{ text: "X", handler: () => dismiss() }],
                        color: "primary",
                        mode: "ios"
                    })
                    setdatacheck(false)
                })
        }
    }, [errors])
    return (
        <form onSubmit={submitHandler}>
            <div className="auth-name">
                <div>
                    <label className="auth-label">First name</label>
                    <AuthInput
                        validation={errors?.firstName}
                        type="text"
                        name="firstName"
                        value={input?.firstName}
                        HandleChange={HandleChange}
                    />
                </div>
                <div>
                    <label className="auth-label">Last name</label>
                    <AuthInput
                        validation={errors?.lastName}
                        HandleChange={HandleChange}
                        type="text"
                        name="lastName"
                        value={input?.lastName}
                    />
                </div>
            </div>
            <div className="auth-input-div">
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
            <div className="auth-input-div">
                <label className="auth-label">Passward</label>
                <br />
                <AuthInput
                    validation={errors?.password}
                    HandleChange={HandleChange}
                    type="password"
                    name="password"
                    value={input?.password}
                />
            </div>
            <div className="auth-policy">
                <Link to="">Forget Passward?</Link>
            </div>
            <IonButton
                disabled={save}
                type="submit"
                expand="full"
                shape="round"
            >
                {save ? <IonSpinner></IonSpinner> : "Register"}
            </IonButton>
            <IonRow className="auth-change">
                <p>Already a member?</p>{" "}
                <a
                    onClick={() => {
                        setauth("signin")
                    }}
                >
                    {" "}
                    sign in
                </a>
            </IonRow>
        </form>
    )
}
export default SignUpForm
