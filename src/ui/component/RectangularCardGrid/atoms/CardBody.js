import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "hooks/useIsData"

const CardBody = ({ value, percentage }) => {
  return (
    <IonText style={{ textAlign: "center" }} color="dark">
      <IonText className="">
        <h1 className="my-1 text-neutral-700 text-lg font-semibold">
          {value.toString() === "-1" ? "N/A" : useIsData(value)}{" "}
          {percentage && (
            <span className="font-normal text-base ml-1">({percentage}%)</span>
          )}
        </h1>
      </IonText>
    </IonText>
  )
}

export default CardBody
