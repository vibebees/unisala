import React from "react"
import { IonText, IonCardContent } from "@ionic/react"

export const CardHeader = ({ header, child = "" }) => {
  return (
    <div className="font-normal flex items-center bg-neutral-100  border-b border-neutral-300 text-neutral-700 px-2 text-lg py-3">
      <IonText color="dark">
        <h1 className="px-2">{header}</h1>
      </IonText>

      <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
        {child}
      </IonCardContent>
    </div>
  )
}


