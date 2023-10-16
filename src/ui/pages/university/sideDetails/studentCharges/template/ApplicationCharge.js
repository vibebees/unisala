import React from "react"
import SingleApplicatonCharge from "../atoms/SingleApplicatonCharge"
import SingleApplicationChargeLabel from "../atoms/SingleApplicationChargeLabel"

import { IonCol, IonGrid, IonRow } from "@ionic/react"

const ApplicationCharge = ({ allProps }) => {
  const { studentCharges } = allProps

  return (
    <IonGrid>
      <IonCol className="w-full flex justify-start gap-4 mt-3">
        <IonRow className=" flex flex-col gap-2">
          <SingleApplicationChargeLabel
            data={studentCharges.combinedChargeForRoomAndBoard}
            label={"Combined charges for Room and Board"}
          />
          <SingleApplicationChargeLabel
            data={studentCharges.graduateApplicationFee}
            label={"Graduate Application Fee"}
          />
          <SingleApplicationChargeLabel
            data={studentCharges.undergraduateApplicationFee}
            label={"Undergraduate Application Fee"}
          />
        </IonRow>
        <IonRow className=" flex flex-col gap-2">
          <SingleApplicatonCharge
            data={studentCharges.combinedChargeForRoomAndBoard}
          />
          <SingleApplicatonCharge
            data={studentCharges.graduateApplicationFee}
          />
          <SingleApplicatonCharge
            data={studentCharges.undergraduateApplicationFee}
          />
        </IonRow>
      </IonCol>
    </IonGrid>
  )
}

export default ApplicationCharge
