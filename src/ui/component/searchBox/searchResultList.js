import {IonAvatar, IonItem, IonLabel} from "@ionic/react"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {getImage, universityDefaultImage} from "../../../servers/s3.configs"

export const SearchBarResultList = ({item, key, setDropDownOptions}) => {
  const [profileImage, setProfileImage] = useState(item?.pictures?.[0] || universityDefaultImage)

  console.log({item})
  return (
    <Link
      to={
        item?.username
          ? `/@/${item?.username}`
          : `/university/${item?.elevatorInfo?.name}`
      }
      key={key}
      onClick={() => setDropDownOptions(false)}
    >
      <IonItem
        style={{
          margin: "0px",
          padding: "0px"
        }}
        lines="none"
        key={key}
      >
        <IonAvatar slot="start">
          <img
            src={
              profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcCCJKE3QoYsKTUblewvIWujVUQWpsd7BhA&usqp=CAU"
            }
          />
        </IonAvatar>
        <IonLabel>
          <h2
            style={{
              margin: 0
            }}
          >
            {item?.elevatorInfo?.name || `${item?.firstName} ${item?.lastName}`}
          </h2>
          <p
            style={{
              margin: 0
            }}
          >
            {item?.elevatorInfo?.city || item?.location}
          </p>
        </IonLabel>
      </IonItem>
    </Link>
  )
}
