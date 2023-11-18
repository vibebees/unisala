import React from "react"
import { IonRow, IonCol } from "@ionic/react"

const index = () => {
  return (
    <>
      <IonRow className=" !px-0 border  h-full rounded-md border-neutral-300 border-opacity-75 pt-2">
        <IonCol className="w-full h-full  px-0">
          <h2 className="text-center relative  font-medium text-lg mb-3">
            Your recent progress
          </h2>

          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
              You have applied for the vis
            </p>
          </div>
          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
              You have applied for the vis
            </p>
          </div>
          <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
            <p className="w-[10rem]  h-full text-sm opacity-40">2022 sep 23</p>
            <p className=" block text-sm h-full opacity-70">
              You have applied for the vis
            </p>
          </div>

          <div className="  absolute bottom-0 h-10 w-full  px-4 bg-gradient-to-t from-neutral-300 to-transparent border-opacity-25 items-baseline border-op justify-start flex">
            <button className="w-full py-2 text-center text-base hover:text-neutral-800 transition-colors duration-200 ease-linear  text-neutral-600   ">
              See All
            </button>
          </div>
        </IonCol>
      </IonRow>
    </>
  )
}

export default index
