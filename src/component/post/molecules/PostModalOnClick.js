import { useState, useRef } from "react"
import { useMutation, useApolloClient, gql } from "@apollo/client"
import { useSelector } from "react-redux"

import {
  IonAvatar,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  useIonToast
} from "@ionic/react"
import { closeOutline, imageOutline } from "ionicons/icons"

import "../index.css"

import "react-quill/dist/quill.snow.css"
import TextEditor from "utils/components/TextEditor"
import axios from "axios"
import clsx from "clsx"
import { USER_SERVICE_GQL } from "servers/types"
import { AddPost, GetAllPostBySpaceCategoryID, getNewsFeed } from "graphql/user"
import { userServer } from "servers/endpoints"
import TextChecker from "utils/components/TextChecker"
import { Avatar } from "component/Avatar"

export const PostModalOnClick = ({ allProps }) => {
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [present, dismiss] = useIonToast()
  const client = useApolloClient()
  const imgfile = useRef()
  const [postText, setPostText] = useState("")
  const [files, setFiles] = useState(null)

  const profilePic = user?.picture
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

  const metaData = {
    suggestMeUniversity: {
      id: "suggestMeUniversity",
      name: "Suggest me University",
      type: "tag",
      options: null,
      api: false,
      validation: null,
      edges: [
        {
          id: "levelOfStudy",
          name: "Level of Study",
          type: "select",
          options: ["Undergraduate", "Graduate", "PhD"],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {
            Undergraduate: [
              {
                id: "testScores",
                name: "Test Scores",
                type: "select",
                options: ["SAT", "ACT", "GRE", "GMAT"],
                api: false,
                validation: null,
                edges: [],
                conditionalEdges: {}
              }
            ],
            Graduate: [
              {
                id: "testScores",
                name: "Test Scores",
                type: "select",
                options: ["SAT", "ACT", "GRE", "GMAT"],
                api: false,
                validation: null,
                edges: [],
                conditionalEdges: {}
              }
            ]
          }
        },
        {
          id: "major",
          name: "Major",
          type: "input",
          options: null,
          api: true,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "gpa",
          name: "GPA",
          type: "input",
          options: null,
          api: false,
          validation: {
            min: 0,
            max: 4
          },
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "testScores",
          name: "Test Scores",
          type: "select",
          options: ["SAT", "ACT", "GRE", "GMAT"],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "preferredLocation",
          name: "Preferred Location",
          type: "input",
          options: null,
          api: true,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "additionalDescriptionQuestion",
          name: "Additional Description",
          type: "textarea",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        }
      ],
      conditionalEdges: {}
    },
    questionAboutUniversity: {
      id: "questionAboutUniversity",
      name: "I Have a Question About a University",
      type: "tag",
      options: null,
      api: false,
      validation: null,
      edges: [
        {
          id: "levelOfStudy",
          name: "Level of Study",
          type: "select",
          options: ["Undergraduate", "Graduate", "PhD"],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {
            Undergraduate: [
              {
                id: "testScores",
                name: "Test Scores",
                type: "select",
                options: ["SAT", "ACT", "GRE", "GMAT"],
                api: false,
                validation: null,
                edges: [],
                conditionalEdges: {}
              }
            ],
            Graduate: [
              {
                id: "testScores",
                name: "Test Scores",
                type: "select",
                options: ["SAT", "ACT", "GRE", "GMAT"],
                api: false,
                validation: null,
                edges: [],
                conditionalEdges: {}
              }
            ]
          }
        },
        {
          id: "universitySearch",
          name: "University Search Field",
          type: "input",
          options: null,
          api: true,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "relationToMajor",
          name: "Relation to Major/Field of Study",
          type: "checkbox",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "reviewSubCategories",
          name: "Related Tags",
          type: "tag",
          options: [
            "Admissions & Applications",
            "Financial Aid & Scholarships",
            "Academic Programs & Department",
            "Student Life & Services",
            "Career & Alumni Resources",
            "Athletics & Recreation",
            "Cultural & Arts Activities",
            "Sustainability & Campus Initiatives"
          ],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "additionalDescriptionQuestion",
          name: "Additional Description",
          type: "textarea",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        }
      ],
      conditionalEdges: {}
    },
    reviewUniversity: {
      id: "reviewUniversity",
      name: "Review University",
      type: "tag",
      options: null,
      api: false,
      validation: null,
      edges: [
        {
          id: "universitySearch",
          name: "University Search Field",
          type: "input",
          options: null,
          api: true,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "relationToMajor",
          name: "Relation to Major/Field of Study",
          type: "checkbox",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "reviewSubCategories",
          name: "Related Tags",
          type: "tag",
          options: [
            "Admissions & Applications",
            "Financial Aid & Scholarships",
            "Academic Programs & Department",
            "Student Life & Services",
            "Career & Alumni Resources",
            "Athletics & Recreation",
            "Cultural & Arts Activities",
            "Sustainability & Campus Initiatives"
          ],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "userRating",
          name: "Your Ratings",
          type: "select",
          options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "additionalDescriptionQuestion",
          name: "Additional Description",
          type: "textarea",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "anonymityOption",
          name: "Anonymity Option",
          type: "checkbox",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        },
        {
          id: "guidelinesReminder",
          name: "Guidelines Reminder",
          type: "label",
          options: null,
          api: false,
          validation: null,
          edges: [],
          conditionalEdges: {}
        }
      ],
      conditionalEdges: {}
    }
  }

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

    if (postText.length > 0 || files?.length > 0) {
      addPost({
        variables: {
          postText: TextChecker(postText),
          tags
        }
      })
      setCreateAPostPopUp(false)
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

  const handleRemoveFile = (index) => {
    const newFiles = Array.from(files)

    newFiles.splice(index, 1)
    setFiles(newFiles)
  }
  // text editor
  return (
    <IonModal
      onDidDismiss={() => setCreateAPostPopUp(false)}
      isOpen={createAPostPopUp}
    >
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a Discussion</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setCreateAPostPopUp(false)}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <form
        onSubmit={handleSubmit}
        className="overflow-y-scroll threadScroll px-1 h-full "
      >
        {/* <div className="post-preview">
          <IonItem className="ion-no-padding" lines="none">
            <IonAvatar>
              <Avatar username={user.username} profilePic={profilePic} />
            </IonAvatar>
            <IonLabel className="ion-padding-start">
              <h2>{user.username}</h2>
            </IonLabel>
          </IonItem>

          <TextEditor postText={postText} setPostText={setPostText} />

          {files?.length > 0 ? (
            <div
              className={clsx(
                "grid gap-x-4 items-center justify-center",
                files.length === 1 ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {files.length > 0 &&
                Array.from(files).map((file, i) => (
                  <div className="relative mt-16" key={i}>
                    <img
                      src={URL.createObjectURL(file)}
                      className="post-image-preview"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="absolute right-0 top-2 w-6 h-6 rounded-full bg-[#585C5F] flex items-center justify-center hover:bg-opacity-80"
                    >
                      <IonIcon icon={closeOutline} color="light" className="" />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="mt-20 flex justify-center items-center">
              <label
                onDragOver={(e) => e.preventDefault()}
                // onDrop={handleImageDrop}
                htmlFor="post-image"
                className="flex flex-col items-center"
              >
                <IonIcon
                  icon={imageOutline}
                  className="text-3xl text-[#818080]"
                />
                <h5 className="text-[#818080] font-medium text-xl">
                  Upload your image
                </h5>
              </label>
              <input
                type="file"
                ref={imgfile}
                accept="image/*"
                multiple
                hidden
                onChange={(e) => setFiles(e.target.files)}
                id="post-image"
              />
            </div>
          )}
        </div> */}

        {/* <IonButton
          className="post-pop-button mt-5"
          type="submit"
          expand="full"
          slot=""
          shape="round"
        >
          Post
        </IonButton> */}

        {/* <IonText className="">
          <h1 className="text-black text-center mt-2 text-2xl">
            Tell us whats on your mind
          </h1>
        </IonText> */}

        {/* <div className="grid place-items-center gap-y-8 mt-24 ">
          {Object.keys(metaData).map((item, i) => (
            <>
              <IonButton className="mt-0 hover:scale-95 transition-all ease-in">
                {metaData[item].name}
              </IonButton>
            </>
          ))}
        </div> */}

        <div className="mt-2 grid grid-cols-3">
          {Object.keys(metaData).map((item, i) => (
            <>
              <IonButton
                size="small"
                className="text-xs p-0 mt-0 hover:scale-95 transition-all ease-in underline"
                fill="clear"
              >
                {metaData[item].name}
              </IonButton>
            </>
          ))}
        </div>
        <h1 className="text-black text-center  w-full mt-16">
          this will be section for "other" catergory here we will directly show
          text area for user to post content
        </h1>
      </form>
    </IonModal>
  )
}
