import { useEffect } from "react"
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
import { useQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../../graphql/uni/"
import { UNIVERSITY_SERVICE_GQL } from "../../../../servers/types"

function index({ query }) {
  const windowWidth = useWindowWidth()
  const dispatch = useDispatch()
  const { data } = useQuery(UniSearchDataList, {
    context: { server: UNIVERSITY_SERVICE_GQL },
    variables: { name: query }
  })
  useEffect(() => {
    dispatch(searchGetSuccess(data?.searchSchool))
  }, [data])

  return (
    <>
      <IonRow>
        {windowWidth > 768 ? (
          <IonCol className="filter-col">
            <Filter />
          </IonCol>
        ) : (
          <>
            <IonMenu className="" contentId="main-content">
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Filters</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonCol className="max-h-max">
                <Filter />
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

        <IonCol className="results-col">
          <SearchResults />
        </IonCol>
      </IonRow>
    </>
  )
}

export default index

