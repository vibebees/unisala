import { useEffect } from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard,
  IonPage,
  IonIcon
} from "@ionic/react"
import "./Space.css"
import { arrowUpOutline } from "ionicons/icons"
import clsx from "clsx"
import { SpaceFeed } from "./SpaceFeed"
import UnisalaIntro from "./UnisalaIntro"
import SpaceHeader from "./SpaceHeader"
import PreLoader from "../../component/preloader"
import { SpaceNotFound } from "../../component/PageNotFound"
import { CreateAPostCard } from "../../component/post/template"
import Tabs from "../../component/tabs"
import { Members } from "./org/members"
import {Event} from "./org/event"
export const Spaces = ({ allProps }) => {
  // TOP SPACES

  const {
    handleResize,
    loggedIn,
    spaceId,
    parentId,
    tags,
    loading,
    spaceCategory,
    searchSpaceCategory,
    user,
    width,
    views,
    configSegment,
    tab,
    setTab
  } = allProps
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])



  useEffect(() => {
    const queryString = window.location.search
    const queryParams = new URLSearchParams(queryString)
    const flagValue = queryParams.get("address") || "feed"

    setTab(flagValue)
}, [window.location.search])

  // condition because we do not want to send null datas to backend
  if (spaceId && !tags.includes(spaceId)) {
    tags.push(spaceId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!spaceCategory) {
    return <SpaceNotFound />
  }
const scrollToTop = () => {
  document.querySelector(".ThreadContainer").scrollIntoView({ behavior: "smooth" })
}

  const Feed = () => (<>
    <CreateAPostCard allProps={allProps} />
    <SpaceFeed spaceId={spaceId} userInfo={user} />
  </>)


  const tabs = {
    feed: <Feed />,
    members: <Members/>,
    events: <Members/>
  }
  const SpaceBody = () => {
    return tabs[tab]
  }
  const Space = () => (
    <IonCol className="colStyle ThreadContainer">
      <SpaceHeader spaceDetails={searchSpaceCategory?.spaceCategory} />
      <IonRow className="bg-white" >
        <Tabs config ={configSegment} />
      </IonRow>
      <SpaceBody />
    </IonCol>
  )

/*
  return (
    <IonContent color="light">
    {width < 768 && views.lessThan768}
    <IonGrid className={width >= 768 ? "gridStyle" : "gridStyleFull"}>
      <IonRow className="rowStyle">
        {width > 768 && views.greaterThan768}
        <Space/>
        {width > 1000 && <IonCol className="max-w-max">{views.greaterThan1000}</IonCol>}
      </IonRow>
    </IonGrid>
    <button className="scrollButton" onClick={scrollToTop}>
      <IonIcon icon={arrowUpOutline} className="scrollIcon" />
    </button>
  </IonContent>
  )
  */
  return (
    <IonContent color="light">
    {width < 768 && views.lessThan768}
    <IonGrid className={width >= 768 ? "gridStyle" : "gridStyleFull"}>
        <IonRow className="rowStyle">
        {width > 768 && views.greaterThan768}

          <Space />
          {width > 1200 && <IonCol className="max-w-max">{views.greaterThan1000}</IonCol>}

      </IonRow>

    </IonGrid>
    <button className="scrollButton" onClick={scrollToTop}>
      <IonIcon icon={arrowUpOutline} className="scrollIcon" />
    </button>
  </IonContent>
  )
}
