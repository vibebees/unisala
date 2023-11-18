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
import { useHistory, useLocation } from "react-router"
import { closeOutline } from "ionicons/icons"

function index({ query }) {
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [isLoading, setIsLoading] = useState(false)
  const { data, loading } = useQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    variables: { name: query || "" },
    skip: searchParams.size > 2
  })
  useEffect(() => {
    dispatch(searchGetSuccess(data?.searchSchool))
  }, [data])

  return (
    <>
      <IonRow className="">
        {windowWidth > 768 ? (
          <IonCol className="filter-col">
            <Filter setIsLoading={setIsLoading} />
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
                <Filter setIsLoading={setIsLoading} />
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
          {loading || isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <ThreadSkeleton key={i} />)
          ) : (
            <SearchResults />
          )}
        </IonCol>
      </IonRow>
    </>
  )
}

export default index
