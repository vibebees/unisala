import React from "react"
import useIsData from "hooks/useIsData"
import useCountConverter from "hooks/useCountConverter"
import { IonCard, IonLabel, IonText } from "@ionic/react"

const Card = ({ image, value, title }) => {
  return (
    <IonCard
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="border  ion-padding  m-0 hover:bg-neutral-50 rounded-md hover:bg-transparent"
    >
      <div className="rounded-rectangle flex flex-col items-center ">
        <img
          alt=""
          src={image}
          style={{
            width: "50px"
          }}
          className="mix-blend-multiply"
        />

        <IonText color="dark" className="text-center ">
          <h1
            style={{
              fontSize: "25px"
            }}
          >
            {useIsData(value) !== "N/A" && useCountConverter(value) !== "0"
              ? useCountConverter(value) + "+"
              : useIsData(value)}
          </h1>
        </IonText>
        <IonText
          style={{
            textAlign: "center"
          }}
          color="medium"
        >
          <p
            style={{
              fontSize: "15px"
            }}
          >
            {title}
          </p>
        </IonText>
      </div>
    </IonCard>
  )
}

export default Card
