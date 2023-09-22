import { useState } from "react"
import { IonGrid, IonRow, IonCol, IonContent, IonCard } from "@ionic/react"
import Post from "../../component/post/index"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
import { GetProfileCard, GetTopActiveSpaces } from "../../../graphql/user"
import HomeFeed from "./HomeFeed"
import UnisalaIntro from "./UnisalaIntro"

import useDocTitle from "../../../hooks/useDocTitile"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { CreateAPost } from "../../component/post/CreateAPost"
import useWindowWidth from "../../../hooks/useWindowWidth"
import "./Home.css"
import WelcomeSteps from "../../component/authentication/Welcome"
import {InfinteFeed} from "./InfiniteScrollFeed"
import {screenGreaterThan1000, screenLessThan768, screensMoreThan768} from "./helper.func"

export const Home = ({allProps}) => {
  useDocTitle("Unisala")

  console.log({allProps})
  const {
    unisalaImg,
    activeTab,
    setActiveTab,
    createAPostPopUp,
    setCreateAPostPopUp,
    verfiyAPostPopUp,
    setVerifyAPostPopUp,
    width,
    newUser,
    setNewUser,
    activeProfile,
    setActiveProfile,
    user,
    loggedIn,
    GetTopActiveSpaces,
    views
  } = allProps || {},
    {data: topSpaceData} = useQuery(GetTopActiveSpaces, {
      variables: {limit: 4},
      context: {server: USER_SERVICE_GQL}
    }),
    {getTopActiveSpaces} = topSpaceData || {},
    profileDataResult = useQuery(GetProfileCard, {
      context: {server: USER_SERVICE_GQL},
      variables: {
        username: user?.username
      },
      skip: !loggedIn || !user?.username
    }),
    profileData = profileDataResult?.data || null

  return (
    <IonContent color="light">
      <VerifyPostPop setPopup={setVerifyAPostPopUp} popup={verfiyAPostPopUp} />
      <CreateAPost setPopup={setCreateAPostPopUp} popup={createAPostPopUp} />

      {width < 768 && views.lessThan768}
      <IonGrid
        style={{
          width: width >= 768 ? "95%" : "100%",
          margin: "auto",
          maxWidth: "1200px"
        }}
      >
        <IonRow
          style={{
            justifyContent: "flex-start",
            margin: "0 auto"
          }}
          className="max-width-container"
        >
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
          >
            {loggedIn && width >= 768 && (
              <IonCard
                style={{ marginBottom: "20px" }}
                onClick={() => {
                  setCreateAPostPopUp(true)
                }}
              >
                <Post />
              </IonCard>
            )}
            {loggedIn ? <InfinteFeed userInfo={user} allProps={allProps} /> : <UnisalaIntro />}
          </IonCol>
          {width > 1000 && views.greaterThan1000}
          {loggedIn && newUser && <WelcomeSteps setNewUser={setNewUser} />}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
