import React from "react"
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
import TotalAdmissions from "../molecules/TotalAdmissions"
import { useSelector } from "react-redux"
import { ellipsisVerticalCircleOutline } from "ionicons/icons"
import AdmissionEmployees from "../molecules/AdminssionEmployees"
import SeeMoreModal from "../../src/molecules/SeeMoreModal"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const data = uniData?.admissionInfo

  const ModalButton = (
    <IonIcon
      style={{
        fontSize: "22px",
        alignSelf: "center"
      }}
      className="ion-icon text-neutral-500"
      icon={ellipsisVerticalCircleOutline}
    />
  )

  const ModalData = (
    <div>
      <IonList>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Admission Test Score</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.admissionTestScores}
            </span>
          </div>
        </IonItem>
        <IonItem className="flex flex-col">
          <div className="flex flex-col py-2">
            <IonLabel>college pre program</IonLabel>
            <span className="!text-sm mt-1 tracking-wide text-neutral-500">
              {data.collegePrepProgram}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Competencies</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.competencies}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Open Admission policy</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.openAdmissionPolicy}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Recommendations</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.recommendations}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>School Record</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.schoolRecord}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Secondary School GPA</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.secondarySchoolGPA}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Secondary School Rank</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.secondarySchoolRank}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Tofel</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {data.toefl}
            </span>
          </div>
        </IonItem>
      </IonList>
    </div>
  )

  return (
    <>
      <IonCard
        style={{
          margin: "10px 0px 0px 0px"
        }}
        className="flex flex-col"
      >
        <div className="font-normal flex items-center bg-neutral-100  border-b border-neutral-300 text-neutral-700 px-2 text-lg py-3">
          <IonText color="dark">
            <h1 className="px-2">Admission</h1>
          </IonText>

          <IonCardContent style={{ display: "flex", padding: "0 12px" }}>
            <SeeMoreModal ModalButton={ModalButton} ModalData={ModalData} />
          </IonCardContent>
        </div>

        <section className="grid grid-cols-2 gap-4">
          <IonCardContent key={index} class="w-full">
            <h2 className="!text-xl pl-6">Total Admission </h2>
            <TotalAdmissions data={data.admissions} />
          </IonCardContent>
          <IonCardContent key={index} class="w-full">
            <h2 className="!text-xl pl-6">Applicants </h2>
            <TotalAdmissions data={data.applicants} />
          </IonCardContent>
        </section>
        <hr />
        <br />
        <IonCardContent key={index} class="w-full">
          {/* <h2 className="!text-xl pl-6 border">Enrolles </h2> */}
          <section className="grid grid-cols-2 gap-4 ">
            <section>
              <h2 className="!text-xl pl-6">Full Time Enrolles </h2>
              <AdmissionEmployees data={data.enrollees.fullTime} />
            </section>

            <section>
              <h2 className="!text-xl pl-6">Part Time Enrolles </h2>
              <AdmissionEmployees data={data.enrollees.partTime} />
            </section>
          </section>
        </IonCardContent>
        <hr />
      </IonCard>
    </>
  )
}

export default index
