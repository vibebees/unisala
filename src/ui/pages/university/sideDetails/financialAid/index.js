import React from "react"
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonText,
  IonGrid
} from "@ionic/react"
import FinancialAid from "../molecules/FinancialAid"
import { useSelector } from "react-redux"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const data = uniData?.financialAid

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <div className="font-normal flex items-center bg-neutral-100  border-b border-neutral-300 text-neutral-700 px-2 text-lg py-3">
        <IonText color="dark">
          <h1 className="px-2">Financial Aid Information</h1>
        </IonText>
      </div>

      <IonGrid className="ion-padding w-full">
        <div className="bg-white h-full p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-medium mb-4">
            Financial Aid Information for {uniData?.financialAid.year}
          </h2>

          <IonGrid className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FinancialAid data={data} />
          </IonGrid>
        </div>
      </IonGrid>
    </IonCard>
  )
}

export default index
