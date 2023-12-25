import { IonAvatar, IonCol, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { Avatar } from "../../Avatar"
import { imageOutline } from "ionicons/icons"
import {useEffect, useState} from "react"

export const PostCardForClick = ({allProps = {}}) => {
  const {userInfo = {}} = allProps
  const {userStatus = "looking"} = userInfo || {}
  const [placeholder, setPlaceholder] = useState("Suggest me university ...")

  useEffect(() => {
    const value = ["graduated", "studying"].includes(userStatus)
    ? "Review university 🏛️ ..."
      : "Suggest me university 🏛️ ..."
    setPlaceholder(value)
  }, [userStatus])
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
