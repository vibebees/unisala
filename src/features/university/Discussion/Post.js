import { useState } from "react"
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton
} from "@ionic/react"
import { Query } from "@apollo/client/react/components"
import Thread from "../../../component/thread"
import { GetUserPost } from "../../../graphql/user"
import { cloudOffline } from "ionicons/icons"
import { USER_SERVICE_GQL } from "servers/types"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"

export default function Review({ uniId }) {
  return (
    <Query
      query={GetUserPost}
      variables={{ unitId: uniId, page: 0, pageSize: 3 }}
      context={{ server: USER_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore }) => {
        const Posts = data?.getUserPost?.Posts || []

        const totalPosts = data?.getUserPost?.totalPosts || 0
        const [page, setPage] = useState(3)

        const fetchMoreHandler = () => {
          console.log("fetch more called")
          setPage((prev) => prev++)
          fetchMore({
            variables: {
              unitId: uniId,
              page: 0,
              pageSize: page + 1
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, {
                getUserPost: {
                  ...prev.getUserPost,
                  Posts: [
                    ...prev.getUserPost.Posts,
                    ...fetchMoreResult.getUserPost.Posts
                  ]
                }
              })
            }
          })
        }

        return (
          <>
            {Array.isArray(Posts) &&
              Posts.map((item, index) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderTop: "1px solid #e0e0e0"
                    }}
                    className="thread-card"
                    key={index}
                  >
                    <Thread thread={item} id={item?._id} />
                  </div>
                )
              })}

            <IonInfiniteScroll
              threshold="100px"
              onIonInfinite={(e) => {
                console.log(e)
                fetchMoreHandler()
                e.target.complete()
              }}
            >
              <IonInfiniteScrollContent>
                {Array.from(3).map((_, i) => (
                  <>
                    <h1>heheheh</h1>
                    <ThreadSkeleton key={i} />
                  </>
                ))}
              </IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}
