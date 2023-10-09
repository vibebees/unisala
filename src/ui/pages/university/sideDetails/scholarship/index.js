import React from "react"
import { shieldOutline, chevronDownOutline } from "ionicons/icons"
import { useSelector } from "react-redux"
import {
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react"
import ScholarshipCard from "../atoms/ScholarshipCard"

const index = () => {
  const { uniData, sidebar } = useSelector((store) => store?.university)

  const scholarships = uniData?.scholarshipInfo?.scholarships

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
        Scholarship
      </h2>
      <IonCardContent key={index} class="w-full">
        <IonGrid className="w-full gap-3  flex flex-wrap">
          {scholarships.map((item, index) => {
            return (
              <ScholarshipCard
                key={index}
                item={item}
                className="w-full"
                style={{
                  flex: "1 1 40%"
                }}
              />
            )
          })}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}

export default index
