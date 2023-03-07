import { useState } from "react"
import { IonButton } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { RemoveConnectRequest } from "../../../../../graphql/user/"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function PendingRequestButton({ user }) {
  const [cancel, setCancel] = useState(false)

  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.removeConnectRequest.success) {
        setCancel(true)
      }
    }
  })

  return (
    <IonButton
      color="dark"
      mode="ios"
      className="outline-button"
      expand="block"
      fill="outline"
      disabled={cancel}
      onClick={() => {
        removeConnectRequest({
          variables: { connecteeId: user.user._id }
        })
      }}
    >
      {cancel ? "Canceled" : "Cancel"}
    </IonButton>
  )
}

export default PendingRequestButton
