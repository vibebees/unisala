import React from "react"
import { IonCard, IonCardContent, IonText } from "@ionic/react"
import SeeMoreModal from "ui/component/Reusable/Modal"
import StatCard from "../organism/StatCard"
import ModalData from "../molecules/ModalData"
import SeeMoreButton from "ui/component/Reusable/Buttons/SeeMoreButton"
import CardHeader from "ui/component/Reusable/cardHeader"

const StatCardTemplate = ({ allProps }) => {
  const { data, bodyTitle = "" } = allProps
  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader
        header={bodyTitle}
        child={
          <SeeMoreModal
            ModalData={<ModalData />}
            ModalButton={<SeeMoreButton />}
          />
        }
      />

      <section className="grid grid-cols-2 gap-4">
        <StatCard data={data.admissions} label={"Admission Rate"} />
        <StatCard data={data.admissions} label={"Applicants"} />
      </section>
    </IonCard>
  )
}

export default StatCardTemplate
