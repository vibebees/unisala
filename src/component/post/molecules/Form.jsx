import { IonButton, IonInput, IonLabel, useIonToast } from "@ionic/react"
import React, { useState } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import AsyncSelectAtom from "../atoms/AsyncSelect"
import SelectAtom from "../atoms/Select"
import { AddPost, GetAllPostBySpaceCategoryID, getNewsFeed } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { useSelector } from "react-redux"
import { useApolloClient, useMutation } from "@apollo/client"
import TextChecker from "utils/components/TextChecker"
import axios from "axios"
import { userServer } from "servers/endpoints"

const Form = ({ metaData, postData, setPostData, allProps }) => {
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const [selected, setSelected] = useState({})
  const { user } = useSelector((state) => state.userProfile)
  const [files, setFiles] = useState(null)
  const [present, dismiss] = useIonToast()
  const client = useApolloClient()

  const formData = new FormData()

  const [addPost] = useMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },

    update: (cache, { data: { addPost } }) => {
      const post = {
        postText: addPost.post.postText,
        date: addPost.post.date,
        _id: addPost.post._id,
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture || null
        },
        upVoteCount: 0,
        postCommentsCount: 0,
        upVoted: false,
        type: "post",
        saved: false,
        images: addPost.post.images || [],
        __typename: "PostNewsFeed"
      }
      if (!tags) {
        const data = cache.readQuery({
          query: getNewsFeed,
          variables: { userId: user._id, page: 0 },
          context: { server: USER_SERVICE_GQL }
        })
        data &&
          cache.writeQuery({
            query: getNewsFeed,
            variables: { userId: user._id, page: 0 },
            context: { server: USER_SERVICE_GQL },
            data: {
              fetchMyNewsFeed: [post, ...data.fetchMyNewsFeed]
            }
          })
      } else {
        const data = cache.readQuery({
          query: GetAllPostBySpaceCategoryID,
          variables: { id: tags[0] }, // tags array is made such that the 0th index is space id and 1st index is parent id
          context: { server: USER_SERVICE_GQL }
        })

        data &&
          cache.writeQuery({
            query: GetAllPostBySpaceCategoryID,
            variables: { id: tags[0] },
            context: { server: USER_SERVICE_GQL },
            data: {
              getAllPostBySpaceCategoryID: {
                ...data.getAllPostBySpaceCategoryID,
                posts: [post, ...data.getAllPostBySpaceCategoryID.posts]
              }
            }
          })
      }
    },

    onCompleted: async (data) => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("image", files[i])
        }
        const res = await axios.post(
          userServer + `/post/addPostImage/${data.addPost.post._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )

        if (res.data.success) {
          const imageLinks = res.data.post.images
          client.cache.modify({
            id: client.cache.identify({
              __typename: "PostNewsFeed",
              _id: data.addPost.post._id
            }),
            fields: {
              postText(existingImages = []) {
                console.log(existingImages)
                return [...existingImages, ...imageLinks]
              }
            }
          })
        }
      }
      present({
        duration: 3000,
        message: "Post added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
      setCreateAPostPopUp(false)
      // setfile("")
    },
    onError: (error) => {
      present({
        duration: 5000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleSubmit = (e) => {
    console.log("submiting")
    e.preventDefault()

    if (files?.length > 4) {
      present({
        duration: 3000,
        message: "Maximum allowed files is 4.",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
      return
    }

    if (postData?.postText?.length > 0 || files?.length > 0) {
      addPost({
        variables: {
          ...postData,
          testScoreMark: {
            satScore: 1600
          }
        }
      })
    } else {
      present({
        duration: 3000,
        message: "Please include something to post",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  }

  const generateInputTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <IonInput
          name={item.name}
          className=""
          onIonChange={(e) => {
            setPostData((prev) => ({
              ...prev,
              [item.id]: parseFloat(e.target.value)
            }))
          }}
        />
      </>
    )
  }
  const generateSelectTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        {item.api ? (
          <AsyncSelectAtom item={item} setPostData={setPostData} />
        ) : (
          <SelectAtom
            options={item.options}
            item={item}
            setPostData={setPostData}
          />
        )}
      </>
    )
  }

  const generateTextareaTag = (item) => {
    return (
      <>
        <IonLabel>{item.name}</IonLabel>
        <ReactQuill
          className="h-40 mb-12 text-black relative"
          theme="snow"
          onChange={(e) => setPostData((prev) => ({ ...prev, postText: e }))}
          value={postData.postText}
        />
      </>
    )
  }

  const generateHTML = (item) => {
    switch (item?.type) {
      case "input":
        return generateInputTag(item)
      case "select":
        return generateSelectTag(item)
      case "textarea":
        return generateTextareaTag(item)
      default:
        return null
    }
  }

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit}>
        {metaData.edges.map((item) => (
          <>
            <div className="mt-4">{generateHTML(item)}</div>
          </>
        ))}
        <IonButton type="submit">Submit</IonButton>
      </form>
    </div>
  )
}

export default Form
