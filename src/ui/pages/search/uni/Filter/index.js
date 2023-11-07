import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonInput,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  useIonToast
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

  const APPLICATION_FEES = [
    {
      min: 0,
      max: 0
    },
    {
      min: 0,
      max: 20
    },
    {
      min: 20,
      max: 40
    },
    {
      min: 40,
      max: 60
    },
    {
      min: 60,
      max: 80
    },
    {
      min: 80,
      max: 100
    },
    {
      min: 100,
      max: null
    }
  ]

  const INITIAL_QUERY_DATA = {
    sat: null,
    act: null,
    page: 1,
    pageSize: 10,
    state: null,
    major: null,
    graduateApplicationFee: null,
    undergraduateApplicationFee: null,
    undergraduateInStateTuitionFee: null,
    undergraduateOutOfStateTuitionFee: null,
    graduateInStateTuitionFee: null,
    graduateOutOfStateTuitionFee: null,
    undergraduateOnCampusInStateCostOfAttendance: null,
    undergraduateOnCampusOutOfStateCostOfAttendance: null,
    undergraduateOffCampusWithFamilyInStateCostOfAttendance: null,
    undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance: null,
    undergraduateOffCampusNotWithFamilyInStateCostOfAttendance: null,
    undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance: null
  }
  const COA = [
    {
      min: 0,
      max: 5
    },
    {
      min: 5,
      max: 10
    },
    {
      min: 10,
      max: 15
    },
    {
      min: 15,
      max: 20
    },
    {
      min: 20,
      max: null
    }
  ]
  const [present, dismiss] = useIonToast()
  const [sat, setSat] = useState("Sat Score")
  const [act, setAct] = useState("Act Score")
  const [app, setApp] = useState("Application Fee")
  const [coa, setCoa] = useState("COA")
  const [tuition, setTuition] = useState("Tuition Fees")
  const [degree, setDegree] = useState(null)
  const [locationType, setLocationType] = useState(null) // in state or out state
  const [accomodation, setAccomodation] = useState(null)
  const [family, setFamily] = useState(null)
  const [showFamily, setShowFamily] = useState(false)
  const selectInputRef = useRef()
  const [isFiltered, setIsFiltered] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [queryData, setQueryData] = useState(INITIAL_QUERY_DATA)
  const [getScholarship, { data, loading, refetch }] = useLazyQuery(
    UniFilterResults,
    {
      context: { server: UNIVERSITY_SERVICE_GQL }
    }
  )
  const dispatch = useDispatch()

  const handleData = (e, identify) => {
    // indicate that filtered is applied
    let value
    if (identify === "state") {
      value = e?.label
      if (!value) return
    } else {
      value = e.detail.value
    }

    if (identify === "sat") {
      setSat(`${value.min} - ${value.max}`)
    }
    if (identify === "sat") {
      setAct(`${value.min} - ${value.max}`)
    }

    if (identify === "major") {
      value = e.currentTarget.value
    }
    if (identify === "applicationFee") {
      // check if it is for grad or undergrad
      if (degree) {
        identify = `${degree}ApplicationFee`
        let st

        if (value.max === 0) {
          st = "Free"
        } else if (value.max === null) {
          st = "100+"
        } else {
          st = `${value.min} - ${value.max}`
        }
        setApp(st)
      } else {
        present({
          duration: 3000,
          message: "Please select the level of your degree.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
        return
      }

      console.log(value)
    }

    if (identify === "coa") {
      if (!degree && !accomodation && !locationType) {
        present({
          duration: 3000,
          message:
            "Please select the level of your degree, preffered location type and mode of accomodation.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      } else {
        if (value.max === null) {
          setCoa("20k$+")
        } else {
          setCoa(`${value.min} - ${value.max}`)
        }

        if (accomodation === "OnCampus") {
          identify = `${degree}${accomodation}${locationType}CostOfAttendance`

          console.log(identify)
        }
      }
    }
    if (identify === "tuition") {
      if (degree && locationType) {
        identify = `${degree}${locationType}TuitionFee`
        console.log(identify)

        if (value.max === null) {
          setTuition("20k$+")
        } else {
          setTuition(`${value.min} - ${value.max}`)
        }
      } else {
        present({
          duration: 3000,
          message:
            "Please select the level of your degree and preffered tuition type.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
        return
      }
    }
    setQueryData((prev) => ({
      ...prev,
      [identify]: value
    }))
    getScholarship({ variables: { ...queryData, [identify]: value } })
    setIsFiltered(true)
  }

  useEffect(() => {
    if (accomodation === "OffCampus") {
      setShowFamily(true)
    } else {
      setShowFamily(false)
    }
  }, [accomodation])
  useEffect(() => {
    // map the array to align with the data structure of unfiltered universities
    const d = data?.searchUniversity.map((item) => ({
      ...item.elevatorInfo,
      ...item.studentCharges
    }))
    dispatch(searchGetSuccess(d))
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

  const [GetUni] = useLazyQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    skip: true
  })

  const removeFilter = async () => {
    setQueryData(INITIAL_QUERY_DATA)
    setSat("Sat Score")
    setAct("Act Score")
    setApp("Application Fee")
    setCoa("COA")
    setTuition("Tuition Fee")
    selectInputRef.current.clearValue()
    const searchValue = queryParams.get("q")
    //todo: BETTER IF WE COULD READ FROM THE CACHE(POSSIBLE), THAT WILL ERADICATE NEED OF BELOW QUERY
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
          <div className="search-control ">
            <IonRadioGroup allowEmptySelection={true}>
              <h2 className="search-control__label">Level of study</h2>
              <br />

              <IonText className="mr-3">Undergraduate</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={() => setDegree("undergraduate")}
                value="undergraduate"
              ></IonRadio>

              <IonText className="mx-3">Graduate</IonText>
              <IonRadio
                onIonFocus={() => {
                  setDegree("graduate")
                }}
                value="graduate"
              ></IonRadio>
            </IonRadioGroup>

            <IonRadioGroup className="mt-4" allowEmptySelection={true}>
              <h2 className="search-control__label">Level of tuitiion</h2>
              <br />

              <IonText className="mr-3">In State</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={() => setLocationType("InState")}
                value="inState"
              ></IonRadio>

              <IonText className="mx-3">Out State</IonText>
              <IonRadio
                onIonFocus={() => setLocationType("OutOfState")}
                value="outState"
              ></IonRadio>
            </IonRadioGroup>

            <IonRadioGroup className="mt-4" allowEmptySelection={true}>
              <h2 className="search-control__label">
                Are you planning to stay
              </h2>
              <br />

              <IonText className="mr-3">Off Campus</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={() => setAccomodation("OffCampus")}
                value="offCampus"
              ></IonRadio>

              <IonText className="mx-3">On Campus</IonText>
              <IonRadio
                onIonFocus={() => setAccomodation("OnCampus")}
                value="onCampus"
              ></IonRadio>
            </IonRadioGroup>

            {showFamily && (
              <IonRadioGroup className="mt-4" allowEmptySelection={true}>
                <h2 className="search-control__label">Staying with</h2>
                <br />

                <IonText className="mr-3">With Family</IonText>
                <IonRadio
                  className="text-sm"
                  onIonFocus={() => setLocationType("WithFamily")}
                  value="withFamily"
                ></IonRadio>

                <IonText className="mx-3">Without Family</IonText>
                <IonRadio
                  onIonFocus={() => setLocationType("NotWithFamily")}
                  value="outState"
                ></IonRadio>
              </IonRadioGroup>
            )}
          </div>
          <div className="search-control z-40">
            <IonLabel className="mb-2">States</IonLabel>
            <Select
              options={statesArray}
              isSearchable
              ref={selectInputRef}
              placeholder={"Select a state"}
              onChange={(e) => handleData(e, "state")}
              styles={customStyles}
            />
          </div>

          <div className="search-control">
            <h2 className="search-control__label">Test scores</h2>
            <IonLabel>SAT:</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={sat}
              className="select-field"
              onIonChange={(e) => handleData(e, "sat")}
            >
              {SAT_SCORES.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.min} - {val.max}
                </IonSelectOption>
              ))}
            </IonSelect>

            <IonLabel className="mt-4">ACT:</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={act}
              className="select-field"
              onIonChange={(e) => handleData(e, "act")}
            >
              {ACT_SCORE.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.min} - {val.max}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="search-control">
            <h2 className="search-control__label mb-4">Major</h2>

            <IonInput
              onIonChange={(e) => {
                handleData(e, "major")
              }}
              className="select-field"
            ></IonInput>
          </div>

          <div className="search-control">
            <h2 className="search-control__label">Fees</h2>
            <IonLabel className="mt-4">Application Fee</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={app}
              className="select-field"
              onIonChange={(e) => handleData(e, "applicationFee")}
            >
              {APPLICATION_FEES.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.max === 0
                    ? "Free"
                    : val.max === null
                    ? "100+"
                    : val.min + "-" + val.max + "$"}
                </IonSelectOption>
              ))}
            </IonSelect>

            <IonLabel className="mt-4">Tuition Fees</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={tuition}
              className="select-field"
              onIonChange={(e) => handleData(e, "tuition")}
            >
              {COA.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.max === null
                    ? val.min + "k$+"
                    : val.min + "-" + val.max + "k$"}
                </IonSelectOption>
              ))}
            </IonSelect>

            <IonLabel className="mt-4">Cost of Attendence</IonLabel>
            <IonSelect
              interface="popover"
              placeholder={coa}
              className="select-field"
              onIonChange={(e) => handleData(e, "coa")}
            >
              {COA.map((val, i) => (
                <IonSelectOption key={i} value={val}>
                  {val.max === null
                    ? val.min + "k$+"
                    : val.min + "-" + val.max + "k$"}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  )
}

export default index

