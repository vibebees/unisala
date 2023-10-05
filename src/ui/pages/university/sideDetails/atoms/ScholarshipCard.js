import React from "react"
import { shieldOutline, chevronDownOutline } from "ionicons/icons"
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
import SeeMoreModal from "../../src/molecules/SeeMoreModal"

const ScholarshipCard = ({ item }) => {
  const SeeMoreButton = (
    <div className="px-2 flex justify-center">
      <IonIcon
        className="text-lg pt-1 opacity-60 group-hover:opacity-100 text-center "
        icon={chevronDownOutline}
      />
    </div>
  )

  const ModalData = (
    <div>
      <IonList>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Scholarship Name</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {item.scholarship_name}
            </span>
          </div>
        </IonItem>
        <IonItem className="flex flex-col">
          <div className="flex flex-col py-2">
            <IonLabel>Level</IonLabel>
            <span className="!text-sm mt-1 tracking-wide text-neutral-500">
              {item.level}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>ACT Score</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {item.act.min} - {item.act.max}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col pt-4 b">
            <IonLabel>Awards</IonLabel>
            <table className="mt-4">
              <thead className="border">
                <tr>
                  <th className="border !text-neutral-700 !text-sm font-semibold">
                    Name
                  </th>
                  <th className="border !text-neutral-700 px-2 py-1 !text-sm font-semibold">
                    Scholarship Amount
                  </th>
                  <th className="border !text-neutral-700 py-1 !text-sm font-semibold px-2">
                    Scholarship Distribution
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.awards.map((item, index) => (
                  <tr key={index}>
                    <td className="border text-center py-2 text-sm px-2">
                      {item.award_name}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {item.scholarship_amount.amount}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {item.scholarship_amount.disbursement_schedule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>GPA Score</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {item.sat.min} - {item.sat.max}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Non Score Eligibility Requirements</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              {item.non_score_eligibility_requirements}
            </span>
          </div>
        </IonItem>
        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Scholarship URL</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              <a
                href={item.scholarship_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {item.scholarship_url}
              </a>
            </span>
          </div>
        </IonItem>
      </IonList>
    </div>
  )

  return (
    <>
      <IonCol className="h-48 bg-neutral-50 px-0 shadow-md rounded-md flex justify-center flex-col items-center w-40  shrink-0  ">
        <IonIcon className="text-9xl text-blue-400 " icon={shieldOutline} />
        <div>
          <h3 className="text-center px-2 leading-5 text-lg !font-semibold text-neutral-700">
            {item.scholarship_name}
          </h3>
          <p className="text-center !text-xs capitalize">{item.level}</p>
        </div>
        <div className="border-t mt-3 cursor-pointer w-full group hover:bg-neutral-100 border-neutral-200">
          <SeeMoreModal ModalButton={SeeMoreButton} ModalData={ModalData} />
        </div>
      </IonCol>
    </>
  )
}

export default ScholarshipCard
