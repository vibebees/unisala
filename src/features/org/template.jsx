import { useEffect, useRef } from "react"
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

  const Feed = () => (
    <>
      <CreateAPostCard allProps={allProps} />
      <SpaceFeed />
    </>
  )

  const tabs = {
    feed: <Feed />,
    org: <Members />,
    history: <History />,
    apply: (
      <div className="bg-white">
        <IonCol>
          <h4 className="font-semibold pl-4">Your next steps</h4>
          <div className="h-full mt-4 px-4 border border-neutral-400 border-opacity-20 rounded-md py-6">
            <div className="flex items-center  w-full">
              {/* <StepInput
                  currentstep={"1/10"}
                  label={"Enter your ILETS Test Result"}
                  placeholder={"Enter score"}
                  inputType={"number"}
                  setInput={setdata}
                  name={"stepOne"}
                  inputValue={data.stepOne}
                  key={1}
                /> */}
            </div>

            <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
              <span className="text-sm text-neutral-400">2/10</span>
              <div className="flex items-center h-fit gap-4 py-2">
                <label htmlFor="Gpa" className="text-sm h-fit">
                  Enter your ILETS Test Result
                </label>
                <IonInput
                  placeholder="Enter Test Score"
                  type="number"
                  className="w-fit h-3 placeholder:text-neutral-400 placeholder:text-xs placeholder:text-opacity-40"
                ></IonInput>
              </div>
            </div>
            <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
              <span className="text-sm text-neutral-400">3/10</span>
              <div className="flex items-center h-fit gap-4 py-2">
                <label htmlFor="Gpa" className="text-sm h-fit">
                  Enter your ILETS Test Result
                </label>
                <IonInput
                  placeholder="Enter Test Score"
                  type="number"
                  className="w-fit h-3  placeholder:text-neutral-400   placeholder:text-xs placeholder:text-opacity-40"
                ></IonInput>
              </div>
            </div>
          </div>
        </IonCol>
      </div>
    ),
    invite: <Invitation spaceId={spaceId} />
  }
  const SpaceBody = () => {
    return tabs[tab]
  }
  const Space = () => (
    <IonCol className="colStyle ThreadContainer">
      <SpaceHeader spaceDetails={searchSpaceCategory?.spaceCategory} />
      <IonRow class="bg-white">
        <Tabs config={configSegment} />
      </IonRow>
      <div className="min-h-[50vh]">
        <SpaceBody />
      </div>
    </IonCol>
  )

  return (
    <IonContent className="h-full" color="light">
      {width < 768 && views.lessThan768}
      <IonGrid className={width >= 768 ? "gridStyle" : "gridStyleFull"}>
        <IonRow className="rowStyle">
          {width > 768 && views.greaterThan768}

          <Space />
          {width > 1200 && (
            <IonCol className="max-w-max">{views.greaterThan1000}</IonCol>
          )}
        </IonRow>
      </IonGrid>
      <button className="scrollButton" onClick={scrollToTop}>
        <IonIcon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </IonContent>
  )
}
