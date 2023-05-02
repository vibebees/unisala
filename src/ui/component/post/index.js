import { IonCol, IonIcon, IonItem, IonAvatar, IonLabel } from "@ionic/react"
import { imageOutline } from "ionicons/icons"
import { useSelector } from "react-redux"
import { Avatar } from "../Avatar"
import { useEffect, useState } from "react"
import { awsBucket, bucketName } from "../../../servers/s3.configs"

export const Post = () => {
  const { user } = useSelector((state) => state.userProfile)
  const [profilePic, setProfilePic] = useState("")

  useEffect(() => {
    // Specify the file key of the image you want to retrieve
    const params = { Bucket: bucketName("user"), Key: user?.picture }

    awsBucket("user").getObject(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // Set the retrieved image data in state
        setProfilePic(data.Body)
      }
    })
  }, [])
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
          <Avatar username={user.username} profilePic={profilePic} />
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
