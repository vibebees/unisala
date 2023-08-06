import { useState } from "react"
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react"
import { Query } from "@apollo/client/react/components"
import Thread from "../../../component/thread"
import { GetUserPost } from "../../../../graphql/user"

export default function Review({ uniId }) {
  return (
    <Query
      query={GetUserPost}
      variables={{ unitId: uniId, page: 0, pageSize: 10 }}
      context={{ server: "USER_SERVICE_GQL" }}
    >
      {({ data, loading, fetchMore }) => {
        const Posts = data?.getUserPost?.Posts || []
        const totalPosts = data?.getUserPost?.totalPosts || 0
        const [page, setPage] = useState(0)

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

            {loading && <p>loading...</p>}

            {totalPosts > Posts.length && (
              <IonInfiniteScroll
                onIonInfinite={(e) => {
                  setPage(page + 1)
                  fetchMore({
                    variables: {
                      unitId: uniId,
                      page: page + 1,
                      pageSize: 10
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
                <IonInfiniteScrollContent loadingText="loading..."></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            )}
          </>
        )
      }}
    </Query>
  )
}
