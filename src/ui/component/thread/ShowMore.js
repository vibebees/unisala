import { useEffect, useState } from "react"
import { IonButton, IonSpinner } from "@ionic/react"
import { useLazyQuery } from "@apollo/client"
import { GetCommentList } from "../../../graphql/user"
import Comment from "./Comment"
import { USER_SERVICE_GQL } from "../../../servers/types"

function ShowMore({ postId, parentId, user, setRefetchPosts }) {
  const [showMore, setShowMore] = useState(false)

  const [refetchComments, setRefetchComments] = useState(false)
  const [getCommentList, { data, loading, refetch }] = useLazyQuery(
    GetCommentList,
    {
      context: { server: USER_SERVICE_GQL }
    }
  )

  useEffect(() => {
    refetch()
    setRefetchComments(false)
  }, [refetchComments])

  return (
    <>
      <IonButton
        fill="clear"
        color="primary"
        size="small"
        style={{ margin: "2rem 0 0 5rem" }}
        onClick={() => {
          setShowMore((state) => !state)
          getCommentList({
            variables: {
              postId,
              parentId
            }
          })
        }}
      >
        {loading && <IonSpinner />}
        {showMore ? "Show Less" : "Show More"}
      </IonButton>

      {showMore &&
        data?.commentList?.comments?.map((reply, i) => {
          return (
            <Comment
              comment={reply}
              key={i}
              postId={postId}
              parentId={parentId}
              setRefetchComments={setRefetchComments}
            />
          )
        })}
    </>
  )
}

export default ShowMore
