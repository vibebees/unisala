import { useState, useEffect } from "react"
import { IonButton, IonSpinner, IonRow, useIonToast } from "@ionic/react"

import AuthInput from "../AuthInput"
import { userServer } from "../../../../servers/endpoints"
import { validateSignIn } from "../../../../utils/components/validate"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../../store/action/authenticationAction"

export const SignInForm = ({ setauth }) => {
  const [present, dismiss] = useIonToast()
  const [datacheck, setdatacheck] = useState(false)
  const [errors, seterrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
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
      seterrors(validateSignIn(input))
      setdatacheck(true)
    },
    dispatch = useDispatch()

  const login = () => {
    dispatch(
      loginUser({ userServer, input, setLoading, present, dismiss, setauth })
    )
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && datacheck) {
      setLoading(true)
      login()
    }
  }, [errors])

  return (
    <form onSubmit={submitHandler}>
      <div className="auth-input-div">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          name="email"
          value={input?.email}
          validation={errors?.email}
        />
      </div>
      <div className="auth-input-div">
        <label className="auth-label">Password</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="password"
          name="password"
          value={input?.password}
          validation={errors?.password}
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
      <IonButton disabled={loading} type="submit" expand="full" shape="round">
        {loading ? <IonSpinner></IonSpinner> : "Login"}
      </IonButton>
      <IonRow className="auth-change inline-flex">
        <p>Not Registered Yet?</p>
        <a
          onClick={() => {
            setauth({ state: "signup" })
          }}
        >
          Create an account
        </a>
      </IonRow>
    </form>
  )
}
export default SignInForm
