import { useEffect, useState } from "react"
import { IonButton, IonSpinner } from "@ionic/react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GetCommentList } from "../../../graphql/user"
import Comment from "./Comment"
import { USER_SERVICE_GQL } from "../../../servers/types"

function ShowMore({
  postId,
  parentId,
  user,
  setRefetchPosts,
  singlePost = false
}) {
  const [showMore, setShowMore] = useState(false)

  const [refetchComments, setRefetchComments] = useState(false)
  const [getCommentList, { data, loading, refetch }] = useLazyQuery(
    GetCommentList,
    {
      context: { server: USER_SERVICE_GQL }
    }
  )

  useEffect(() => {
    getCommentList({
      variables: {
        postId,
        parentId
      }
    })
  }, [postId, parentId])

  useEffect(() => {
    refetch()
    setRefetchComments(false)
  }, [refetchComments])

  if (loading) return <IonSpinner />

  if (singlePost) {
    return (
      <>
        {data?.commentList?.comments?.map((reply, i) => {
          return (
            <Comment
              comment={reply}
              key={i}
              singlePost={singlePost}
              postId={postId}
              parentId={parentId}
              setRefetchComments={setRefetchComments}
            />
          )
        })}
      </>
    )
  }

  return (
    <>
      {data?.commentList?.comments?.slice(0, 1).map((reply, i) => {
        return (
          <Comment
            comment={reply}
            key={i}
            singlePost={singlePost}
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
