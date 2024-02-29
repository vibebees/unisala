import { useEffect, useLayoutEffect, useState } from "react"

import { useSelector } from "react-redux"

import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { arrowBack } from "ionicons/icons"

import "../index.css"

import "react-quill/dist/quill.snow.css"

import { Avatar } from "component/Avatar"
import { ButtonTrack } from "features/analytics/ButtonTrack"
import { useHistory, useLocation } from "react-router-dom"
import Form from "../molecules/Form"

export const PostModalOnClick = ({ allProps, metaData }) => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  const { setCreateAPostPopUp, createAPostPopUp, tags } = allProps
  const { user, loggedIn } = useSelector((state) => state.userProfile)
  const [selectedTab, setSelectedTab] = useState()
  const [allowPost, setAllowPost] = useState(loggedIn)
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
        unitId: parseFloat(params.get("unitId")) || null,
        tags: allProps.tags && tags
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
      mode="ios"
      className="rounded-md"
    >
      <IonHeader className="">
        <IonToolbar>
          <IonTitle>Start a Discussion</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                params.delete("create")
                params.delete("type")
                history.push({
                  search: params.toString()
                })
                setCreateAPostPopUp(false)
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {allowPost ? (
        <div className="overflow-y-scroll threadScroll px-1 h-full ">
          {!selectedTab ? (
            <div className="grid place-items-center gap-y-8 mt-24">
              {metaData &&
                Object.keys(metaData).map((item, i) => (
                  <div key={i}>
                    <IonButton
                      className={`mt-0 hover:scale-95 transition-all ease-in`}
                      onClick={() => handleTabSelection(item)}
                      color={metaData[item]?.color}
                    >
                      {metaData[item]?.name}
                    </IonButton>
                  </div>
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
      ) : (
        <div className="p-4 grid place-items-center">
          <div></div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
            className="w-28 "
          />
          <IonText className="mt-4 w-4/5">
            <h1 className="text-lg text-center ">
              We recommend signing in so that we could provide you with the best
              experience in future. 😃
            </h1>
          </IonText>

          <IonButton
            expand="block"
            className="mt-4 w-4/5"
            onClick={() => {
              params.delete("create")
              params.delete("type")
              setCreateAPostPopUp(false)
              params.set("uni", location.pathname.split("university/")[1])
              history.push({ search: params.toString() })
              ButtonTrack(
                "Not logged user attempted to login when we was about to post on university page"
              )
              setTimeout(() => {
                history.push("/login")
              })
            }}
          >
            Login
          </IonButton>

          <IonButton
            color={"warning"}
            className="mt-4 w-4/5"
            onClick={() => {
              setAllowPost(true)
              ButtonTrack("Not logged user wants to post without logging in")
            }}
          >
            Continue without logging in
          </IonButton>
        </div>
      )}
    </IonModal>
  )
}
