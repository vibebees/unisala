import { IonChip, IonIcon, IonLabel } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import React from "react"

const Chip = ({ label, removeSpeceficFilter }) => {
  return (
    <IonChip>
      <IonLabel className="text-xs text-black font-medium">{label}</IonLabel>
      <IonIcon
        onClick={() => removeSpeceficFilter(label)}
        icon={closeOutline}
      />
    </IonChip>
  )
}

export default Chip
