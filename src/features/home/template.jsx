import React, { useContext, useEffect, useState } from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard,
  IonItem
} from "@ionic/react"
import { CreateAPostCard } from "../../component/post/index"

import "./Home.css"
import WelcomeSteps from "../../component/authentication/Welcome"
import { InfinteFeed } from "./InfiniteScrollFeed"

import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "graphql/uni"

import { FolderStructure } from "../../component/folderStructure"
import { UnisalaLandingPage } from "./UnisalaIntro"
import ScrollableCard from "../../component/ScrollableImageCard/organism/ScrollableCard"
import { fetchFamousUniversities } from "graphql/user"
import FloatingButton from "../../component/FloatingButton"
import useDocTitle from "hooks/useDocTitile"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "servers/types"
import { HomePageContext } from "./HomePageContext"

export const Home = () => {
  useDocTitle("Unisala")
  const { allProps } = useContext(HomePageContext)

  const {
    width,
    newUser,
    user,
    loggedIn,
    views,
    refetch,
    userInfo = {},
    generateUserGuide
  } = allProps || {}

  const { interestedUni } = userInfo || {}
  const [unitId] = interestedUni || []

  const [userGuide, setUserGuide] = useState([])
  const [userSchoolData, setUserSchoolData] = useState({})

  const { loading: schoolLoading, data: schoolData } = useQuery(
    getUpdatedSchoolInfo(unitId),
    {
      variables: { unitId },
      context: { server: UNIVERSITY_SERVICE_GQL }
    }
  )
  const { data: famousUniversities } = useQuery(fetchFamousUniversities, {
    variables: { limit: 100, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const discoverUni = famousUniversities?.getFamousUniversity

  useEffect(() => {
    const generatedUserGuide = generateUserGuide(
      userInfo,
      schoolData?.getUpdatedSchoolInfo?.elevatorInfo
    )
    setUserGuide(generatedUserGuide)
  }, [schoolData])

  const renderLoggedInView = () => (
    <>
      <CreateAPostCard />
      <FolderStructure
        allProps={{
          ...allProps,
          folderName: "",
          data: userGuide,
          popUp: false
        }}
      />

      <ScrollableCard
        allProps={{
          data: discoverUni,
          className: "similarschoolss"
        }}
      />

      <InfinteFeed />
    </>
  )

  const renderNewUserView = () => {
    if (loggedIn && newUser) {
      return <WelcomeSteps />
    }
    return null
  }
  return (
    <IonContent color="light">
      <FloatingButton />
      {width < 768 && views.lessThan768}
      <IonGrid
        style={{
          width: width >= 768 ? "95%" : "100%",
          margin: "auto",
          maxWidth: "1200px"
        }}
      >
        <IonRow
          style={{ justifyContent: "flex-start", margin: "0 auto" }}
          className="max-width-container"
        >
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)",
              overflow: "hidden"
            }}
          >
            {loggedIn ? renderLoggedInView() : UnisalaLandingPage()}
          </IonCol>
          {width > 1000 && views.greaterThan1000}
          {renderNewUserView()}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
