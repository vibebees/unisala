import { useEffect, useState } from "react"
import { IonButton, IonSpinner } from "@ionic/react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import Comment from "./Comment"
import { USER_SERVICE_GQL } from "servers/types"
import { GetCommentList } from "graphql/user"

function ShowOtherComments({
  postId = "",
  parentId = "",
  user,
  setRefetchPosts,
  numberOfComments,
  singlePost = false,
  postCommentsCount
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
      {data?.commentList?.comments
        ?.slice(0, numberOfComments)
        .map((reply, i) => {
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
      {!singlePost && postCommentsCount && postCommentsCount > 1 && (
        <Link
          to={`thread/${postId}`}
          className="px-16 block  mt-4 text-base hover:text-neutral-800"
        >
          View all comments
        </Link>
      )}
    </>
  )
}

export default ShowOtherComments
