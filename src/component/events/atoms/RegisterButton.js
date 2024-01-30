import React, { useState } from "react"
import { IonButton, useIonToast, IonSpinner } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { RegisterUserEvent } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { useSelector } from "react-redux"

const RegisterButton = ({ eventId, event, setIntresedUsers }) => {
  const { isRegistered } = event
  const { user } = useSelector((store) => store?.userProfile)

  const [present, dismiss] = useIonToast()
  const [buttonDetails, setButtonDetails] = useState(
    isRegistered
      ? {
          text: "Registered",
          color: "success"
        }
      : {
          text: "Register Now",
          color: "primary"
        }
  )
  const [RegisterUser, { loading }] = useMutation(RegisterUserEvent, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      userId: user._id,
      eventId
    },
    onCompleted: (data) => {
      if (data?.registeredUserByEventId?.status?.success) {
        present({
          duration: 3000,
          message:
            data?.registeredUserByEventId?.status?.message ||
            "You are registered successfully",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setButtonDetails({
          text: "Registered",
          color: "success"
        })
        setIntresedUsers((prev) => [...prev, user])
      } else {
        present({
          duration: 3000,
          message:
            data?.registeredUserByEventId?.status?.message ||
            "Something went wrong",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })

        if (data?.registeredUserByEventId?.status?.registered) {
          setButtonDetails({
            text: "Registered",
            color: "danger"
          })
        }
      }
    },
    onError: (error) => {
      present({
        duration: 30000,
        message: error?.message || "Something went wrong",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleRegister = () => {
    RegisterUser()
  }
  return (
    <IonButton
      disabled={loading}
      expand="block"
      color={buttonDetails?.color}
      onClick={handleRegister}
    >
      {buttonDetails?.text} {loading && <IonSpinner name="lines"></IonSpinner>}
    </IonButton>
  )
}

export default RegisterButton
