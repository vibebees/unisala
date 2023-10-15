import React from "react"
import Ranking from "../molecules/Ranking"
import { useSelector } from "react-redux"
import { IonCard, IonCardContent } from "@ionic/react"

const index = () => {
  const { uniData, sidebar } = useSelector((store) => store?.university)
  const ranking = uniData?.userEvaluation?.rankings

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
        Ranking
      </h2>
      <div>
        <Ranking data={ranking} />
      </div>
    </IonCard>
  )
}

export default index
