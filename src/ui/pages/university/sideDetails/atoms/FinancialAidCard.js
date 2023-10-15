import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"

const FinancialAidCard = ({ value, title, percentage }) => {
  return (
    <div className="bg-neutral-200  bg-opacity-50 hover:scale-105 transition-transform duration-700 ease-linear rounded-lg py-2 px-3">
      <IonText
        style={{
          textAlign: "center"
        }}
        color="dark"
      >
        <h2 className="text-sm">{title}</h2>
      </IonText>
      <IonText style={{ textAlign: "center" }} color="dark">
        <IonText className="">
          <h1 className="my-1 text-neutral-700 text-lg font-semibold">
            {value.toString() === "-1" ? "NAN" : useIsData(value)}{" "}
            {percentage && (
              <span className="font-normal text-base ml-1">
                ({percentage}%)
              </span>
            )}
          </h1>
        </IonText>
      </IonText>
    </div>
  )
}

export default FinancialAidCard
