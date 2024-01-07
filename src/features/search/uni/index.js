import { useEffect, useState } from "react"
import {
  IonButton,
  IonButtons,
  IonCol,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonContent
} from "@ionic/react"
import Filter from "./Filter"
import SearchResults from "./SearchResults"
import { useDispatch } from "react-redux"
import useWindowWidth from "hooks/useWindowWidth"
import { searchGetSuccess } from "store/action/index"
import { useQuery } from "@apollo/client"
import { UniSearchDataList, ScholarshipResults } from "graphql/uni/"
import { UNIVERSITY_SERVICE_GQL } from "servers/types"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
import { useLocation } from "react-router"
import { closeOutline, funnelOutline } from "ionicons/icons"
import { INITIAL_QUERY_DATA } from "./Filter/constants"
import SearchTab from "../atoms/SearchTab"
import { ChipsTab } from "../orgamism/ChipsTab"
import UniversityScholarshipTab from "../atoms/UniversityScholarshipTab"
import { URLgetter } from "utils/lib/URLupdate"
import { useHistory } from "react-router-dom"
import clsx from "clsx"
import { SearchBar } from "component/searchBox"
import ScholarshipResult from "./ScholarshipResults"
import { DesktopFilter } from "./desktopFilter"
import { MobileFilter } from "./mobileFilter"
import {ResultsColumn} from "./resultColumn"



function index({ query }) {
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)
  const [filtered, setFiltered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState("u")
  const { data, loading } = useQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    variables: { name: query || "" },
    skip: searchParams.size > 2
  })


  useEffect(() => {
    dispatch(searchGetSuccess(data?.searchSchool))
  }, [data])

  const [filterPage, setFilterPage] = useState(1)

  useEffect(() => {
    for (const [key, value] of searchParams) {
      if (Object.keys(INITIAL_QUERY_DATA).includes(key)) {
        setFiltered(true)
      } else {
        setFiltered(false)
      }
    }
  }, [searchParams])

  useEffect(() => {
    const url = URLgetter("st")
    if (url) {
      setActiveSubTab(url)
    } else {
      setActiveSubTab("u")
    }
  }, [history.location.search])

  const isDesktop = useWindowWidth() > 768

/*
  return (
    <>
      <IonRow className="overflow-hidden max-md:overflow-visible">
        {windowWidth > 768 ? (
          <IonCol className="filter-col  py-6 fixed overflow-y-scroll z-50 bottom-0 top-0">
            <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
          </IonCol>
        ) : (
          // this is for smaller screens
          <>
            <IonMenu
              menuId="menu"
              className="w-full h-[1196px"
              contentId="main-content"
            >
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Filters</IonTitle>
                  <IonMenuToggle slot="end">
                    <IonButton fill="clear">
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonMenuToggle>
                </IonToolbar>
              </IonHeader>
              <IonContent
                className={clsx("filter-col absolute top-10 z-[1000]")}
              >
                <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
              </IonContent>
            </IonMenu>
            <IonPage id="main-content" className="!-z-0">
              <IonHeader>
                <IonToolbar className="pr-2">
                  <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                  <SearchBar />
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding hidden  absolute"></IonContent>
            </IonPage>
          </>
        )}

        <IonCol className="results-col pl-[360px] max-md:mt-14 max-md:mx-0 max-md:px-0 ">
          <SearchTab />
          <ChipsTab />
          <UniversityScholarshipTab />
          {loading || isLoading ? (
            Array.from({ length: 12 }).map((_, i) => <ThreadSkeleton key={i} />)
          ) : activeSubTab === "u" ? (
            <SearchResults
              filterPage={filterPage}
              setFilterPage={setFilterPage}
            />
          ) : (
            <ScholarshipResult />
          )}
        </IonCol>
      </IonRow>
    </>
  )
*/

// return (
//   <>
//     <IonRow className="overflow-hidden max-md:overflow-visible">
//       {windowWidth > 768 ? (
//         <IonCol className="filter-col  py-6 fixed overflow-y-scroll z-50 bottom-0 top-0">
//           <Filter filterPage={filterPage} setIsLoading={setIsLoading} />
//         </IonCol>
//       ) : (
//         // this is for smaller screens
//         <>
//           <IonMenu
//             menuId="menu"
//             className="w-full h-[1196px"
//             contentId="main-content"
//           >


//           </IonMenu>
//           <IonPage id="main-content" className="!-z-0">
//             <IonHeader>
//               <IonToolbar className="pr-2">
//                 <IonButtons slot="start">
//                   <IonMenuButton></IonMenuButton>
//                 </IonButtons>
//                 <SearchBar />
//               </IonToolbar>
//             </IonHeader>
//             <IonContent className="ion-padding hidden  absolute"></IonContent>
//           </IonPage>
//         </>
//       )}

//       <ResultsColumn
//         isLoading={isLoading}
//         loading={loading}
//         activeSubTab={activeSubTab}
//         filterPage={filterPage}
//         setFilterPage={setFilterPage}
//       />
//     </IonRow>
//   </>
// )


return (
  <>
    <IonRow>
      {isDesktop ? (
        <DesktopFilter filterPage={filterPage} setIsLoading={setIsLoading} />
      ) : (
          <MobileFilter
            filterPage={1} // Example page number
            setIsLoading={() => {}} // Replace with actual setIsLoading function
          />
      )}
      <ResultsColumn
        isLoading={isLoading}
        loading={loading}
        activeSubTab={activeSubTab}
        filterPage={filterPage}
        setFilterPage={setFilterPage}
      />
    </IonRow>
  </>
)
}

export default index
