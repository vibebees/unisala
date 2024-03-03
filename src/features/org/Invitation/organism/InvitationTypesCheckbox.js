import React from "react"
import { IonCol, IonText, IonRow, IonRadioGroup } from "@ionic/react"
import InvitationType from "../atoms/InvitationType"

const InvitationTypesCheckbox = ({ allProps }) => {
  const { admin, invitationType, setInvitationType } = allProps

  const handleCheckbox = (e) => {
    setInvitationType(e.target.value)
  }

  return (
    <IonCol className="flex w-full my-3 ion-no-margin ion-no-padding h-full flex-col ">
      <IonText className="ion-no-margin mt-3">
        <h1 className="text-base font-semibold text-neutral-800">
          Select Invitation Type
        </h1>
      </IonText>
      <IonRow className="mt-3 ">
        <IonRadioGroup
          allowEmptySelection={false}
          className="flex flex-row gap-6"
          value={invitationType}
        >
          {admin && (
            <InvitationType
              allProps={{
                handleCheckbox,
                invitationType,
                label: "Members",
                value: "member"
              }}
            />
          )}
          <InvitationType
            allProps={{
              handleCheckbox,
              invitationType,
              label: "Student",
              value: "student"
            }}
          />
          <InvitationType
            allProps={{
              handleCheckbox,
              invitationType,
              label: "Alumini",
              value: "alumini"
            }}
          />
        </IonRadioGroup>
      </IonRow>
    </IonCol>
  )
}

export default InvitationTypesCheckbox
