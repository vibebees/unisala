import { IonAvatar, IonCol, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { Avatar } from "../../Avatar"
import { imageOutline } from "ionicons/icons"

export const PostCardForClick = ({ allProps }) => {
  const placeholder = "What's on your mind?"
  const { user } = allProps
  return (
    <div
      style={{
        padding: "2px",
        cursor: "pointer"
      }}
    >
      <IonItem lines="none">
        <IonAvatar
          slot="start"
          style={{
            alignSelf: "center"
          }}
        >
          <Avatar username={user.username} profilePic={user?.picture} />
        </IonAvatar>
        <input type="text" placeholder={placeholder} className="searchInput" />

        <IonCol size="auto">
          <IonItem lines="none">
            <IonIcon icon={imageOutline} />
            <IonLabel className="ion-padding-start">
              <p>Image</p>
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonItem>
    </div>
  )
}
