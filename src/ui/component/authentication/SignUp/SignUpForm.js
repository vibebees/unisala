import { useState, useEffect } from "react"
import { IonButton, IonRow, IonSpinner, useIonToast } from "@ionic/react"

import AuthInput from "../AuthInput"
import validate from "../../../../utils/components/validate"
import { userServer } from "../../../../servers/endpoints"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../../store/action/authenticationAction"
import "../auth.css"

export const SignUpForm = ({ setauth }) => {
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
  const submitHandler = (e) => {
      e.preventDefault()
      seterrors(validate(input))
      setdatacheck(true)
    },
    dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(errors).length === 0 && datacheck) {
      setsave(true)
      dispatch(
        registerUser({
          userServer,
          input,
          setdatacheck,
          setauth,
          setsave,
          present,
          dismiss
        })
      )
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
        <label className="auth-label">Password</label>
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
        <p
          style={{ color: "#3880ff", cursor: "pointer" }}
          onClick={() => {
            setauth({ state: "emailVerify" })
          }}
        >
          Forgot Password?
        </p>
      </div>
      <IonButton disabled={save} type="submit" expand="full" shape="round">
        {save ? <IonSpinner></IonSpinner> : "Register"}
      </IonButton>
      <IonRow className="auth-change inline-flex">
        <p>Already a member?</p>
        <a
          onClick={() => {
            setauth({ state: "signin" })
          }}
        >
          sign in
        </a>
      </IonRow>
    </form>
  )
}
export default SignUpForm
