import { useEffect } from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCard,
  IonPage,
  IonIcon,
  IonInput
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
import { Event } from "./org/event"
import { StudyAbroadRoadmapInput } from "features/roadmap/template"
import { apply } from "ramda"
import { SqueezeBox } from "component/squeezeBox"
import { History } from "./org/history"
import Invitation from "./Invitation/Index"

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
    document
      .querySelector(".ThreadContainer")
      .scrollIntoView({ behavior: "smooth" })
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
          className="max-width-container flex-nowrap"
        >
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
            className="ThreadContainer"
          >
            <SpaceHeader spaceDetails={searchSpaceCategory?.spaceCategory} />
            {loggedIn && width >= 768 && (
              <CreateAPostCard allProps={allProps} />
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
      <button className="scrollButton" onClick={scrollToTop}>
        <IonIcon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </IonContent>
  )
}
