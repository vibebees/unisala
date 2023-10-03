import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import CourseCard from "../../../../component/courseCard"
import noResultsFound from "../../../../../assets/no-results.jpg"
import "./index.css"

function index() {
  const {searchData} = useSelector((store) => store?.university || [])

  return searchData?.length ? (
    <>
      {Array.isArray(searchData) &&
        searchData.map((data, index) => {
          return (
            <Link to={`/university/${data?.name}`} key={index}>
              <CourseCard
                name={data?.name}
                city={data?.city}
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
    <IonCard style={{textAlign: "center"}}>
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
