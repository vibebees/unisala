import { Query } from "@apollo/client/react/components"
import {
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import emptyState from "assets/emptyState.png"
import CourseCard from "component/courseCard"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
import StateMessage from "component/stateMessage"
import Thread from "component/thread"
import { GetMyNewsFeed } from "graphql/user/"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { USER_SERVICE_GQL } from "servers/types"

function index({ userId, firstName }) {
  return (
    <Query
      query={GetMyNewsFeed}
      variables={{ userId, page: 0 }}
      context={{ server: USER_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore, refetch }) => {
        const Posts = data?.fetchMyNewsFeed || []
        const { user } = useSelector((state) => state.userProfile)
        const [page, setPage] = useState(0)

        if (!data?.fetchMyNewsFeed.length) {
          return (
            <IonCard className="max-md:mx-1">
              <StateMessage
                title={
                  user._id === userId
                    ? `You have not posted anything yet!`
                    : `${firstName} has not posted anything yet!`
                }
                subtitle="All the posts will be visible here"
              >
                <img src={emptyState} alt="empty state" className="state-img" />
              </StateMessage>
            </IonCard>
          )
        }

        return (
          <div>
            {Array.isArray(Posts) &&
              Posts.map((item, index) => {
                return item.type === "university" ? (
                  <Link key={index} to={`/university/${index}`}>
                    <CourseCard allProps={item} />
                  </Link>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderTop: "1px solid #e0e0e0"
                    }}
                    className="thread-card"
                    key={index}
                  >
                    <Thread refetch={refetch} thread={item} id={item?._id} />
                  </div>
                )
              })}

            {loading &&
              ["0", "1", "2"].map((item) => {
                return <ThreadSkeleton key={item} />
              })}

            <IonInfiniteScroll
              onIonInfinite={(e) => {
                setPage(page + 1)
                fetchMore({
                  variables: {
                    userId,
                    page: page + 1
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    return Object.assign({}, prev, {
                      fetchMyNewsFeed: [
                        ...prev?.fetchMyNewsFeed,
                        ...fetchMoreResult?.fetchMyNewsFeed
                      ]
                    })
                  }
                })
                setTimeout(() => e.target.complete(), 500)
              }}
            >
              <IonInfiniteScrollContent loadingText="loading..."></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </div>
        )
      }}
    </Query>
  )
}

export default index
