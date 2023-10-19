import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CourseCard from "../../../../component/courseCard"
import noResultsFound from "../../../../../assets/no-results.jpg"
import "./index.css"
import { useQuery } from "@apollo/client"
import { UniFilterResults } from "../../../../../graphql/uni"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function index() {
  const { searchData } = useSelector((store) => store?.university || [])

  return searchData?.length ? (
    <>
      {Array.isArray(searchData) &&
        searchData.map((data, index) => {
          return (
            <Link to={`/university/${data?.name}`} key={index}>
              <CourseCard allProps={data} />
            </Link>
          )
        })}
    </>
  ) : (
    <IonCard style={{ textAlign: "center" }}>
      <img alt="unisala: no results found" src={noResultsFound} />
      <IonCardHeader>
        <IonCardTitle>Sorrsy! No result found &#9785;</IonCardTitle>
        <IonCardSubtitle>
          There were not any saved views, recent queries, or source matching
          your search.
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  )
}

export default index

