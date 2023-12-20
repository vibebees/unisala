import React from "react"
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonRow
} from "@ionic/react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"

const ScholarshipCard = ({ scholarship }) => {
  const {
    university,
    scholarshipName,
    level,
    gpaRequirement,
    actRequirement,
    satRequirement,
    scholarshipAmount,
    imageUrl
  } = scholarship

  return (
    <IonCard className="">
      <IonRow className="relative">
        <ImageWithLoader
          src={imageUrl}
          style={{
            height: "150px",
            width: "100%",
            objectFit: "cover"
          }}
          alt={university}
        />
        <IonCardHeader className="ion-no-margin absolute bottom-0 w-full  ion-no-padding bg-black py-2 px-5 bg-opacity-60">
          <IonCardSubtitle className="ion-text-center font-semibold !text-start text-base text-white  ">
            {university}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonRow>

      <IonCardContent>
        <IonCardTitle className="ion-text-start py-2">
          {scholarshipName}
        </IonCardTitle>
        <p>
          <span className="font-semibold">Level:</span> {level}
        </p>
        <p>
          <span className="font-semibold">GPA Requirement:</span>{" "}
          {gpaRequirement}
        </p>
        <p>
          <span className="font-semibold">ACT Requirement:</span>{" "}
          {actRequirement}
        </p>
        <p>
          <span className="font-semibold">SAT Requirement:</span>{" "}
          {satRequirement}
        </p>
        <p>
          <span className="font-semibold">Scholarship Amount:</span>{" "}
          {scholarshipAmount}
        </p>
      </IonCardContent>
    </IonCard>
  )
}

export default ScholarshipCard
