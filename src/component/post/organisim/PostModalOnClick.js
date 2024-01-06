import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react"

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
import { arrowBack, search, star } from "ionicons/icons"

import "../index.css"

import "react-quill/dist/quill.snow.css"

import { Avatar } from "component/Avatar"
import Form from "../molecules/Form"
import { ButtonTrack } from "features/analytics/ButtonTrack"
import { useHistory, useLocation } from "react-router-dom"
import { htmlForEditor } from "../utils/htmlForEditor"

export const PostModalOnClick = ({ allProps, metaData }) => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  const universityName = useLocation().pathname.split("university/")[1]

  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const { user } = useSelector((state) => state.userProfile)
  const [selectedTab, setSelectedTab] = useState()
  const [postData, setPostData] = useState({
    id: selectedTab
  })

  useLayoutEffect(() => {
    if (params.get("create")) {
      setCreateAPostPopUp(true)
      setSelectedTab(params.get("type"))
    }
  }, [params, createAPostPopUp])

  useEffect(() => {
    setPostData((prevPostData) => {
      return {
        ...prevPostData,
        id: selectedTab,
        unitId: parseFloat(params.get("unitId")) || null
      }
    })
  }, [selectedTab])

  const profilePic = user?.picture

  const handleTabSelection = (item) => {
    setSelectedTab(item)
    setPostData({ id: item })
    params.append("type", item)
    history.push({ search: params.toString() })
    ButtonTrack(`${item} button clicked while creating a post`)
  }

  return (
    <IonModal
      onDidDismiss={() => {
        params.delete("create")
        params.delete("type")
        history.push({
          search: params.toString()
        })
        setCreateAPostPopUp(false)
      }}
      isOpen={createAPostPopUp}
    >
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a Discussion</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setPostData(null)
                setCreateAPostPopUp(false)
                params.delete("create")
                params.delete("type")
                history.push({ search: params.toString() })
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
                    onClick={() => handleTabSelection(item)}
                    color={metaData[item]?.color}
                  >
                    {metaData[item]?.name}
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
                  params.delete("type")
                  history.push({ search: params.toString() })
                }}
              >
                <IonIcon icon={arrowBack} />
              </IonButton>
              <IonText>
                <h1 className="text-center mt-2 text-xl">
                  {metaData[selectedTab]?.name}
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

            {metaData && (
              <Form
                metaData={metaData[selectedTab]}
                postData={postData}
                setPostData={setPostData}
                allProps={allProps}
              />
            )}
          </>
        )}
      </div>
    </IonModal>
  )
}
