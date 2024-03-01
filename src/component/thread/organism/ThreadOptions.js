import React, { useState } from "react"
import { IonIcon, useIonToast } from "@ionic/react"
import { ellipsisHorizontalOutline, create, trash } from "ionicons/icons"
import { useMutation } from "@apollo/client"
import { USER_SERVICE_GQL } from "servers/types"
import { DeletePost, GetUserPost, getNewsFeed } from "graphql/user"
import { useLocation } from "react-router-dom"

const ThreadOptions = ({ loggedinUser, username, _id, setEditable }) => {
  const pathname = useLocation().pathname
  const [showOptions, setShowOptions] = useState(false)
  const [present, dismiss] = useIonToast()
  const isHome = pathname === "/" || pathname === "/home"

  const [deletePost] = useMutation(DeletePost, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      postId: _id
    },

    update: (cache, data) => {
      const cachedData = cache.readQuery(
        isHome
          ? {
              query: getNewsFeed,
              variables: {
                userId: loggedinUser._id,
                page: 0
              }
            }
          : {
              query: GetUserPost,
              variables: {
                userId: loggedinUser._id,
                page: 0
              }
            }
      )

      cache.writeQuery(
        isHome
          ? {
              query: getNewsFeed,
              variables: {
                userId: loggedinUser._id,
                page: 0
              },

              data: {
                fetchMyNewsFeed: {
                  ...cachedData.fetchMyNewsFeed,
                  ...cachedData.fetchMyNewsFeed.filter(
                    (post) => post._id !== _id
                  )
                }
              }
            }
          : {
              query: GetUserPost,
              variables: {
                userId: loggedinUser._id,
                page: 0
              },
              data: {
                getDicussionUniWall: {
                  ...cachedData.getDicussionUniWall,
                  Posts: cachedData.getDicussionUniWall.filter(
                    (post) => post._id !== _id
                  )
                }
              }
            }
      )
    },

    onCompleted: (data) => {
      console.log("delete called")
      const { deletePost } = data
      if (deletePost.success) {
        // refetch posts
        setShowOptions(false)
        present({
          duration: 3000,
          message: "Post Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      } else {
        present({
          duration: 3000,
          message: deletePost?.message
        })
      }
    }
  })

  if (loggedinUser?.username === username) {
    return (
      <div className="absolute top-4 right-8">
        <div className="relative">
          <button onClick={() => setShowOptions((prev) => !prev)}>
            <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
          </button>

          {showOptions && (
            <div className="absolute w-[160px] -right-6 top-5 z-[100] bg-[#fafafa] rounded-xl px-6 py-4 shadow-xl">
              <button
                onClick={() => {
                  setEditable(true)
                  setShowOptions(false)
                }}
                className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1 text-gray font-bold hover:bg-[#f1eeee]"
              >
                <IonIcon icon={create} className="text-xl" />
                Update
              </button>
              <button
                onClick={() => deletePost(_id)} // Assuming 'deletePost' is a function defined to handle the deletion
                className="w-full py-1.5 rounded-lg flex justify-center items-center gap-1.5 text-gray font-bold hover:bg-[#f1eeee]"
              >
                <IonIcon icon={trash} className="text-xl" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export default ThreadOptions
