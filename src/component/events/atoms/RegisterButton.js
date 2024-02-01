import React, { useState } from "react"
import { IonButton, useIonToast, IonSpinner } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { RegisterUserEvent } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { useSelector } from "react-redux"

const RegisterButton = ({ eventId, event, setIntresedUsers }) => {
  const { isRegistered } = event
  const { user } = useSelector((store) => store?.userProfile)
  const [isRegisteredUser, setIsRegisteredUser] = useState(isRegistered)
  const [present, dismiss] = useIonToast()
  const [RegisterUnRegisterUser, { loading }] = useMutation(RegisterUserEvent, {
    context: { server: USER_SERVICE_GQL },

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
        if (isRegisteredUser) {
          setIsRegisteredUser(false)
          setIntresedUsers((prev) => prev.slice(1))
        } else {
          setIsRegisteredUser(true)
          setIntresedUsers((prev) => [...prev, user])
        }
        // setIntresedUsers((prev) => [...prev, user])
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
    if (isRegisteredUser) {
      RegisterUnRegisterUser({
        variables: {
          userId: user._id,
          eventId,
          type: "unregistered"
        }
      })
    } else {
      RegisterUnRegisterUser({
        variables: {
          userId: user._id,
          eventId
        }
      })
    }
  }
  return (
    <IonButton
      disabled={loading}
      expand="block"
      color={isRegisteredUser ? "success" : "primary"}
      onClick={handleRegister}
    >
      {isRegisteredUser ? "Registered" : "Register"}

      {loading && <IonSpinner name="lines"></IonSpinner>}
    </IonButton>
  )
}

export default RegisterButton
