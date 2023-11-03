import React from "react"
import SingleImageCard from "../molecules/SingleImageCard"
import { IonCardContent, IonText, IonGrid, IonIcon } from "@ionic/react"
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons"
import similarCollege from "./similarCollege.css"
import clsx from "clsx"

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
    <IonCardContent className="p-0 mt-4">
      <IonText className="text-lg px-12 h-fit py-0  ">{title}</IonText>
      <IonGrid className=" flex w-full ">
        <button
          onClick={handleLeftScrollClick}
          className="bg-neutral-50 hover:bg-neutral-100 px-2"
        >
          <IonIcon icon={chevronBackOutline} />
        </button>
        <div
          className={clsx(
            " overflow-hidden flex similarcollegeContainer  w-full max-md:w-full overflow-x-auto   ",
            className
          )}
        >
          {data?.map((item, index) => {
            return <SingleImageCard key={index} allProps={item} />
          })}
        </div>
        <button
          onClick={handleRightScrollClick}
          className="bg-neutral-50 hover:bg-neutral-100 px-2"
        >
          <IonIcon icon={chevronForwardOutline} />
        </button>
      </IonGrid>
    </IonCardContent>
  )
}

export default ScrollableCard
