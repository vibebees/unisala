import React from "react"
import RankingCard from "../atoms/RankingCard"
import { IonCard } from "@ionic/react"

const Ranking = ({ data }) => {
  return (
    <IonCard className="flex gap-8 px-9 py-10 !flex-wrap w-full">
      {data?.map((item, index) => {
        return <RankingCard key={index} item={item} />
      })}
    </IonCard>
  )
}

export default Ranking
