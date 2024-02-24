import { IonCol, IonContent, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { arrowUpOutline } from "ionicons/icons"
import { useEffect } from "react"
import { SpaceNotFound } from "../../component/PageNotFound"
import { InfiniteFeed } from "../../component/feed/Feed"
import { CreateAPostCard } from "../../component/post/template"
import PreLoader from "../../component/preloader"
import Tabs from "../../component/tabs"
import Invitation from "./Invitation/Index"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import { Members } from "./org/members"
export const Spaces = ({ allProps }) => {
  const {
    handleResize,
    loggedIn,
    orgId,

    tags,
    loading,
    orgData,
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
  if (orgId && !tags.includes(orgId)) {
    tags.push(orgId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!orgData) {
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
      <InfiniteFeed feedType="specificOrg" feedId={orgId} />
    </>
  )

  const tabs = {
    feed: <Feed />,
    org: <Members />,
    // history: <History />,
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

            {/* <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
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
            </div> */}
          </div>
        </IonCol>
      </div>
    ),
    invite: <Invitation orgId={orgId} />
    // ,
    // apply: (<Apply />),
    //
  }
  const SpaceBody = () => {
    return tabs[tab]
  }
  const Space = () => (
    <IonCol className="colStyle ThreadContainer">
      <SpaceHeader spaceDetails={orgData} />
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

