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

  console.log({ searchData })
  return searchData?.length ? (
    <>
      {Array.isArray(searchData) &&
        searchData.map((data, index) => {
          return (
            <Link to={`/university/${data?.elevatorInfo?.name}`} key={index}>
              <CourseCard
                name={data?.elevatorInfo?.name}
                city={data?.elevatorInfo?.city}
                average={data?.report?.average}
                act={data?.applicants?.actRange}
                acceptanceRate={data?.applicants?.acceptanceRate}
                picture={data?.pictures}
              />
            </Link>
          )
        })}
    </>
  ) : (
    <IonCard style={{ textAlign: "center" }}>
      <img alt="unisala: no results found" src={noResultsFound} />
      <IonCardHeader>
        <IonCardTitle>Sorry! No result found &#9785;</IonCardTitle>
        <IonCardSubtitle>
          There were not any saved views, recent queries, or source matching
          your search.
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  )
}

export default index
