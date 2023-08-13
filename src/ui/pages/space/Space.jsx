import { useState, useEffect } from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard,
  IonPage
} from "@ionic/react"
import "./Space.css"
import { personCircle } from "ionicons/icons"
import Post from "../../component/post/index"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import VerifyPostPop from "../../component/verifyPostPop/verifyPostPop"
import {
  GetProfileCard,
  GetSpaceCategory,
  GetTopActiveSpaces
} from "../../../graphql/user"
import unisalaImg from "../../../assets/unisala-intro.png"
import { SpaceFeed } from "./SpaceFeed"
import UnisalaIntro from "./UnisalaIntro"
import { screenLessThan768 } from "./screens.lessThan768"
import { screensMoreThan768 } from "./screens.moreThan768"
import { screenGreaterThan1000 } from "./screens.greater.1000"
import useDocTitle from "../../../hooks/useDocTitile"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { CreateAPost } from "../../component/post/CreateAPost"
import { useParams } from "react-router-dom"

export const Spaces = () => {
  const params = useParams()

  useDocTitle("Unisala")

  // TOP SPACES
  const { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
    variables: { limit: 6 },
    context: { server: USER_SERVICE_GQL }
  })

  console.log(topSpaceData, "1")
  const { getTopActiveSpaces } = topSpaceData || {}
  // console.log(getTopActiveSpaces)

  const { user, loggedIn } = useSelector((store) => store?.userProfile),
    profileData =
      loggedIn &&
      useQuery(GetProfileCard, {
        context: { server: USER_SERVICE_GQL },
        variables: {
          username: user?.username
        }
      }),
    [width, setWidth] = useState(window.innerWidth),
    handleResize = () => {
      const { innerWidth } = window
      if (width !== innerWidth) {
        setWidth(innerWidth)
      }
    },
    [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    views = {
      greaterThan1000: screenGreaterThan1000({
        title: "Top Space",
        topSpaces: getTopActiveSpaces?.spaceCategory
      }),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        profileData,
        loggedIn
      }),
      lessThan768: screenLessThan768({
        setActiveProfile,
        personCircle,
        activeProfile,
        loggedIn,
        username: user.username
      })
    },
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [verfiyAPostPopUp, setVerifyAPostPopUp] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // from the params check if this is a parent space, the below query only returns id if it is parent space
  const { data } = useQuery(GetSpaceCategory, {
    context: { server: USER_SERVICE_GQL },
    variables: { q: params.category }
  })
  const { searchSpaceCategory } = data || {}
  const spaceId = searchSpaceCategory?.spaceCategory[0]?._id
  const parentId = searchSpaceCategory?.spaceCategory[0]?.parentId // this could be null as the current space could be parent in itself
  let tags = []

  // condition because we do not want to send null datas to backend
  if (spaceId) {
    tags.push(spaceId)
  }
  if (parentId) {
    tags.push(parentId)
  }

  return (
    <IonContent color="light">
      <VerifyPostPop setPopup={setVerifyAPostPopUp} popup={verfiyAPostPopUp} />
      <CreateAPost
        setPopup={setCreateAPostPopUp}
        popup={createAPostPopUp}
        tags={tags}
      />

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
            {loggedIn ? (
              <SpaceFeed spaceId={spaceId} userInfo={user} />
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
