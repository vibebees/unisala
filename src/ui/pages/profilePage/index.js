import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react"
import useWindowWidth from "../../../hooks/useWindowWidth"
import TopUniversitySidebar from "../../component/TopUniversitySidebar"
import ProfileHeader from "./profileHeader"
import ProfileBody from "./profileBody"
import Threads from "./threads"
import Guestbook from "./guestbook"
import Saved from "./saved"
import jwtDecode from "jwt-decode"
import { useQuery } from "@apollo/client"
import { getUserGql } from "../../../graphql/user"
import useDocTitle from "../../../hooks/useDocTitile"
import noResultsFound from "../../../assets/no-results.jpg"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useSelector } from "react-redux"

const ProfilePage = () => {
  let windowWidth = useWindowWidth()
  const [tab, setTab] = useState(0)
  const { username } = useParams()
  const history = useHistory()
  const { user: loggedInUser } = useSelector((state) => state.userProfile)

  const { data } = useQuery(getUserGql, {
    context: { server: USER_SERVICE_GQL },
    variables: { username: username }
  })
  useDocTitle(username)

  const { getUser } = data || {}

  const myProfile = username === loggedInUser?.username

  const {
    firstName,
    lastName,
    picture,
    coverPicture,
    oneLinerBio,
    location,
    socialLinks,
    about,
    badges,
    education,
    testScore,
    _id,
    doj
  } = getUser?.user || {}

  const profilePic = picture

  const profileHeaderData = {
    _id,
    firstName,
    lastName,
    username,
    profilePic,
    coverPicture,
    oneLinerBio,
    location,
    socialLinks,
    myProfile,
    doj,
    connectionType: getUser?.connectionType
  }

  const profileBodyData = {
    username,
    about,
    badges,
    education,
    testScore,
    myProfile
  }

  const locate = useLocation()

  const tabMap = {
    0: "profile",
    1: "threads",
    2: "guestbook",
    3: "saved",
    4: "roadmap"
  }

  // this effect is responsible to show the component(target users who probably came by following a link)
  useEffect(() => {
    const query = new URLSearchParams(locate.search).get("tab")
    if (!query) {
      history.push("?tab=profile")
    } else {
      switch (query) {
        case "threads":
          setTab(1)
          break
        case "guestbook":
          setTab(2)
          break
        case "saved":
          setTab(3)
          break

        case "roadmap":
          setTab(4)
          break
        default:
          setTab(0)
      }
    }
  }, [])

  // this effect handles tab selections

  useEffect(() => {
    history.push(`?tab=${tabMap[tab]}`)
  }, [tab])

  if (!getUser?.user) {
    return (
      <IonContent>
        <IonCard
          style={{ textAlign: "center", marginInline: "auto" }}
          className="max-width-container"
        >
          <img alt="unisala: no results found" src={noResultsFound} />
          <IonCardHeader>
            <IonCardTitle>
              Sorry, this page is not available. &#9785;
            </IonCardTitle>
            <IonCardSubtitle>
              The link you followed may be broken, or the page may have been
              removed.
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    )
  }

  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonRow>
          <IonCol>
            <ProfileHeader tab={tab} setTab={setTab} data={profileHeaderData} />
            {tab === 0 && getUser?.user && (
              <ProfileBody data={profileBodyData} />
            )}
            {tab === 1 && <Threads userId={_id} firstName={firstName} />}
            {tab === 2 && <Guestbook userId={_id} firstName={firstName} />}
            {tab === 4 && <Saved userId={_id} firstName={firstName} />}
          </IonCol>
          {windowWidth >= 1080 && (
            <IonCol className="sidebar">
              <TopUniversitySidebar />
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default ProfilePage
