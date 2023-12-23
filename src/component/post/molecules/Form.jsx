import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonToast
} from "@ionic/react"
import React, { useEffect, useState } from "react"
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
import ImageUpload from "./ImageUpload"

const Form = ({ metaData, postData, setPostData, allProps }) => {
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const [selected, setSelected] = useState({})
  const { user } = useSelector((state) => state.userProfile)
  const [files, setFiles] = useState(null)
  const [present, dismiss] = useIonToast()

  const client = useApolloClient()

  const formData = new FormData()
  let RatingData = [
    {
      value: 1,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Enraged%20Face.png",
      Emojis: "😡"
    },
    {
      value: 2,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png",
      Emojis: "😞"
    },
    {
      value: 3,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Neutral%20Face.png",
      Emojis: "😐"
    },
    {
      value: 4,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png",
      Emojis: "😊"
    },
    {
      value: 5,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Heart-Eyes.png",
      Emojis: "😍"
    }
  ]
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
                return [...existingImages, ...imageLinks]
              }
            }
          })
          setCreateAPostPopUp(false)
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
    setCreateAPostPopUp(false)
  }

  const generateInputTag = (item) => {
    return (
      <>
        <IonLabel htmlFor={item.id}>{item.name}</IonLabel>
        <IonInput
          id={item.id} // Add id attribute here
          name={item.name}
          type={item.type}
          className="border border-[#bdbdbd] rounded-sm"
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
    if (item.id === "userRating") {
      return (
        <>
          <IonLabel>{item.name}</IonLabel>
          <div className="flex justify-start gap-x-2">
            {RatingData.map((item, i) => (
              <div
                key={i}
                className="mt-2 cursor-pointer"
                onClick={() =>
                  setPostData((prev) => ({ ...prev, rating: item.value }))
                }
              >
                <img src={item.imageURL} alt="" width={48} />
              </div>
            ))}
          </div>
        </>
      )
    }
    return (
      <>
        <IonLabel htmlFor={item.id}>{item.name}</IonLabel>
        {item.api ? (
          <AsyncSelectAtom
            item={item}
            setPostData={setPostData}
            postData={postData}
          />
        ) : (
          <SelectAtom
            options={item.options}
            item={item}
            setPostData={setPostData}
            postData={postData}
          />
        )}
      </>
    )
  }

  console.log({ text: postData?.postText })

  const generateTextareaTag = (item) => {
    return (
      <>
        <IonLabel htmlFor={item.id}>{item.name}</IonLabel>
        <ReactQuill
          id={item.id} // Add id attribute here
          className="h-40 mb-12 text-black relative"
          theme="snow"
          onChange={(e) => setPostData((prev) => ({ ...prev, postText: e }))}
          value={postData?.postText}
        />
      </>
    )
  }

  const generateCheckbox = (item) => {
    return (
      <div className="flex mt-2 w-fit items-center">
        <IonLabel htmlFor={item.id}>{item.name}</IonLabel>

        <IonCheckbox
          className="ml-2 "
          id={item.id} // Add id attribute here
          name={item.name}
          onIonChange={(e) => {
            setPostData((prev) => ({
              ...prev,
              [item.id]: e.target.checked
            }))
          }}
        />
      </div>
    )
  }
  const generateHTML = (item) => {
    switch (item?.type) {
      case "input":
        return generateInputTag(item)
      case "checkbox":
        return generateCheckbox(item)
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
        {metaData.edges.map((item) => {
          return (
            <>
              <div className="mt-4">{generateHTML(item)}</div>
            </>
          )
        })}
        <ImageUpload files={files} setFiles={setFiles} />
        <IonButton type="submit">Submit</IonButton>
      </form>
    </div>
  )
}

export default Form
