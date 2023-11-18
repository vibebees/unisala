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
import {CreateAPostCard} from "../../component/post"

export const Spaces = ({allProps}) => {
  // TOP SPACES

  const {
    handleResize, loggedIn, spaceId, parentId, tags, loading, spaceCategory,
    searchSpaceCategory, user, width, views

  } = allProps
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // condition because we do not want to send null datas to backend
  if (spaceId) {
    tags.push(spaceId)
  }
  if (parentId) {
    tags.push(parentId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!spaceCategory) {
    return <SpaceNotFound />
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
      <button
        className={clsx(
          "w-10 h-10 rounded-full hover:shadow-lg hover:bg-neutral-300 duration-200 transition-all ease-linear bg-neutral-200 grid place-content-center fixed right-10 bottom-6"
        )}
        onClick={() => {
          let ThreadContainer = document.querySelector(".ThreadContainer")
          ThreadContainer.scrollIntoView({ behavior: "smooth" })
        }}
      >
        <IonIcon
          icon={arrowUpOutline}
          class="text-neutral-700 text-lg"
        ></IonIcon>
      </button>
    </IonContent>
  )
}
