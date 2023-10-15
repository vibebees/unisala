import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"
const StudentChargeCard = ({ header, value, subHeader }) => {
  return (
    <>
      <div className="bg-neutral-200 w-fit bg-opacity-50  hover:scale-105 transition-transform duration-700 ease-linear  rounded-lg py-2 px-3">
        <IonText
          style={{
            textAlign: "center"
          }}
          color="dark"
        >
          <h2 className="text-sm">{header}</h2>
        </IonText>
        <IonText style={{ textAlign: "center" }} color="dark">
          <IonText className="">
            <h1 className="my-1 text-neutral-700 text-lg font-semibold">
              {value.toString() === "-1" ? "" : "$"}
              {useIsData(value)}
            </h1>
          </IonText>
        </IonText>
        <IonText style={{ textAlign: "center" }} color="medium">
          <p className="text-xs">{subHeader}</p>
        </IonText>
      </div>
    </>
  )
}

export default StudentChargeCard
