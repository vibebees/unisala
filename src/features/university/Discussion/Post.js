import { Query } from "@apollo/client/react/components"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import { useState } from "react"
import { USER_SERVICE_GQL } from "servers/types"
import Thread from "../../../component/thread"
import { GetUserPost } from "../../../graphql/user"

export default function Review({ uniId }) {
  return (
    <Query
      query={GetUserPost}
      variables={{ unitId: uniId, page: 0, pageSize: 20 }}
      context={{ server: USER_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore }) => {
        const Posts = data?.getUserPost?.Posts || []
        const totalPosts = data?.getUserPost?.totalPosts || 0
        const [page, setPage] = useState(0)

        return (
          <>
            {Array.isArray(Posts) && Posts.length > 0 ? (
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
              })
            ) : (
              <h1 className="text-4xl font-bold text-center mt-6">
                No reviews yet!
              </h1>
            )}

            <IonInfiniteScroll
              threshold="100px"
              onIonInfinite={(e) => {
                setPage(page + 1)
                fetchMore({
                  variables: {
                    unitId: uniId,
                    page: page + 1
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
                setTimeout(() => e.target.complete(), 500)
              }}
            >
              <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}
