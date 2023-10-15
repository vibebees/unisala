import React, { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonIcon,
  IonSearchbar
} from "@ionic/react"
import { chevronBack, chevronForward } from "ionicons/icons"
import ProfessorCard from "../atoms/ProfessorCard"

const Professor = ({ data }) => {
  const [majorSearch, setMajorSearch] = useState("")
  const [newData, setNewData] = useState(data)

  const handleChange = (ev) => {
    const query = ev.target.value
    setMajorSearch(query)
    if (query.length === 0) {
      setNewData(data)
    } else {
      const newData = data.filter((item) =>
        item.professorName.toLowerCase().includes(query.toLowerCase())
      )
      setNewData(newData)
    }
  }

  return (
    <>
      <IonCard
        className="ion-margin-top"
        style={{
          margin: "10px 0px 0px 0px"
        }}
      >
        <IonCardContent>
          <h1>Professors</h1>
        </IonCardContent>
        <div className="field-search-field">
          <IonSearchbar
            animated={true}
            debounce={1000}
            placeholder="Search Majors"
            onIonChange={(ev) => handleChange(ev)}
            value={majorSearch}
            style={{
              position: "relative",
              overflow: "inherit"
            }}
          ></IonSearchbar>
        </div>
        <IonRow>
          {newData?.map((item, index) => {
            return <ProfessorCard data={item} key={index} />
          })}
          <div
            style={{
              borderTop: "1px solid #C4C4C4",
              width: "100%",
              display: "inline-flex",
              cursor: "pointer",
              padding: "8px 0"
            }}
          >
            <IonIcon
              style={{
                fontSize: "25px"
              }}
              icon={chevronBack}
            />
            <IonIcon
              style={{
                fontSize: "25px"
              }}
              icon={chevronForward}
            />
          </div>
        </IonRow>
        {!data?.length === 0 && (
          <IonRow>
            <h1 className="text-center pt-1 pb-1" style={{ width: "100%" }}>
              No data
            </h1>
          </IonRow>
        )}
      </IonCard>
    </>
  )
}

export default Professor
