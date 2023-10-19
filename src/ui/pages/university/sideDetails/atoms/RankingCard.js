import React from "react"

import { IonCol } from "@ionic/react"

const RankingCard = ({ item }) => {
  let src
  if (item.rank < 50) {
    src =
      " https://static.vecteezy.com/system/resources/previews/023/234/869/original/transparent-golden-cup-trophy-for-victory-win-at-contest-as-an-award-and-prize-for-achievement-png.png"
  } else {
    src = "https://pngimg.com/d/award_PNG44.png"
  }

  return (
    <IonCol className=" py-3  bg-neutral-100 px-0 shadow-md rounded-md flex justify-center flex-col items-center w-16 overflow-hidden  !shrink-0  ">
      <div className="w-full h-36 ">
        <img src={src} alt="" className="w-full h-full object-contain" />
      </div>

      <div>
        <h3 className="text-center px-5 py-3 leading-5 text-lg !font-medium text-neutral-600">
          {item.title}
        </h3>
        <h2 className=" text-center flex justify-center font-medium text-base items-center">
          Rank :
          <p className="text-center pt-1 px-1 text-blue-500">{item.rank}</p>
        </h2>
      </div>
    </IonCol>
  )
}

export default RankingCard
