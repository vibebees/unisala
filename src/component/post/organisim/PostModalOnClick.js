import { useState, useRef } from "react"

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
  IonButtons
} from "@ionic/react"
import { arrowBack } from "ionicons/icons"

import "../index.css"

import "react-quill/dist/quill.snow.css"

import { Avatar } from "component/Avatar"
import Form from "../molecules/Form"

export const PostModalOnClick = ({ allProps }) => {
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [selectedTab, setSelectedTab] = useState()
  const [postData, setPostData] = useState(null)
  const profilePic = user?.picture

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
          type: "select",
          options: [],
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
          type: "select",
          options: [],
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
          type: "select",
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

  const buttonStyles = {
    0: "red",
    1: "blue",
    2: "green"
  }

  return (
    <IonModal
      onDidDismiss={() => setCreateAPostPopUp(false)}
      isOpen={createAPostPopUp}
      // style={{
      //   "--width": "60%",
      //   "--height": "%"
      // }}
    >
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a Discussion</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setPostData(null)
                setCreateAPostPopUp(false)
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div className="overflow-y-scroll threadScroll px-1 h-full ">
        {!selectedTab ? (
          <div className="grid place-items-center gap-y-8 mt-24">
            {Object.keys(metaData).map((item, i) => (
              <>
                <IonButton
                  className={`mt-0 hover:scale-95 transition-all ease-in`}
                  onClick={() => {
                    setPostData({ id: item })
                    setSelectedTab(item)
                  }}
                >
                  {metaData[item].name}
                </IonButton>
              </>
            ))}
          </div>
        ) : (
          <>
            <div className="relative">
              <IonButton
                fill="clear"
                className="absolute left-0 -top-2"
                onClick={() => {
                  setPostData(null)
                  setSelectedTab(null)
                }}
              >
                <IonIcon icon={arrowBack} />
              </IonButton>
              <IonText>
                <h1 className="text-center mt-2 text-xl">
                  {metaData[selectedTab].name}
                </h1>
              </IonText>
            </div>

            <IonItem className="ion-no-padding" lines="none">
              <IonAvatar>
                <Avatar username={user.username} profilePic={profilePic} />
              </IonAvatar>
              <IonLabel className="ion-padding-start">
                <h2 className="font-semibold">{user.username}</h2>
              </IonLabel>
            </IonItem>
            <Form
              metaData={metaData[selectedTab]}
              postData={postData}
              setPostData={setPostData}
              allProps={allProps}
            />
          </>
        )}
      </div>
    </IonModal>
  )
}
