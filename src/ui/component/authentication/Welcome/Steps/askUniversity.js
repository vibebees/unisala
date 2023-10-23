import React, {useState, useContext, useEffect} from "react"
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
  IonCol,
  IonCardSubtitle
} from "@ionic/react"
import {WelcomeData} from ".."
import axios from "axios"
import {universityServer} from "../../../../../servers/endpoints"
import {useDebouncedEffect} from "../../../../../hooks/useDebouncedEffect"
import Noimagefound from "./../../../../../assets/no_image_found.png"
import clsx from "clsx"
import {useSelector} from "react-redux"

const QuestionHeader = ({text}) => (
  <>
    <IonText color="primary" >
      <h1 className="font-semibold text-xl text-neutral-600 text-center">{text}</h1>
    </IonText>
  </>
)

const UniversityItem = ({item, handleclick}) => {
  return (
    (
      <IonItem key={item.unitId}>
        <IonCheckbox value={item.unitId} onClick={handleclick}>
          {item.name}
        </IonCheckbox>
        <img
          src={item.picture ? item.picture : Noimagefound}
          alt={item.name}
          className="w-10 h-11 mx-2 ml-4 rounded-sm"
        />
        <span className="px-2 text-sm font-medium text-neutral-600">
          {item.name}
        </span>
      </IonItem>
    )
  )
}

const SearchList = ({isLoading, results, handleclick}) => (
  <IonList className="overflow-y-scroll searchlist border rounded-md h-60 w-full">
    {isLoading ? (
      Array(4)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="border h-12 w-full">
            <IonThumbnail slot="start" className="w-full">
              <IonSkeletonText animated={true}></IonSkeletonText>
            </IonThumbnail>
          </div>
        ))
    ) : (
      results.map((item) => UniversityItem({item, handleclick}))
    )}
  </IonList>
)

const AskUniversity = ({question}) => {
  const [results, setResults] = useState([]),
    {
      data: QuestionData,
      setWelcomeFormdata,
      welcomeFormdata
    } = useContext(WelcomeData),
    [searcTerm, setSearchTerm] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    {text, description} = question,
    options = {
      looking: "I am Exploring following University",
      applying: "I am Applying/Previously Applied to following University",
      studying: "I am Studying at following University",
      graduated: "I Graduated from following University",
      searchPlaceHolder: "Southeastern Louisiana University 🏛️"
    }
    const [suggestUni, setSuggestUni] = useState(false) // New state

    const handleSuggestCheckboxChange = () => {
      if (!suggestUni) { // If it's currently unchecked
        setWelcomeFormdata({
          ...welcomeFormdata,
          interestedUni: []
        })
      }
      setSuggestUni(!suggestUni) // Toggle checkbox
    }
const getUniversitites = async () => {
    const token = useSelector((state) => state?.auth?.accessToken)
    setIsLoading(true)
    try {
      const res = await axios.get(
        `${universityServer}/keyword/schoolname/${searcTerm}/5`,
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
    getUniversitites()
  }

  const handleclick = (e) => {
    const alreadyExists = welcomeFormdata.interestedUni.includes(e.target.value)
    if (alreadyExists) {
      const newInterestedUni = welcomeFormdata.interestedUni.filter(
        (item) => item !== e.target.value
      )
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: newInterestedUni
      })
    } else {
      setWelcomeFormdata({
        ...welcomeFormdata,
        interestedUni: [
          ...welcomeFormdata.interestedUni,
          Number(e.target.value)
        ]
      })
    }
  }
  useDebouncedEffect(handleInput, [searcTerm], 300)
  return (
    <IonGrid>

      <IonRow className="mt-3">
        {/* Displaying the QuestionHeader component as the title */}
        <QuestionHeader text={text} className="mt-3 " />

      </IonRow>
{ !suggestUni && <IonCardSubtitle className="text-center mt-3">{options[welcomeFormdata?.userStatus]}</IonCardSubtitle>}

      {!suggestUni && (
        <>
         <IonRow>
                    <IonSearchbar
                        placeholder={options?.searchPlaceHolder}
                        className="font-medium text-neutral-600"
                        onIonInput={(e) => setSearchTerm(e.target.value)}
                    />
                </IonRow>

          <IonRow>
            <SearchList isLoading={isLoading} results={results} handleclick={handleclick} />
          </IonRow>
        </>
      )}

      <IonRow className="mt-2">
        <IonCheckbox onClick={handleSuggestCheckboxChange} checked={suggestUni} />
        <IonText className="ml-2 text-sm font-medium text-neutral-600">I don&apos;t have a university preference yet! </IonText>
      </IonRow>

    </IonGrid>
  )

}

export default AskUniversity
