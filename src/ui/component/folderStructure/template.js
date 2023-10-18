import React from "react"
import {
  IonLabel,
  IonIcon,
  IonItem,
  IonCol,
  IonList,
  IonText
} from "@ionic/react"
import { shieldOutline, chevronDownOutline } from "ionicons/icons"
import Modal from "./modal"

// Atoms

function LabelAtom({ children = "" }) {
  return <IonLabel>{children}</IonLabel>
}

function IconAtom({ icon, className = "" }) {
  return <IonIcon className={className} icon={icon} />
}

// Molecules

function ScholarshipDetailItem(allProps) {
  const { label = "", value = "" } = allProps
  return (
    <IonItem>
      <div className="flex flex-col py-2">
        <LabelAtom>{label}</LabelAtom>
        <span className="!text-sm tracking-wide mt-1 text-neutral-500">
          {value}
        </span>
      </div>
    </IonItem>
  )
}

function SeeMoreButton() {
  return (
    <div className="px-2  flex justify-center">
      <IconAtom
        className="text-lg pt-1 opacity-60 group-hover:opacity-100 text-center"
        icon={chevronDownOutline}
      />
    </div>
  )
}

// Organism

export const Folder = ({ allProps }) => {
  const {
      level = "",
      act = { min: "", max: "" },
      awards = [],
      sat = { min: "", max: "" },
      icon = shieldOutline,
      iconSize = 9,
      routing,
      folderSize = `text-${iconSize}xl text-blue-400`
      // eslint-disable-next-line camelcase
      // eslint-disable-next-line camelcase
    } = allProps,
    name = allProps?.scholarship_name || allProps?.name,
    nonScoreElegibilityReq = allProps?.non_score_eligibility_requirements || "",
    scholarshipUrl = allProps?.scholarship_url || ""

  const ModalData = (
    <div>
      <IonList>
        <ScholarshipDetailItem label="Scholarship Name" value={name} />
        <ScholarshipDetailItem label="Level" value={level} />
        <ScholarshipDetailItem
          label="ACT Score"
          value={`${act.min} - ${act.max}`}
        />

        <IonItem>
          <div className="flex flex-col py-2">
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
                {awards.map((award, index) => (
                  <tr key={index}>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.award_name}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.scholarship_amount.amount}
                    </td>
                    <td className="border text-center py-2 text-sm px-2">
                      {award.scholarship_amount.disbursement_schedule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </IonItem>

        <ScholarshipDetailItem
          label="GPA Score"
          value={`${sat.min} - ${sat.max}`}
        />
        <ScholarshipDetailItem
          label="Non Score Eligibility Requirements"
          value={nonScoreElegibilityReq}
        />

        <IonItem>
          <div className="flex flex-col py-2">
            <IonLabel>Scholarship URL</IonLabel>
            <span className="!text-sm tracking-wide mt-1 text-neutral-500">
              <a
                href={scholarshipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {scholarshipUrl}
              </a>
            </span>
          </div>
        </IonItem>
      </IonList>
    </div>
  )

  return (
    <>
      <IonCol className="h-48 bg-neutral-50 px-0 shadow-md rounded-md flex justify-center flex-col items-center w-40 shrink-0 m-0">
        <IconAtom icon={icon} className={folderSize} />
        <div>
          <h3 className="text-center px-2 leading-5 text-lg !font-semibold text-neutral-700">
            {name}
          </h3>
          <p className="text-center !text-xs capitalize">{level}</p>
        </div>
        {!routing && (
          <div className="border-t mt-3 cursor-pointer w-full group hover:bg-neutral-100 border-neutral-200">
            <Modal
              ModalButton={SeeMoreButton()}
              ModalData={ModalData}
              scholarshipName={name}
            />
          </div>
        )}
      </IonCol>
    </>
  )
}

