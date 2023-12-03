import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  useIonToast
} from "@ionic/react"
import "./index.css"
import { useEffect, useRef, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { UNIVERSITY_SERVICE_GQL } from "servers/types"
import { UniFilterResults, UniSearchDataList } from "graphql/uni"
import { searchGetSuccess } from "store/action"
import { useDispatch } from "react-redux"
import { statesArray } from "utils/lib/states"
import axios from "axios"

import Select from "react-select"
import AsyncSelect from "react-select/async"
import { useHistory, useLocation } from "react-router-dom"
import Chip from "./Chip"
import {
  ACT_SCORE,
  APPLICATION_FEES,
  COA,
  INITIAL_QUERY_DATA,
  SAT_SCORES,
  TUITION
} from "./constants"
import { universityServer } from "servers/endpoints"
import useWindowWidth from "hooks/useWindowWidth"

function index({ setIsLoading, filterPage }) {
  const windowWidth = useWindowWidth()

  const INITIAL_QUERY_DATA = {
    sat: null,
    act: null,
    page: filterPage,
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
  const [isFiltered, setIsFiltered] = useState(false)
  const stateInputRef = useRef()
  const majorInputRef = useRef()

  const location = useLocation()

  const [queryData, setQueryData] = useState(INITIAL_QUERY_DATA)
  const [chips, setChips] = useState([])
  const locate = useLocation()
  const searchParam = new URLSearchParams(locate.search)
  const history = useHistory()
  const dispatch = useDispatch()

  const [getScholarship, { data, loading, refetch, fetchMore }] = useLazyQuery(
    UniFilterResults,
    {
      context: { server: UNIVERSITY_SERVICE_GQL },
      fetchPolicy: "network-only"
    }
  )

  // fetch data when page is changed
  useEffect(() => {
    if (filterPage > 1 && isFiltered) {
      fetchMore({
        variables: {
          page: filterPage
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log({ prev, fetchMoreResult })
          if (!fetchMoreResult) return prev
          return {
            searchUniversity: [
              ...prev.searchUniversity,
              ...fetchMoreResult.searchUniversity
            ]
          }
        }
      })

      setQueryData((prev) => ({
        ...prev,
        page: filterPage
      }))
    }
  }, [filterPage])

  // to show skeleton text when filter related data are loading
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    const queryObject = {}
    for (const [key, value] of searchParam) {
      if (Object.keys(INITIAL_QUERY_DATA).includes(key)) {
        try {
          queryObject[key] = JSON.parse(value)
        } catch (error) {
          console.log(error)
        }
      }
    }
    // only make query if user  comes with filter related url
    if (Object.keys(queryObject).length > 0) {
      setIsFiltered(true)
      setChips(Object.keys(queryObject))
      setQueryData((prev) => ({ ...prev, ...queryObject }))
      getScholarship({
        variables: {
          ...queryData,
          ...queryObject
        }
      })
    }
  }, [])

  //  this function is to add query params when new filter is added
  const setQueryParams = (key, value) => {
    searchParam.set(key, JSON.stringify(value))
    console.log({ value })
    history.push({ search: searchParam.toString() })
  }

  const removeAllQueryParams = () => {
    const deleteKeys = []
    searchParam.forEach((value, key) => {
      if (key !== "tab" && key !== "q") {
        deleteKeys.push(key)
      }
    })
    console.log(deleteKeys)
    deleteKeys.forEach((key) => {
      console.log(key)
      searchParam.delete(key)
    })
    history.push({ search: searchParam.toString() })
  }

  const removeOneQueryParam = (key) => {
    searchParam.delete(key)
    history.push({ search: searchParam.toString() })
  }

  // this function is trigger when cross icon on a chip is pressed
  const removeSpeceficFilter = (chip) => {
    removeOneQueryParam(chip)
    const filteredChips = chips.filter((c) => c !== chip)

    setChips(filteredChips)
    setQueryData((prev) => ({ ...prev, [chip]: null }))
  }

  const handleData = (e, identify) => {
    let value
    if (identify === "state" || identify === "major") {
      value = e?.label
      if (!value) return
    } else {
      value = e.detail.value
    }

    if (identify === "sat") {
      setSat(`${value.min} - ${value.max}`)
    }
    if (identify === "act") {
      setAct(`${value.min} - ${value.max}`)
    }

    if (identify === "applicationFee") {
      // check if it is for grad or undergrad
      if (degree) {
        console.log({ degree })
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
        return false
      }
    }

    if (identify === "coa") {
      console.log({ location })
      console.log(!degree || !accomodation || !locationType)
      if (!degree || !accomodation || !locationType) {
        present({
          duration: 3000,
          message:
            "Please select the level of your degree, preffered location type and mode of accomodation.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
        return false
      } else if (accomodation === "OffCampus" && !family) {
        present({
          duration: 3000,
          message:
            "Please select if you are staying with roomates or without roommates.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
        return false
      } else {
        if (value.max === null) {
          setCoa("35000$+")
        } else {
          setCoa(`${value.min} - ${value.max}`)
        }

        if (accomodation === "OnCampus") {
          identify = `${degree}${accomodation}${locationType}CostOfAttendance`
        } else if (accomodation === "OffCampus") {
          identify = `${degree}${accomodation}${family}${locationType}CostOfAttendance`
        }
      }
    }
    if (identify === "tuition") {
      if (degree && locationType) {
        identify = `${degree}${locationType}TuitionFee`

        if (value.max === null) {
          setTuition("20,000$+")
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
    // getScholarship({ variables: { ...queryData, [identify]: value } })

    setChips((prev) => {
      if (!prev.includes(identify)) {
        return [...prev, identify]
      } else {
        return [...prev]
      }
    })
    setQueryParams(identify, value)
  }

  const applyFilter = () => {
    getScholarship({
      variables: queryData
    })
  }

  useEffect(() => {
    // map the array to align with the data structure of unfiltered universities
    const d = data?.searchUniversity?.map((item) => ({
      ...item.elevatorInfo,
      ...item.studentCharges
    }))
    dispatch(searchGetSuccess(d))
  }, [data])

  useEffect(() => {
    if (accomodation === "OffCampus") {
      setShowFamily(true)
    } else {
      setShowFamily(false)
    }
  }, [accomodation])

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

  const removeFilter = async () => {
    removeAllQueryParams()
    setQueryData(INITIAL_QUERY_DATA)
    setSat("Sat Score")
    setAct("Act Score")
    setApp("Application Fee")
    setCoa("COA")
    setTuition("Tuition Fees")
    stateInputRef.current.clearValue()
    majorInputRef.current.clearValue()

    dispatch(searchGetSuccess([]))
    setIsFiltered(false)
  }

  //  this method is for removing data like level of study, level of tuition and accomodations because if this changes, the query inputs wont align so first remove all then add
  const handleStaticData = (e, type) => {
    const val = e.target.value

    switch (type) {
      case "degree":
        setDegree(val)
        break
      case "tuition":
        setLocationType(val)
        break
      case "accomodation":
        setAccomodation(val)
        break
      case "family":
        setFamily(val)
        break
      default:
        break
    }
  }

  // to fetch majors information

  const fetchModel = async (majorQuery = " ") => {
    try {
      const response = await axios.get(
        `${universityServer}/keyword/majors/${majorQuery}/5`
      )
      return response.data.map((i) => ({
        value: i.name,
        label: i.name.toUpperCase()
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  const loadOptions = (inputVal, callback) => {
    setTimeout(async () => {
      try {
        const options = await fetchModel(inputVal)
        callback(options)
      } catch (error) {
        console.error("Error loading options:", error)
      }
    }, 1000)
  }

  return (
    <>
      <IonCard className="filter-card-wrapper">
        {isFiltered &&
          (loading ? (
            <IonSpinner name="crescent"></IonSpinner>
          ) : (
            <>
              <IonButton
                className=" relative right-0 text-right"
                size="small"
                fill="outline"
                onClick={removeFilter}
              >
                Remove Filters
              </IonButton>

              <div>
                {Array.isArray(chips) &&
                  chips.map((chip, key) => (
                    <Chip
                      key={key}
                      label={chip}
                      removeSpeceficFilter={removeSpeceficFilter}
                    />
                  ))}
              </div>
            </>
          ))}
        <IonCardContent>
          <div
            className={`grid ${
              isFiltered || windowWidth < 768
                ? "grid-cols-1 gap-5"
                : "grid-cols-4"
            }`}
          >
            <IonRadioGroup allowEmptySelection={false}>
              <h2 className="search-control__label">Level of study</h2>
              <br />

              <IonText className="mr-3">Undergraduate</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={(e) => {
                  handleStaticData(e, "degree")
                }}
                value="undergraduate"
              ></IonRadio>

              <IonText className="mx-3">Graduate</IonText>
              <IonRadio
                onIonFocus={(e) => {
                  handleStaticData(e, "degree")
                }}
                value="graduate"
              ></IonRadio>
            </IonRadioGroup>{" "}
            <IonRadioGroup className="" allowEmptySelection={false}>
              <h2 className="search-control__label">Level of tuition</h2>
              <br />

              <IonText className="mr-3">In State</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={(e) => {
                  handleStaticData(e, "tuition")
                }}
                value="InState"
              ></IonRadio>

              <IonText className="mx-3">Out State</IonText>
              <IonRadio
                onIonFocus={(e) => {
                  handleStaticData(e, "tuition")
                }}
                value="OutOfState"
              ></IonRadio>
            </IonRadioGroup>
            <IonRadioGroup className="" allowEmptySelection={false}>
              <h2 className="search-control__label">
                Are you planning to stay
              </h2>
              <br />

              <IonText className="mr-3">Off Campus</IonText>
              <IonRadio
                className="text-sm"
                onIonFocus={(e) => {
                  handleStaticData(e, "accomodation")
                }}
                value="OffCampus"
              ></IonRadio>

              <IonText className="mx-3">On Campus</IonText>
              <IonRadio
                onIonFocus={(e) => {
                  handleStaticData(e, "accomodation")
                }}
                value="OnCampus"
              ></IonRadio>
            </IonRadioGroup>
            {showFamily && (
              <IonRadioGroup className="" allowEmptySelection={false}>
                <h2 className="search-control__label">Staying</h2>

                <IonRow>
                  <IonText className="mr-3">With roommates</IonText>
                  <IonRadio
                    className="text-sm"
                    onIonFocus={(e) => handleStaticData(e, "family")}
                    value="WithFamily"
                  />
                </IonRow>

                <IonRow>
                  <IonText className="mr-3">Without roommates</IonText>
                  <IonRadio
                    className="text-sm"
                    onIonFocus={(e) => handleStaticData(e, "family")}
                    value="NotWithFamily"
                  />
                </IonRow>
              </IonRadioGroup>
            )}
          </div>

          <div
            className={`mt-8 grid gap-5 ${
              isFiltered || windowWidth < 768 ? "grid-cols-1" : "grid-cols-4"
            }`}
          >
            <div className="search-control ">
              <h2 className="search-control__label">Test scores</h2>
              {!queryData?.act && (
                <div className="mt-4">
                  <IonLabel>SAT:</IonLabel>
                  <IonSelect
                    interface="popover"
                    placeholder={sat}
                    className="border border-[gray]"
                    onIonChange={(e) => handleData(e, "sat")}
                  >
                    {SAT_SCORES.map((val, i) => (
                      <IonSelectOption key={i} value={val}>
                        {val.min} - {val.max}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              )}
              {!queryData?.sat && (
                <div className="mt-4">
                  <IonLabel className="mt-4">ACT:</IonLabel>
                  <IonSelect
                    interface="popover"
                    placeholder={act}
                    className="border border-[gray]"
                    onIonChange={(e) => handleData(e, "act")}
                  >
                    {ACT_SCORE.map((val, i) => (
                      <IonSelectOption key={i} value={val}>
                        {val.min} - {val.max}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              )}
            </div>

            <div className="search-control">
              <h2 className="search-control__label">Fees</h2>

              <IonLabel className="mt-4">Application Fee</IonLabel>
              <IonSelect
                interface="popover"
                placeholder={app}
                className="border border-[gray]"
                onIonChange={(e) => handleData(e, "applicationFee")}
              >
                {APPLICATION_FEES.map((val, i) => (
                  <IonSelectOption key={i} value={val}>
                    {val.max === 0
                      ? "Free"
                      : val.max === null
                      ? "100$+"
                      : val.min + "-" + val.max + "$"}
                  </IonSelectOption>
                ))}
              </IonSelect>

              {coa === "COA" && (
                <>
                  <IonLabel className="mt-4">Tuition Fees</IonLabel>
                  <IonSelect
                    interface="popover"
                    placeholder={tuition}
                    className="border border-[gray]"
                    onIonChange={(e) => handleData(e, "tuition")}
                  >
                    {TUITION.map((val, i) => (
                      <IonSelectOption key={i} value={val}>
                        {val.max === null
                          ? val.min + "$+"
                          : val.min + "-" + val.max + "$"}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </>
              )}

              {tuition === "Tuition Fees" && (
                <>
                  <IonLabel className="mt-4">Cost of Attendence</IonLabel>
                  <IonSelect
                    interface="popover"
                    placeholder={coa}
                    className="border border-[gray]"
                    onIonChange={(e) => handleData(e, "coa")}
                  >
                    {COA.map((val, i) => (
                      <IonSelectOption key={i} value={val}>
                        {val.max === null
                          ? val.min + "$+"
                          : val.min + "-" + val.max + "$"}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </>
              )}
            </div>

            <div className="search-control">
              <h2 className="search-control__label mb-4">Major</h2>

              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                styles={customStyles}
                menuPlacement="top"
                ref={majorInputRef}
                onChange={(e) => handleData(e, "major")}
                className="mt-2"
              />
            </div>

            <div className="search-control z-40">
              <IonLabel className="mb-2">State</IonLabel>
              <Select
                options={statesArray}
                isSearchable
                ref={stateInputRef}
                placeholder={"Select a state"}
                onChange={(e) => handleData(e, "state")}
                styles={customStyles}
                menuPlacement="top"
              />
            </div>
          </div>
          <IonButton disabled={chips.length == 0} onClick={applyFilter}>
            Apply Filters
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  )
}

export default index
