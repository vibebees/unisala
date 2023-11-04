import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText
} from "@ionic/react"
import "./index.css"
import { useEffect, useRef, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "../../../../../servers/types"
import { UniFilterResults, UniSearchDataList } from "../../../../../graphql/uni"
import { searchGetSuccess } from "../../../../../store/action"
import { useDispatch } from "react-redux"
import { statesArray } from "utils/lib/states"

import Select from "react-select"

import { useLocation } from "react-router"
function index() {
  const SAT_SCORES = [
    {
      min: 400,
      max: 600
    },
    {
      min: 600,
      max: 800
    },
    {
      min: 800,
      max: 1000
    },
    {
      min: 1000,
      max: 1200
    },
    {
      min: 1200,
      max: 1400
    },
    {
      min: 1400,
      max: 1600
    }
  ]

  const ACT_SCORE = [
    {
      min: 8,
      max: 12
    },
    {
      min: 12,
      max: 16
    },
    {
      min: 16,
      max: 20
    },
    {
      min: 24,
      max: 28
    },
    {
      min: 28,
      max: 32
    },
    {
      min: 32,
      max: 36
    }
  ]

  const INITIAL_QUERY_DATA = {
    satScore: { min: 0, max: 0 },
    actScore: { min: 0, max: 0 },
    page: 1,
    pageSize: 10,
    state: ""
  }

  const [sat, setSat] = useState("Sat Score")
  const [act, setAct] = useState("Act Score")
  const selectInputRef = useRef()
  const [isFiltered, setIsFiltered] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [queryData, setQueryData] = useState(INITIAL_QUERY_DATA)
  const [getScholarship, { data, loading }] = useLazyQuery(UniFilterResults, {
    context: { server: UNIVERSITY_SERVICE_GQL }
  })
  const dispatch = useDispatch()

  const handleData = (e, identify) => {
    // indicate that filtered is applied

    setIsFiltered(true)
    let value
    if (identify === "state") {
      value = e?.label
      if (!value) return
    } else {
      value = e.detail.value
    }

    if (identify === "satScore") {
      setSat(`${value.min} - ${value.max}`)
    }
    if (identify === "actScore") {
      setAct(`${value.min} - ${value.max}`)
    }

    setQueryData((prev) => ({
      ...prev,
      [identify]: value
    }))
    getScholarship({ variables: { ...queryData, [identify]: value } })
  }

  useEffect(() => {
    dispatch(searchGetSuccess(data?.searchScholarship?.scholarships))
  }, [data])

  const customStyles = {
    menuList: (styles) => ({
      ...styles
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100
    })
  }

  // if filter is removed refetch the searchSchool query
  // it wont refetch as the data is already available in the cache(tested)

  const [GetUni] = useLazyQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    skip: true
  })

  const removeFilter = async () => {
    setQueryData(INITIAL_QUERY_DATA)
    setSat("Sat Score")
    setAct("Act Score")

    selectInputRef.current.clearValue()
    const searchValue = queryParams.get("q")
    const { data } = await GetUni({ variables: { name: searchValue } })

    dispatch(searchGetSuccess(data?.searchSchool))
    setIsFiltered(false)
  }
  return (
    <>
      <IonCard className="filter-card-wrapper relative">
        {isFiltered ? (
          loading ? (
            <IonSpinner name="crescent"></IonSpinner>
          ) : (
            <IonButton
              className=" relative right-0 text-right"
              size="small"
              fill="outline"
              onClick={removeFilter}
            >
              Remove Filters
            </IonButton>
          )
        ) : (
          <IonText className="p-2 text-lg" color={"primary"}>
            Showing results for: {queryParams.get("q")}
          </IonText>
        )}
        <IonCardContent>
          {/* <div className="search-control">
          <h2 className="search-control__label">College Type</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>4 Year</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Private</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Public</IonLabel>
          </div>

          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>2 Year</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Community</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Trade/career</IonLabel>
          </div>
          <div className="field search-field__indented">
            <IonCheckbox slot="start" />
            <IonLabel>Other</IonLabel>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Majors</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="Any">Any</IonSelectOption>
              <IonSelectOption value="Agricultural Science">
                Agricultural Science
              </IonSelectOption>
              <IonSelectOption value="Art">Art</IonSelectOption>
              <IonSelectOption value="Architecture">
                Architecture
              </IonSelectOption>
            </IonSelect>
          </div>
        </div> */}

          <div className="search-control z-40">
            <IonLabel>States</IonLabel>
            <Select
              options={statesArray}
              isSearchable
              ref={selectInputRef}
              placeholder={"Select a state"}
              onChange={(e) => handleData(e, "state")}
              styles={customStyles}
            />
          </div>

          {/* <div className="search-control">
          <h2 className="search-control__label">Online friendliness</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Fully online</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Large online program</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Some online degrees</IonLabel>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Cost (net price)</h2>
          <IonLabel>Select a value</IonLabel>
          <IonRange pin={true} pinFormatter={(value) => `${value}%`}></IonRange>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Student body size</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Small</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Medium</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Large</IonLabel>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Specialty</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Liberal arts</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>All-women</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>All-men</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>HBCU</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Hispanic-serving institutions</IonLabel>
          </div>
        </div> */}

          <div className="search-control">
            <h2 className="search-control__label mb-4">Test scores</h2>
            <IonLabel>SAT:</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={sat}
              className="select-field"
              onIonChange={(e) => handleData(e, "satScore")}
            >
              {SAT_SCORES.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.min} - {val.max}
                </IonSelectOption>
              ))}
            </IonSelect>

            <IonLabel>ACT:</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={act}
              className="select-field"
              onIonChange={(e) => handleData(e, "actScore")}
            >
              {ACT_SCORE.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.min} - {val.max}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          {/* <div className="search-control">
          <h2 className="search-control__label">Admission process</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="No Application Fee">
                No Application Fee
              </IonSelectOption>
              <IonSelectOption value="Accepts Common App">
                Accepts Common App
              </IonSelectOption>
              <IonSelectOption value="Test-Optional">
                Test-Optional
              </IonSelectOption>
              <IonSelectOption value="Offers Early Decision">
                Offers Early Decision
              </IonSelectOption>
              <IonSelectOption value="Offers Early Action">
                Offers Early Action
              </IonSelectOption>
              <IonSelectOption value="Rolling Admission">
                Rolling Admission
              </IonSelectOption>
            </IonSelect>
          </div>
        </div>

        <div className="search-control">
          <h2 className="search-control__label">Selectivity</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Extremely selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Very selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Selective</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Average</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Not selective</IonLabel>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Religious affiliation</h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="catholic">Catholid</IonSelectOption>
              <IonSelectOption value="christian">Christian</IonSelectOption>
              <IonSelectOption value="jewish">Jewish</IonSelectOption>
            </IonSelect>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">Good for</h2>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Veterans</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>International students</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Adult learners</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Low-income students</IonLabel>
          </div>
          <div className="field search-field">
            <IonCheckbox slot="start" />
            <IonLabel>Middle-class students</IonLabel>
          </div>
        </div> */}

          {/* <div className="search-control">
          <h2 className="search-control__label">
            Starting salary after graduation
          </h2>
          <div className="field search-field">
            <IonSelect
              interface="popover"
              placeholder="Any"
              className="select-field"
            >
              <IonSelectOption value="any">Any</IonSelectOption>
              <IonSelectOption value="$65,000+">$65,000+</IonSelectOption>
              <IonSelectOption value="$55,000+">$55,000+</IonSelectOption>
              <IonSelectOption value="$45,000+">$45,000+</IonSelectOption>
              <IonSelectOption value="$35,000+">$35,000+</IonSelectOption>
              <IonSelectOption value="$25,000+">$25,000+</IonSelectOption>
            </IonSelect>
          </div>
        </div> */}
        </IonCardContent>
      </IonCard>
    </>
  )
}

export default index

