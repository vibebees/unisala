import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonIcon
} from "@ionic/react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import CourseCard from "component/courseCard"
import noResultsFound from "assets/no-results.jpg"
import "./index.css"
import { arrowUpOutline } from "ionicons/icons"

function index({ filterPage, setFilterPage }) {
  const { searchData } = useSelector((store) => store?.university || [])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  return searchData?.length ? (
    <div className="relative">
      {Array.isArray(searchData) &&
        searchData.map((data, index) => {
          return (
            <Link to={`/university/${data?.name}`} key={index}>
              <CourseCard allProps={data} />
            </Link>
          )
        })}
      <IonInfiniteScroll
        threshold="100px"
        onIonInfinite={(e) => {
          // if searchParams has more than 2 items then it infers filter is applied, in this case add page for paginated data
          setFilterPage((prev) => prev + 1)
          e.target.complete()
        }}
      >
        <IonInfiniteScrollContent
          loadingText="Loading more data..."
          loadingSpinner="dots"
        >
          {filterPage > 1 && <h1 className="text-[#488AFF]">Loading.....</h1>}
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  ) : (
    <IonCard className="flex items-center justify-center space-x-12">
      <img
        alt="unisala: no results found"
        className="w-fit"
        src={noResultsFound}
      />
      <IonCardHeader className="">
        <IonCardTitle>Apply filters to search universities</IonCardTitle>
        <IonCardSubtitle>
          There were not any saved views, recent queries, or source matching
          your search.
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  )
}

export default index
