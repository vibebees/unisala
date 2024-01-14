import { useState, useEffect } from "react"
import { IonButton, IonRow, IonSpinner, useIonToast } from "@ionic/react"
import { useLocation } from "react-router"
import AuthInput from "../AuthInput"
import { useDispatch } from "react-redux"
import "../auth.css"
import { userServer } from "servers/endpoints"
import { registerUser } from "store/action/authenticationAction"
import { validateSignup } from "utils/components/validate"

export const SignUpForm = ({ setauth, setShowSignup = null }) => {
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
      seterrors(validateSignup(input))
      setdatacheck(true)
    },
    dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(errors).length === 0 && datacheck) {
      setsave(true)
      localStorage.setItem("email", input.email)
      dispatch(
        registerUser({
          userServer: userServer,
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
      <button
        type="submit"
        onSubmit={submitHandler}
        className="block text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {save ? <IonSpinner></IonSpinner> : "Register"}
      </button>

      <IonRow
        onClick={() => {
          setauth({ state: "signin" })
          if (setShowSignup) {
            setShowSignup(false)
          }
        }}
        className="auth-change mt-7 inline-flex"
      >
        <p className="text-blue-600 font-medium text-lg">
          Already a member?{" "}
          <span className="underline underline-offset-4"> sign in</span>
        </p>
      </IonRow>
    </form>
  )
}
export default SignUpForm
