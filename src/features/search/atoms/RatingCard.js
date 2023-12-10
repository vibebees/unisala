import React from "react"
import { IonRow, IonText, IonIcon, IonCol, IonCardSubtitle } from "@ionic/react"
import { star, starHalf } from "ionicons/icons"

const RatingCard = ({ allProps }) => {
  const { overallRating, totalPeopleVoted = 0 } = allProps

  return (
    <IonRow className=" justify-end items-start  m-0 h-fit">
      <IonCol size="auto m-0">
        <IonRow className="items-center m-0">
          <IonText className="text-2xl m-0 font-semibold text-neutral-900">
            4.5
          </IonText>
          <IonCol className="items-end flex mt-1  gap-1 py-px px-2  h-fit ion-no-padding">
            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={starHalf}
              className="text-yellow-500"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            <IonCardSubtitle className="text-sm font-semibold text-gray-600">
              {totalPeopleVoted} Reviews
            </IonCardSubtitle>
          </IonText>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

export default RatingCard
