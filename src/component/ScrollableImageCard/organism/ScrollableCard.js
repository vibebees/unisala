import React from "react"
import SingleImageCard from "../molecules/SingleImageCard"
import { IonCardContent, IonText, IonGrid, IonIcon } from "@ionic/react"
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons"
import similarCollege from "./similarCollege.css"
import clsx from "clsx"
import CustomTrackingLink from "features/analytics/LinkTrack"

const ScrollableCard = ({ allProps }) => {
  const { title, data, className } = allProps

  const handleRightScrollClick = () => {
    const container = document.querySelector(`.${className}`)
    container?.scrollBy({
      left: 500,
      behavior: "smooth"
    })
  }

  const handleLeftScrollClick = () => {
    const container = document.querySelector(`.${className}`)
    container?.scrollBy({
      left: -500,
      behavior: "smooth"
    })
  }
  return (
    <IonCardContent className="p-0 ion-no-padding mt-4 ion-no-margin w-full ">
      <IonText className="text-lg px-12 h-fit py-0  ">{title}</IonText>
      <IonGrid className=" flex ion-no-padding h-full gap-0 ion-no-margin">
        <button
          onClick={handleLeftScrollClick}
          className="bg-neutral-50 active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-neutral-100 "
        >
          <IonIcon size="large" icon={chevronBackOutline} />
        </button>
        <div
          className={clsx(
            " overflow-hidden  flex similarcollegeContainer  max-md:w-full overflow-x-auto   ",
            className
          )}
        >
          {data?.map((item, index) => {
            return (
              <CustomTrackingLink
                to={"/university/" + item?.name}
                key={index}
                destination={"/university"}
                description={"clicked on university card"}
              >
                <SingleImageCard key={index} allProps={item} />
              </CustomTrackingLink>
            )
          })}
        </div>
        <button
          onClick={handleRightScrollClick}
          className="bg-neutral-50 active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-opacity-60 "
        >
          <IonIcon size="large" icon={chevronForwardOutline} />
        </button>
      </IonGrid>
    </IonCardContent>
  )
}

export default ScrollableCard
