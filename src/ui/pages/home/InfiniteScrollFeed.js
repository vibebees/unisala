import { useEffect, useState } from "react"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { getNewsFeed } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import CourseCard from "../../component/courseCard"
import Thread from "../../component/thread"
import { FeedSkeleton } from "../../component/skeleton/feedSkeleton"

export const InfinteFeed = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)

  const {page, setPage} = allProps
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: { userId: user._id, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const Posts = data?.fetchMyNewsFeed

  if (!Posts && loading) {
    return <FeedSkeleton />
  }

  const loadMore = async (e) => {
    setPage((currentPage) => currentPage + 1)
    await fetchMore({
      variables: {
        userId: user._id,
        page: page + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchMyNewsFeed: [...prev.fetchMyNewsFeed, ...fetchMoreResult.fetchMyNewsFeed]
        }
      }
    })
    e.target.complete()
  }
return (
    <div>
      {Posts?.map((item) => (
        item.type === "university" ? (
          <Link key={item._id} to={`/university/${item._id}`}>
            <CourseCard {...item} />
          </Link>
        ) : (
          <div
            style={{ width: "100%", marginTop: "10px", borderTop: "1px solid #e0e0e0" }}
            key={item._id}
          >
              <Thread thread={item} id={item._id} allProps={allProps} />
          </div>
        )
      ))}

      <IonInfiniteScroll threshold="100px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="loading..." />
      </IonInfiniteScroll>
    </div>
  )
}
