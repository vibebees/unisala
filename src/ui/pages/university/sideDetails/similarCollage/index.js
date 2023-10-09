import React from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonText,
  IonIcon
} from "@ionic/react"
import {
  heart,
  chevronForwardOutline,
  chevronBackOutline
} from "ionicons/icons"
import SimilarCollegeCard from "../atoms/SimilarCollegeCard"
import { useSelector } from "react-redux"
import similarCollege from "./similarCollege.css"
const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const similarSchools = uniData?.similarSchools.similarSchools
  const similarCollage = uniData?.similarSchools.recommendedUniversity

  const handleRightScrollClick = () => {
    const container = document.querySelector(".similarschools")
    container?.scrollBy({
      left: 500,
      behavior: "smooth"
    })
  }
  const handleRightScrollClick2 = () => {
    const container = document.querySelector(".similarUniversity")
    container?.scrollBy({
      left: 500,
      behavior: "smooth"
    })
  }

  const handleLeftScrollClick = () => {
    const container = document.querySelector(".similarschools")
    container?.scrollBy({
      left: -500,
      behavior: "smooth"
    })
  }

  const handleLeftScrollClick2 = () => {
    const container = document.querySelector(".similarUniversity")
    container?.scrollBy({
      left: -500,
      behavior: "smooth"
    })
  }

  return (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <IonCardContent
        style={{
          borderBottom: "1px solid #C4C4C4"
        }}
      >
        <h1>Similar Collage</h1>
      </IonCardContent>
      <IonCardContent className="p-0 mt-4">
        <IonText className="text-lg px-12 h-fit py-0  ">
          Similar Schools
        </IonText>
        <IonGrid className=" flex w-full ">
          <button
            onClick={handleLeftScrollClick}
            className="bg-neutral-50 hover:bg-neutral-100 px-2"
          >
            <IonIcon icon={chevronBackOutline} />
          </button>
          <div className=" overflow-hidden flex similarcollegeContainer similarschools w-full max-md:w-full overflow-x-auto   ">
            {similarSchools?.map((item, index) => {
              return <SimilarCollegeCard key={index} {...item} />
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
      <IonCardContent className="p-0 mt-4">
        <IonText className="text-lg px-12 h-fit py-0  ">
          Recommended University
        </IonText>
        <IonGrid className=" flex w-full ">
          <button
            onClick={handleLeftScrollClick2}
            className="bg-neutral-50 hover:bg-neutral-100 px-2"
          >
            <IonIcon icon={chevronBackOutline} />
          </button>
          <div className=" overflow-hidden flex similarcollegeContainer similarUniversity w-full max-md:w-full overflow-x-auto   ">
            {similarCollage?.map((item, index) => {
              let data = {
                name: item
              }

              return <SimilarCollegeCard key={index} {...data} />
            })}
          </div>
          <button
            onClick={handleRightScrollClick2}
            className="bg-neutral-50 hover:bg-neutral-100 px-2"
          >
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}

export default index
