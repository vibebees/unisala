import React from "react"
import { useSelector } from "react-redux"
import { IonCard, IonCardContent, IonGrid } from "@ionic/react"
import GrantCard from "../grant/GrantCard"
import StudentCharges from "../templates/StudentCharges"

const index = () => {
  const { uniData, sidebar } = useSelector((store) => store?.university)

  const studentCharges = uniData?.studentCharges

  return (
    <>
      <IonCard
        style={{
          margin: "10px 0px 0px 0px "
        }}
        className="flex flex-col"
      >
        <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
          Student Charges
        </h2>
        <StudentCharges studentCharges={studentCharges} />
      </IonCard>
    </>
  )
}

export default index
