import React from "react"
import { IonItem, IonLabel } from "@ionic/react"

const ModalListcard = ({ title, value }) => {
  return (
    <IonItem>
      <div className="flex flex-col py-2">
        <IonLabel>{title}</IonLabel>
        <span className="!text-sm tracking-wide mt-1 text-neutral-500">
          {value}
        </span>
      </div>
    </IonItem>
  )
}

export default ModalListcard
