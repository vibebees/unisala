import { useState } from "react"
import {
  IonItem,
  IonList,
  IonSearchbar,
  IonIcon,
  IonSelect,
  IonSelectOption
} from "@ionic/react"
import { star, starOutline } from "ionicons/icons"
import { global } from "../../../../../mockData/utils"

export function ProfessorFilter({
  setFilterMajors,
  filterRating,
  setFilterRating,
  setPage
}) {
  // const { subjects } = global
  // let [results, setResults] = useState([...subjects]),
  //   [displayList, setDisplayList] = useState(false)

  // const handleChange = (ev) => {
  //   let query = ""
  //   const { target } = ev
  //   if (target) query = target.value.toLowerCase()
  //   if (displayList) setDisplayList(true)
  //   setResults(subjects.filter((d) => d.toLowerCase().indexOf(query) > -1))
  // }

  return (
    <div className="search-control">
      <div className="field-search-field">
        <IonSelect
          interface="popover"
          placeholder="Select Majors"
          className="select-field"
          onIonChange={(e) => {
            setFilterMajors(e.detail.value)
            if (e.detail.value === "Any") {
              setFilterMajors("")
              setPage(0)
            }
          }}
        >
          <IonSelectOption value="Any">Any</IonSelectOption>
          <IonSelectOption value="Arts">Arts</IonSelectOption>
          <IonSelectOption value="Mathematics">Mathematics</IonSelectOption>
          <IonSelectOption value="Computer Science">
            Computer Science
          </IonSelectOption>
        </IonSelect>

        <div>
          {[1, 2, 3, 4, 5].map((index) => (
            <IonIcon
              key={index}
              style={{
                color: "#F8B64C",
                margin: "0 3px",
                padding: "0",
                fontWeight: "bold",
                fontSize: "25px",
                cursor: "pointer"
              }}
              onClick={() => {
                if (index === filterRating) setFilterRating(0)
                else {
                  setFilterRating(index)
                  setPage(0)
                }
              }}
              icon={index <= filterRating ? star : starOutline}
            />
          ))}
        </div>

        {/* <IonSearchbar
          animated={true}
          debounce={1000}
          placeholder="Computer Science"
          onIonChange={(ev) => handleChange(ev)}
        ></IonSearchbar>
        {dropDownOptions && (
          <IonList>
            {results.map((result, index) => {
              if (index > 3) {
                return <IonItem key={index}>{result}</IonItem>
              }
              return ""
            })}
          </IonList>
        )} */}
      </div>
    </div>
  )
}
