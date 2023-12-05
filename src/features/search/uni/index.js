import { useEffect, useState } from "react"
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import Filter from "./Filter"
import SearchResults from "./SearchResults"
import { useDispatch } from "react-redux"
import useWindowWidth from "hooks/useWindowWidth"
import { searchGetSuccess } from "store/action/index"
import { useLazyQuery, useQuery } from "@apollo/client"
import { UniSearchDataList } from "graphql/uni/"
import { UNIVERSITY_SERVICE_GQL } from "servers/types"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
import { useLocation } from "react-router"
import { closeOutline } from "ionicons/icons"
import { INITIAL_QUERY_DATA } from "./Filter/constants"

function index({ query }) {
  const windowWidth = useWindowWidth()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [shiftMenu, setShiftMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [filterPage, setFilterPage] = useState(1)

  useEffect(() => {
    for (const [key, value] of searchParams) {
      if (Object.keys(INITIAL_QUERY_DATA).includes(key)) {
        setShiftMenu(true)
      } else {
        setShiftMenu(false)
      }
    }
  }, [])

  return (
    <>
      <div className={`${shiftMenu ? "flex " : "block"}`}>
        {windowWidth > 768 ? (
          <IonCol className={`filter-col h-fit`}>
            <Filter
              filterPage={filterPage}
              setIsLoading={setIsLoading}
              setShiftMenu={setShiftMenu}
            />
          </IonCol>
        ) : (
          // this is for smaller screens
          <>
            <IonMenu className="w-full h-[1196px]" contentId="main-content">
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
              <IonCol className="filter-col absolute top-10 z-[1000]">
                <Filter
                  filterPage={filterPage}
                  setIsLoading={setIsLoading}
                  setShiftMenu={setShiftMenu}
                />
              </IonCol>
            </IonMenu>
            <IonPage id="main-content">
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
            </IonPage>
          </>
        )}

        <IonCol className="results-col ">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <ThreadSkeleton key={i} />)
          ) : (
            <SearchResults
              filterPage={filterPage}
              setFilterPage={setFilterPage}
            />
          )}
        </IonCol>
      </div>
    </>
  )
}

export default index
