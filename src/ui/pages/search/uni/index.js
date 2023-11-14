import { useEffect, useState } from "react"
import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import Filter from "./Filter"
import SearchResults from "./SearchResults"
import { useDispatch } from "react-redux"
import useWindowWidth from "../../../../hooks/useWindowWidth"
import { searchGetSuccess } from "../../../../store/action/index"
import { useLazyQuery, useQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../../graphql/uni/"
import { UNIVERSITY_SERVICE_GQL } from "../../../../servers/types"
import { LoadingScreen } from "ui/component/courseCard"
import { ThreadSkeleton } from "ui/component/skeleton/threadSkeleton"
import { useHistory, useLocation } from "react-router"

function index({ query }) {
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [isLoading, setIsLoading] = useState(false)
  const [getUni, { data, loading }] = useLazyQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL }
  })
  useEffect(() => {
    // if there are less than 2 queryParams (which are q and tab) that means there is not filter related query
    if (searchParams.size < 2) {
      getUni({ variables: { name: query } })
      dispatch(searchGetSuccess(data?.searchSchool))
    }
  }, [data])

  return (
    <>
      <IonRow>
        {windowWidth > 768 ? (
          <IonCol className="filter-col">
            <Filter setIsLoading={setIsLoading} />
          </IonCol>
        ) : (
          <>
            <IonMenu className="" contentId="main-content">
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Filters</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonCol className="max-h-max filter-col">
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
