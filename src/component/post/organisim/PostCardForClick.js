import { IonAvatar, IonCol, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { Avatar } from "../../Avatar"
import { imageOutline } from "ionicons/icons"
import {useEffect, useState} from "react"

export const PostCardForClick = ({allProps = {}}) => {
  const {userInfo = {}} = allProps
  const {userStatus = ""} = userInfo || {}
  const [placeholder, setPlaceholder] = useState("Review university 🏛️ ...")

  useEffect(() => {
    const value = ["looking", "applying"].includes(userStatus)
      ? "Suggest me university 🏛️ ..."
      : "Review university 🏛️ ..."
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
          </IonItem>
        </IonCol>
      </IonItem>
    </div>
  )
}
