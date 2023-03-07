import { useState } from "react"
import { IonButton } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { AcceptConnectRequest, RemoveConnectRequest } from "../../../../../graphql/user/"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function RequestReceivedButton({ user }) {
  const [decline, setDecline] = useState(false)
  const [accept, setAccept] = useState(false)

  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.removeConnectRequest.success) {
        setDecline(true)
      }
    }
  })

  const [acceptConnectRequest] = useMutation(AcceptConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.acceptConnectRequest.success) {
        setAccept(true)
      }
    }
  })

  if (accept) {
    return (
      <IonButton
        color="primary"
        mode="ios"
        className="outline-button"
        expand="block"
        disabled={true}
      >
        Accepted
      </IonButton>
    )
  }

  if (decline) {
    return (
      <IonButton
        color="primary"
        mode="ios"
        className="outline-button"
        expand="block"
        disabled={true}
      >
        Declined
      </IonButton>
    )
  }

  return (
    (!decline || !accept) && (
      <>
        <IonButton
          color="primary"
          mode="ios"
          className="outline-button"
          expand="block"
          onClick={() => {
            acceptConnectRequest({
              variables: { requestorId: user.user._id }
            })
          }}
        >
          Accept
        </IonButton>

        <IonButton
          color="dark"
          mode="ios"
          className="outline-button"
          expand="block"
          fill="outline"
          disabled={decline}
          onClick={() => {
            removeConnectRequest({
              variables: { connecteeId: user.user._id }
            })
          }}
        >
          Decline
        </IonButton>
      </>
    )
  )
}

export default RequestReceivedButton
