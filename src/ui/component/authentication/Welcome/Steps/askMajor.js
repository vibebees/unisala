import React, {useState, useContext} from "react"
import {
  IonGrid,
  IonText,
  IonCheckbox,
  IonRow,
  IonItem,
  IonSkeletonText,
  IonThumbnail,
  IonList,
  IonSearchbar,
  IonButton,
  IonCardSubtitle
} from "@ionic/react"
import {WelcomeData} from ".."
import {universityServer} from "../../../../../servers/endpoints"
import axios from "axios"
import {useDebouncedEffect} from "../../../../../hooks/useDebouncedEffect"

const QuestionTitle = ({title}) => (
  <IonText color="primary">
    <h1 className="font-semibold text-xl text-neutral-600">{title}</h1>
  </IonText>
)

const QuestionOption = ({value, label, handleClick}) => {

  return (<IonRow class="gap-2">
    <IonCheckbox value={value} onClick={handleClick} />
    <label className="text-sm font-medium text-neutral-600" title={label}>{label}</label>
  </IonRow>)
}

const SearchInput = ({term, setTerm, isLoading, results, handleClick}) => (
  <>
    <IonSearchbar
      placeholder=" Criminal Justice ⚖️"
      className="font-medium text-neutral-600 w-full shadow-md rounded-lg"
      value={term}
      onIonInput={(e) => setTerm(e.target.value)}
    />
    <div className="mt-4 border rounded-lg overflow-y-auto max-h-60 shadow-inner">
      <MajorList isLoading={isLoading} results={results} handleClick={handleClick} />
    </div>
  </>
)

const MajorList = ({isLoading, results, handleClick}) => (
  <IonList className="overflow-y-scroll searchlist h-full border rounded-md">
    {isLoading ? (
      Array(4)
        .fill(null)
        .map((_, idx) => (
          <div className="border h-12 w-full" key={idx}>
            <IonThumbnail slot="start" className="w-full">
              <IonSkeletonText animated={true}></IonSkeletonText>
            </IonThumbnail>
          </div>
        ))
    ) : (
      results.map((item, index) => (
        <IonItem key={index}>
          <IonCheckbox value={item.id} onClick={handleClick} />
          <span className="px-2 text-sm font-medium text-neutral-600">
            {item.name}
          </span>
        </IonItem>
      ))
    )}
  </IonList>
)

const SecondStep = ({question}) => {
  const [searchInput, setSearchInput] = useState(false),
    [searcTerm, setSearchTerm] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [results, setResults] = useState([]),
    {
      data: QuestionData,
      setWelcomeFormdata,
      welcomeFormdata
    } = useContext(WelcomeData),
    [showOptions, setShowOptions] = useState(true),
    {text, options, description} = question

  const getMajors = async () => {
    const token = localStorage.getItem("accessToken")
    setIsLoading(true)
    try {
      const res = await axios.get(
        `${universityServer}/keyword/spaces/${searcTerm}/4`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setResults(res.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInput = () => {
    getMajors()
  }

  const handleclick = (e) => {
    const data = e.target.value
    if (data) {
      let newdata = [...welcomeFormdata.interestedSubjects, data]
      setWelcomeFormdata((prev) => {
        return {...prev, interestedSubjects: newdata}
      })
    } else {
      //remove the existing data from the array
      let newdata = welcomeFormdata.interestedSubjects.filter(
        (item) => item !== data
      )
      setWelcomeFormdata((prev) => {
        return {...prev, interestedSubjects: newdata}
      })
    }
  }

  const handleOtherClick = () => {
    setShowOptions(!showOptions)
    // Toggle the searchInput checkbox
    setSearchInput(!showOptions)
  }

  useDebouncedEffect(handleInput, [searcTerm], 300)

  return (
      <div>
        <IonGrid className="!px-12 max-md:!px-5 mt-6 ">
          <IonGrid>
            <QuestionTitle title={text} />
        </IonGrid>
      <IonCardSubtitle className="text-center">{description}</IonCardSubtitle>

          <IonGrid className="mt-8 grid grid-cols-2 gap-8 max-md:grid-cols-1 ">
            {showOptions ? (
              options.map((item, index) => (
                <QuestionOption
                  key={index}
                  value={item.value}
                  label={item.key}
                  handleClick={handleclick}
                />
              ))
            ) : null}
            <IonRow class="gap-2  ">
              <IonCheckbox
                value={searchInput}
                onClick={(e) => {
                  setSearchInput(!showOptions) // Toggle the searchInput checkbox
                  handleOtherClick()
                }}
              >
                Other
              </IonCheckbox>
              <label className="text-sm font-medium text-neutral-600">
                Other
              </label>
            </IonRow>

            {!showOptions && (
              <div>
                <SearchInput
                  term={searcTerm}
                  setTerm={setSearchTerm}
                  isLoading={isLoading}
                  results={results}
                  handleClick={handleclick}
                />
                {/* Optionally, you can add a button to go back to the list of options */}

                <IonButton
                  color="orange"
                  size="small"
                  onClick={handleOtherClick}
                  className="float-right sm text-white"
                >
                  📚 🔙
                </IonButton>
              </div>
            )}
            <IonGrid />
          </IonGrid>
        </IonGrid>
      </div>
  )
}
export default SecondStep
