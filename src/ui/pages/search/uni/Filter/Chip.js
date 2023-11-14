import { IonChip, IonIcon, IonLabel } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import React from "react"

const Chip = () => {
  return (
    <IonChip>
      <IonLabel className="text-xs text-black font-medium">hehehehhe</IonLabel>
      <IonIcon icon={closeOutline} />
    </IonChip>
  )
}

export default Chip
