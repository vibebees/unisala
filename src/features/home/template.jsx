import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { CreateAPostCard } from "../../component/post/template/index"

import WelcomeSteps from "../../component/authentication/Welcome"
import { InfinteFeed } from "../../component/feed/Feed"
import "./Home.css"

import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "graphql/uni"

import { fetchFamousUniversities } from "graphql/user"
import useDocTitle from "hooks/useDocTitile"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "servers/types"
import FloatingButton from "../../component/FloatingButton"
import ScrollableCard from "../../component/ScrollableImageCard/organism/ScrollableCard"
import { FolderStructure } from "../../component/folderStructure"
import { UnisalaLandingPage } from "./UnisalaIntro"

export const Home = ({ allProps }) => {
  useDocTitle("Unisala")
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
      <CreateAPostCard allProps={allProps} />
      <FolderStructure
        allProps={{
          ...allProps,
          folderName: "",
          data: userGuide,
          popUp: false,
          customHeight: false
        }}
      />

      <ScrollableCard
        allProps={{
          data: discoverUni,
          className: "similarschoolss"
        }}
      />

      <InfinteFeed userInfo={user} allProps={allProps} feedType="newsfeed" />
    </>
  )

  const renderNewUserView = React.useCallback(() => {
    if (loggedIn && newUser) {
      return <WelcomeSteps allProps={{ ...allProps, refetch }} />
    }
    return null
  }, [loggedIn, newUser])

  return (
    <IonContent color="light">
      <FloatingButton />
      {width < 768 && views.lessThan768}
      <IonGrid
        style={{
          margin: "auto"
        }}
        className="max-md:px-0"
      >
        <IonRow
          style={{ justifyContent: "flex-start", margin: "0 auto" }}
          className="max-width-container"
        >
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "900px",
              margin: "auto",

              overflow: "hidden"
            }}
            className="max-md:px-0 "
          >
            {loggedIn ? renderLoggedInView() : UnisalaLandingPage({ allProps })}
          </IonCol>
          {width > 1000 && views.greaterThan1000}
          {renderNewUserView()}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

