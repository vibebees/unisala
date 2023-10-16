import React from "react"
import { IonText } from "@ionic/react"

const CardTitle = ({ title }) => {
  return (
    <IonText
      style={{
        textAlign: "center"
      }}
      color="dark"
    >
      <h2 className="text-sm">{title}</h2>
    </IonText>
  )
}

export default CardTitle
