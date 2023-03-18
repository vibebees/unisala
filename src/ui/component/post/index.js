import { IonCol, IonIcon, IonItem, IonAvatar, IonLabel } from "@ionic/react"
import { imageOutline } from "ionicons/icons"

export const Post = () => {
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
          <img src={"https://tinyurl.com/3pw9xh8d"} />
        </IonAvatar>
        <input
          type="text"
          placeholder="Start a thread"
          className="searchInput"
        />

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
export default Post
