import { useEffect } from "react"
import { IonCol, IonRow } from "@ionic/react"
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
        {windowWidth > 768 && (
          <IonCol className="filter-col">
            <Filter />
          </IonCol>
        )}

        <IonCol className="results-col">
          <SearchResults />
        </IonCol>
      </IonRow>
    </>
  )
}

export default index

