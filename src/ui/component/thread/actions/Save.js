import { IonIcon, IonButtons, useIonToast } from "@ionic/react"
import { bookmark } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { SavePost } from "../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../servers/types"

function Save({ postId }) {
  const [present, dismiss] = useIonToast()
  const [save] = useMutation(SavePost, {
    variables: { postId },
    context: { server: USER_SERVICE_GQL },
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Saved",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
  })
  return (
    <IonButtons className="post-button" onClick={save}>
      <IonIcon
        color="medium"
        style={{
          margin: "0px",
          fontSize: "23px"
        }}
        icon={bookmark}
      />
    </IonButtons>
  )
}

export default Save
