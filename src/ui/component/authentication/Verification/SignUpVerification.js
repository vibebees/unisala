import { useState } from "react"
import { useIonToast } from "@ionic/react"
import axios from "axios"

import "../auth.css"
import VerificationCode from "./VerificationCode"
import { userServer } from "../../../../servers/endpoints"

const SignUpVerification = ({ auth, setauth }) => {
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    verificationCode: ""
  })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const verify = () => {
    if (input.verificationCode.length < 6) {
      return present({
        duration: 3000,
        message: "Invalid code!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }

    setLoading(true)
    axios
      .post(userServer + `/verifyEmail`, {
        ...input,
        email: auth?.email
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          localStorage.setItem("accessToken", res?.data.accessToken)
          localStorage.setItem("refreshToken", res?.data.refreshToken)
          setauth({ state: "welcomeForm" })
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        present({
          duration: 3000,
          message: err.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      })
  }

  return (
    <VerificationCode
      HandleChange={HandleChange}
      input={input}
      verify={verify}
      loading={loading}
      email={auth?.email}
    />
  )
}
export default SignUpVerification
