import React, {useEffect} from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard,
  IonItem
} from "@ionic/react"
import {CreateAPostCard} from "../../component/post/index"
 import { getUserProfile } from "../../../graphql/user"
import UnisalaIntro from "./UnisalaIntro"
 import "./Home.css"
import WelcomeSteps from "../../component/authentication/Welcome"
import useDocTitle from "../../../hooks/useDocTitile"
import { InfinteFeed } from "./InfiniteScrollFeed"
import AffliatedUniCard from "../../component/courseCard"
import {Link} from "react-router-dom"
import {useQuery} from "@apollo/client"
import {getUpdatedSchoolInfo} from "../../../graphql/uni"
import {UNIVERSITY_SERVICE_GQL} from "../../../servers/types"
import {LikeATag} from "../../component/tags"

export const Home = ({ allProps }) => {
  useDocTitle("Unisala")

  const {
    width,
    newUser,
    user,
    loggedIn,
    views,
    refetch,
    userInfo = {}
  } = allProps || {},
    {interestedUni} = userInfo,
    [unitId] = interestedUni || []

  if (userInfo) {
    const { loading: schoolLoading, data: schoolData } = useQuery(getUpdatedSchoolInfo(unitId), {
      context: { server: UNIVERSITY_SERVICE_GQL }
    })
    allProps.schoolData = schoolData?.getUpdatedSchoolInfo.elevatorInfo
    allProps.schoolDataLoading = schoolLoading
    allProps.onSearch = false
  }

  return (
    <IonContent color="light">
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
          {/* view on the right i.e profile */}
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
          >
            {loggedIn ? (
              <>
                <CreateAPostCard allProps={allProps} />
                <Link to={`/university/${allProps.schoolData?.name}`}>
                  {/* <IonItem >
                    I can Review
                  </IonItem> */}
                  <LikeATag colorTitle="green" colorValue="red" value={"I can review!"} />
                  <AffliatedUniCard allProps={{...allProps.schoolData, onSearch: false}} />

                </Link>
                 <InfinteFeed userInfo={user} allProps={allProps} />
              </>
            ) : (
              <UnisalaIntro />
            )}
          </IonCol>
          {/* view on the left famous school */}
          {width > 1000 && views.greaterThan1000}
          {loggedIn && newUser && <WelcomeSteps allProps={{...allProps, refetch}} />}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
