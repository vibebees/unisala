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
import { ButtonTrack } from "features/analytics/ButtonTrack"

export const PostModalOnClick = ({ allProps, metaData }) => {
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [selectedTab, setSelectedTab] = useState()
  const [postData, setPostData] = useState(null)
  const profilePic = user?.picture

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
            {metaData &&
              Object.keys(metaData).map((item, i) => (
                <>
                  <IonButton
                    className={`mt-0 hover:scale-95 transition-all ease-in`}
                    onClick={() => {
                      setSelectedTab(item)
                      ButtonTrack(
                        `${item} button clicked while creating a post`
                      )
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
