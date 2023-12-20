import React from "react"
import { IonRow, IonText, IonIcon, IonLabel } from "@ionic/react"
import { cashOutline } from "ionicons/icons"

const ApplicationCharges = ({ undergraduateApplicationFee = null }) => {
  if (undergraduateApplicationFee === null) return null
  return (
    <IonRow className="ion-no-padding pl-1 mt-3 ">
      <IonIcon className="ion-icon text-primar text-lg" icon={cashOutline} />
      <IonLabel className="pl-2">
        <IonText className="text-sm font-semibold text-gray-600">
          Application Charges : ${undergraduateApplicationFee}
        </IonText>
      </IonLabel>
      <IonLabel className="pl-2">
        <IonText className="text-sm before:bottom-0 before:top-[9px] before:-left-4 ml-4 before:rounded-full before:absolute relative before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 font-semibold text-gray-600">
          Tution Fee : ${undergraduateApplicationFee}
        </IonText>
      </IonLabel>
      <IonLabel className="pl-2">
        <IonText className="text-sm before:bottom-0 before:top-[9px] before:-left-4 ml-4 before:rounded-full before:absolute relative before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 font-semibold text-gray-600">
          Cost of Attendence : ${undergraduateApplicationFee}
        </IonText>
      </IonLabel>
    </IonRow>
  )
}

export default ApplicationCharges
