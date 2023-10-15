import { useState } from "react"
import { IonItem, IonList, IonSearchbar, IonIcon } from "@ionic/react"
import { star, starOutline, close } from "ionicons/icons"
import axios from "axios"
import { universityServer } from "../../../../../servers/endpoints"
// import { global } from "../../../../../mockData/utils"

export function ProfessorFilter({
  setFilterMajors,
  filterRating,
  setFilterRating,
  setPage
}) {
  const [results, setResults] = useState([])
  const [majorSearch, setMajorSearch] = useState("")
  const [dropDownOptions, setDropDownOptions] = useState(false)
  const [dropDownLoading, setDropDownLoading] = useState(false)

  const handleChange = (ev) => {
    setDropDownLoading(true)
    const query = ev.target.value
    setMajorSearch(query)
    if (query.length === 0) {
      setDropDownOptions(false)
      setFilterMajors("")
      setPage(0)
    }
    if (query.length < 3) {
      setDropDownOptions(false)
      return
    }
    setDropDownOptions(true)
    axios.get(universityServer + `/keyword/spaces/${query}/5`).then((data) => {
      setDropDownLoading(false)
      setResults(data?.data)
    })
  }

  return (
    <div className="search-control">
      <div className="field-search-field">
        <IonSearchbar
          animated={true}
          debounce={1000}
          placeholder="Search Majors"
          onIonChange={(ev) => handleChange(ev)}
          value={majorSearch}
          onKeyPress={(ev) => {
            if (majorSearch.length > 3 && ev.key === "Enter") {
              setDropDownOptions(false)
              setFilterMajors(majorSearch)
            }
          }}
          style={{
            position: "relative",
            overflow: "inherit"
          }}
        >
          {dropDownOptions && (
            <IonList
              style={{
                zIndex: 1000,
                position: "absolute",
                width: "100%",
                top: "3.5rem",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            >
              {results?.length === 0 && !dropDownLoading && (
                <IonItem>No results</IonItem>
              )}
              {results.length > 0 &&
                results.map((result, index) => {
                  return (
                    <IonItem
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() => {
                        setFilterMajors(result?.name)
                        setDropDownOptions(false)
                      }}
                    >
                      {result?.name}
                    </IonItem>
                  )
                })}
              {dropDownLoading && <IonItem>Loading...</IonItem>}
            </IonList>
          )}
        </IonSearchbar>

        <div
          style={{
            whiteSpace: "nowrap"
          }}
        >
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
          {filterRating > 0 && (
            <IonIcon
              style={{
                color: "#A52A2A",
                margin: "0 3px",
                padding: "0",
                fontWeight: "bold",
                fontSize: "25px",
                cursor: "pointer"
              }}
              onClick={() => {
                setFilterRating(0)
              }}
              icon={close}
            />
          )}
        </div>
      </div>
    </div>
  )
}
