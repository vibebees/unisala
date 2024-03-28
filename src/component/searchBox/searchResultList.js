import { IonItem, IonLabel } from "@ionic/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { universityDefaultImage } from "servers/s3.configs"

export const SearchBarResultList = ({ item, key, setShow }) => {
  const [profileImage, setProfileImage] = useState(
    item?.pictures?.[0] || item?.picture || universityDefaultImage
  )

  let link

  switch (item.type) {
    case "user":
      link = `profile${"Test"}`
      break
    case "university":
      link = `/university/${item?.name}`
      break
    case "org":
      link = `/org/${item?.name}`
      break

    case "space":
      link = `/space/${item?.name}`
      break
    default:
      return
  }

  return (
    <Link
      to={link}
      key={key}
      onClick={() => {
        const recentSearches =
          JSON.parse(localStorage.getItem("recentSearch")) ?? []
        console.log({ recentSearches })
        localStorage.setItem(
          "recentSearch",
          JSON.stringify([item, ...recentSearches])
        )

        setShow(false)
      }}
    >
      <IonItem key={key}>
        {/* <IonAvatar slot="start">
          <img
            src={
              profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcCCJKE3QoYsKTUblewvIWujVUQWpsd7BhA&usqp=CAU"
            }
          />
        </IonAvatar> */}
        <IonLabel>
          <h2 className="m-0 capitalize">{item?.name}</h2>
          <h5 className="bg-[#eee] opacity-75 w-fit px-2">{item?.type}</h5>
        </IonLabel>
      </IonItem>
    </Link>
  )
}

