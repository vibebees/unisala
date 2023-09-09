import { useState, useEffect } from "react"
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react"
import "./Space.css"
import { personCircle } from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import {
  GetOwnSpace,
  GetTopActiveSpaces,
  GetUserPost
} from "../../../../graphql/user"
import emptyState from "../../../../assets/emptyState.png"
import UnisalaIntro from "../UnisalaIntro"
import { screenLessThan768 } from "../screens.lessThan768"
import { screenGreaterThan1000 } from "../screens.greater.1000"
import { USER_SERVICE_GQL } from "../../../../servers/types"
import { SpaceFeed } from "../SpaceFeed"
import SpaceIndexLeftBar from "./SpaceIndexLeftBar"
import SpaceIndexFeed from "./SpaceIndexFeed"
import StateMessage from "../../../component/stateMessage/index"

const SpaceIndex = () => {
  const { user, loggedIn } = useSelector((store) => store?.userProfile)
  const { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
    variables: { limit: 6 },
    context: { server: USER_SERVICE_GQL }
  })
  const { getTopActiveSpaces } = topSpaceData || {}

  const { data: yourSpaceData } = useQuery(GetOwnSpace, {
    variables: { count: 10 },
    context: { server: USER_SERVICE_GQL }
  })
  const { getOwnSpaceCategory } = yourSpaceData || {}

  const { data: userPosts } = useQuery(GetUserPost, {
    variables: { userId: user._id, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const { getUserPost } = userPosts || {}
  const [width, setWidth] = useState(window.innerWidth)
  const [activeProfile, setActiveProfile] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (width !== window.innerWidth) {
        setWidth(window.innerWidth)
      }
    })
    return () => {
      window.removeEventListener("resize", () => {
        if (width !== window.innerWidth) {
          setWidth(window.innerWidth)
        }
      })
    }
  }, [])

  const views = {
    greaterThan1000: screenGreaterThan1000({
      title: "Top Spaces",
      topSpaces: getTopActiveSpaces?.spaceCategory
    }),
    greaterThan768: SpaceIndexLeftBar({
      user,
      data: getOwnSpaceCategory?.spaceCategory
    }),
    lessThan768: screenLessThan768({
      setActiveProfile,
      personCircle,
      activeProfile,
      loggedIn,
      username: user.username
    })
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
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
          >
            {loggedIn ? (
              <SpaceIndexFeed posts={getUserPost?.Posts} />
            ) : (
              <UnisalaIntro />
            )}
          </IonCol>

          <IonCol className="max-w-max">
            {width > 1000 && views.greaterThan1000}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
export default SpaceIndex
