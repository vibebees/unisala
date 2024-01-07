import React from "react"
import { copyOutline } from "ionicons/icons"
import { IonIcon, IonItem, IonLabel, useIonToast } from "@ionic/react"

const CopyLink = ({ link }) => {
  const [present, dismiss] = useIonToast()
  return (
    <IonItem
      lines="none"
      button
      onClick={() => {
        navigator.clipboard.writeText(link)
        present({
          message: "Link Copied",
          duration: 2000,
          position: "bottom",
          color: "success"
        })
      }}
      className="ion-no-margin hover:bg-opacity-70  ion-no-padding"
    >
      <IonIcon style={{ fontSize: "25px" }} slot="start" icon={copyOutline} />
      <IonLabel>Copy Link</IonLabel>
    </IonItem>
  )
}

export default CopyLink
