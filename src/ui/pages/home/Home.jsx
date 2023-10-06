import React from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard
} from "@ionic/react"
import {CreateAPostCard} from "../../component/post/index"
import { useQuery } from "@apollo/client"
import { GetProfileCard } from "../../../graphql/user"
import UnisalaIntro from "./UnisalaIntro"
import { USER_SERVICE_GQL } from "../../../servers/types"
import "./Home.css"
import WelcomeSteps from "../../component/authentication/Welcome"
import useDocTitle from "../../../hooks/useDocTitile"
import { InfinteFeed } from "./InfiniteScrollFeed"

export const Home = ({ allProps }) => {
  useDocTitle("Unisala")

  const {
    width,
    newUser,
    user,
    loggedIn,
    views
  } = allProps || {}

  const profileDataResult = useQuery(GetProfileCard, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      username: user?.username
    },
    skip: !loggedIn || !user?.username
  })

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
                <InfinteFeed userInfo={user} allProps={allProps} />
              </>
            ) : (
              <UnisalaIntro />
            )}
          </IonCol>
          {/* view on the left famous school */}
          {width > 1000 && views.greaterThan1000}
          {loggedIn && newUser && <WelcomeSteps allProps={allProps} />}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
