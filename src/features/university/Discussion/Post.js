import { useState } from "react"
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton
} from "@ionic/react"
import { Query } from "@apollo/client/react/components"
import Thread from "../../../component/thread"
import { GetUserPost } from "../../../graphql/user"

export default function Review({ uniId }) {
  return (
    <Query
      query={GetUserPost}
      variables={{ unitId: uniId, page: 0, pageSize: 3 }}
      context={{ server: "USER_SERVICE_GQL" }}
    >
      {({ data, loading, fetchMore }) => {
        const Posts = data?.getUserPost?.Posts || []
        const totalPosts = data?.getUserPost?.totalPosts || 0
        const [page, setPage] = useState(0)

        const fetchMoreHandler = () => {
          setPage(page + 1)
          fetchMore({
            variables: {
              unitId: uniId,
              page: page + 1,
              pageSize: 3
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

            {loading && <p>loading...</p>}
            {Array.isArray(Posts) && Posts.length > 0 && (
              <div className="flex justify-center py-7">
                <IonButton size="small" onClick={fetchMoreHandler}>
                  {loading ? "Loading" : "See More"}
                </IonButton>
              </div>
            )}
          </>
        )
      }}
    </Query>
  )
}
