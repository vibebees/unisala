import React from "react"
import StatisticsEnrollementByRace from "../molecules/StatisticsEnrollementByRace"
import StatisticsAdmission from "../molecules/StatisticsAdmission"
import GraduationRate from "../molecules/GraduateRate"
import { useSelector } from "react-redux"
import statistics from "./statistics.css"
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
  IonList,
  IonText
} from "@ionic/react"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const studentStats = uniData.studentsStats

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <div className="font-normal flex items-center bg-neutral-100  border-b border-neutral-300 text-neutral-700 px-2 text-lg py-3">
        <IonText color="dark">
          <h1 className="px-2">Statistics</h1>
        </IonText>
      </div>
      <section>
        <StatisticsAdmission data={studentStats} />
      </section>
      <section className="px-7 py-7">
        <StatisticsEnrollementByRace data={studentStats.enrollmentByRace} />
      </section>
      <hr />
      <section className="px-7 py-7">
        <GraduationRate data={uniData.graduationRate} />
      </section>
    </IonCard>
  )
}

export default index
