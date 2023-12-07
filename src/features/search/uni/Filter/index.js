/* eslint-disable complexity */
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonRow,
  IonSpinner,
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
import RadioGroup from "features/search/atoms/RadioGroup"
import RangeSelect from "features/search/atoms/RangeSelect"
import MulitiSelect from "features/search/atoms/MulitiSelect"
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
import { URLgetter } from "utils/lib/URLupdate"

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

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => {
    const degree = URLgetter("deg")
    const tutionLevel = URLgetter("loc")
    const accomodation = URLgetter("acc")
    const family = URLgetter("fam")
    const sat = URLgetter("sat")
    const act = URLgetter("act")
    const applicationFee = URLgetter("af")
    const CostOfAttendance = URLgetter("coa")
    const tuitionFee = URLgetter("tf")
    const state = URLgetter("state")
    const major = URLgetter("major")
    let queryObject = {}

    if (sat) {
      let newSat = sat.split("-")
      let newSatObj = {
        min: parseInt(newSat[0]),
        max: parseInt(newSat[1])
      }
      queryObject.sat = newSatObj
    }

    if (act) {
      let newAct = act.split("-")
      let newActObj = {
        min: parseInt(newAct[0]),
        max: parseFloat(newAct[1])
      }
      queryObject.act = newActObj
    }

    if (applicationFee) {
      let newApplicationFee = applicationFee.split("-")
      let newApplicationFeeObj = {
        min: newApplicationFee[0],
        max: newApplicationFee[1]
      }
      if (degree === "u") {
        queryObject.undergraduateApplicationFee = newApplicationFeeObj
      } else if (degree === "g") {
        queryObject.graduateApplicationFee = newApplicationFeeObj
      }
    }

    if (tuitionFee) {
      let newTutionFee = tuitionFee.split("-")
      let newTutionFeeObj = {
        min: newTutionFee[0],
        max: newTutionFee[1]
      }
      if (degree === "u") {
        if (tutionLevel === "I") {
          queryObject.undergraduateInStateTuitionFee = newTutionFeeObj
        } else if (tutionLevel === "O") {
          queryObject.undergraduateOutOfStateTuitionFee = newTutionFeeObj
        }
      } else if (degree === "g") {
        if (tutionLevel === "I") {
          queryObject.graduateInStateTuitionFee = newTutionFeeObj
        } else if (tutionLevel === "O") {
          queryObject.graduateOutOfStateTuitionFee = newTutionFeeObj
        }
      }
    }

    if (CostOfAttendance) {
      let newCostOfAttendence = CostOfAttendance.split("-")
      let newCostOfAttendenceObj = {
        min: newCostOfAttendence[0],
        max: newCostOfAttendence[1]
      }
      if (degree === "u") {
        // oncampus
        if (accomodation === "o") {
          if (tutionLevel === "I") {
            queryObject.undergraduateOnCampusInStateCostOfAttendance =
              newCostOfAttendenceObj
          } else if (tutionLevel === "O") {
            queryObject.undergraduateOnCampusOutOfStateCostOfAttendance =
              newCostOfAttendenceObj
          }
          // offcampus
        } else if (accomodation === "O") {
          if (family === "W") {
            if (tutionLevel === "I") {
              queryObject.undergraduateOffCampusWithFamilyInStateCostOfAttendance =
                newCostOfAttendenceObj
            } else if (tutionLevel === "O") {
              queryObject.undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance =
                newCostOfAttendenceObj
            }
          } else if (family === "N") {
            if (tutionLevel === "I") {
              queryObject.undergraduateOffCampusNotWithFamilyInStateCostOfAttendance =
                newCostOfAttendenceObj
            } else if (tutionLevel === "O") {
              queryObject.undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance =
                newCostOfAttendenceObj
            }
          }
        }
      }
    }

    if (state) {
      queryObject.state = state
    }

    setIsFiltered(true)
    // setChips(Object.keys(queryObject))

    getScholarship({
      variables: {
        ...queryObject
      }
    })
  }, [history.location.search])

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

  // query when individual chips get changed
  useEffect(() => {
    //  if there are more chips left it means there is still applied filters
    const fetch = async () => {
      if (chips.length > 0) {
        const { data } = await getScholarship({
          variables: queryData
        })
        setIsFiltered(true)
        console.log(data, "hehhhehhehehehheh")
      } else {
        const searchValue = searchParam.get("q")
        const { data } = await GetUni({
          variables: { name: searchValue || "" }
        })
        setIsFiltered(false)
        dispatch(searchGetSuccess(data?.searchSchool))
      }
    }
    fetch()
  }, [chips])

  const handleData = (e, identify) => {
    console.log("entered hande data")
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

      console.log({ value })
    }

    if (identify === "coa") {
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
    console.log("updating query state")
    setQueryData((prev) => ({
      ...prev,
      [identify]: value
    }))
    getScholarship({ variables: { ...queryData, [identify]: value } })
    setIsFiltered(true)
    setChips((prev) => {
      if (!prev.includes(identify)) {
        return [...prev, identify]
      } else {
        return [...prev]
      }
    })
    setQueryParams(identify, value)
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
    const d = data?.searchUniversity?.map((item) => ({
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
    removeAllQueryParams()
    setQueryData(INITIAL_QUERY_DATA)
    setSat("Sat Score")
    setAct("Act Score")
    setApp("Application Fee")
    setCoa("COA")
    setTuition("Tuition Fees")
    stateInputRef.current.clearValue()
    majorInputRef.current.clearValue()
    const searchValue = searchParam.get("q")
    //todo: BETTER IF WE COULD READ FROM THE CACHE(POSSIBLE), THAT WILL ERADICATE NEED OF BELOW QUERY
    const { data } = await GetUni({ variables: { name: searchValue || "" } })
    dispatch(searchGetSuccess(data?.searchSchool))
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
            </>
          ))}
        <IonCardContent>
          <div className="grid grid-cols-1 gap-5">
            <RadioGroup
              Label1={"Undergraduate"}
              Label2={"Graduate"}
              value1={"undergraduate"}
              value2={"graduate"}
              urlKey={"deg"}
              header={"Level of study"}
            />
            <RadioGroup
              Label1={"In State"}
              Label2={"Out State"}
              value1={"InState"}
              value2={"OutOfState"}
              urlKey={"loc"}
              header={"Level of tuition"}
            />

            <RadioGroup
              Label1={"On Campus"}
              Label2={"Off Campus"}
              value1={"onCampus"}
              value2={"OffCampus"}
              urlKey={"acc"}
              header={"Are you planning to stay"}
            />

            <RadioGroup
              Label1={"With roommates"}
              Label2={"Without roommates"}
              value1={"WithFamily"}
              value2={"NotWithFamily"}
              urlKey={"fam"}
              header={"Staying"}
            />
          </div>

          <div className="mt-5 grid grid-cols-1">
            <div className="search-control ">
              <h2 className="search-control__label">Test scores</h2>
              <IonRow>
                <RangeSelect
                  Label={"SAT:"}
                  placeholder="Sat"
                  options={SAT_SCORES}
                  urlKey={"sat"}
                  showDollarSign={false}
                />
                <RangeSelect
                  Label={"ACT:"}
                  placeholder={"act"}
                  options={ACT_SCORE}
                  urlKey={"act"}
                  showDollarSign={false}
                />
              </IonRow>
            </div>

            <div className="search-control">
              <h2 className="search-control__label">Fees</h2>

              <IonRow className="w-full flex-nowrap">
                <IonCol>
                  <RangeSelect
                    Label={"Application Fee"}
                    placeholder={"Application fee"}
                    options={APPLICATION_FEES}
                    urlKey={"af"}
                    showDollarSign={true}
                  />
                </IonCol>
                <IonCol>
                  <RangeSelect
                    Label={"Tution Fees"}
                    placeholder={"Tution Fee"}
                    options={TUITION}
                    urlKey={"tf"}
                    showDollarSign={true}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <RangeSelect
                  Label={"Cos of Attendence"}
                  options={COA}
                  showDollarSign={true}
                  urlKey={"coa"}
                  placeholder="Cost of Attendence"
                />
              </IonRow>
            </div>

            <div className="search-control">
              <h2 className="search-control__label mb-2">Major</h2>

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

            <MulitiSelect
              options={statesArray}
              Label="State"
              URLkey={"state"}
              key={"stateselect"}
            />
          </div>
        </IonCardContent>
      </IonCard>
    </>
  )
}

export default index
