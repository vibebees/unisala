import React from "react"
import useIsData from "../../../../hooks/useIsData"
import useCountConverter from "../../../../hooks/useCountConverter"
import { IonCard, IonLabel, IonText } from "@ionic/react"

const Card = ({ image, value, title }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="border bg-neutral-100 rounded-md hover:bg-transparent"
    >
      <div className="rounded-rectangle">
        <img
          alt=""
          src={image}
          style={{
            width: "50px"
          }}
          className="mix-blend-multiply"
        />
        <IonText color="dark" className="">
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
    </div>
  )
}

export default Card
