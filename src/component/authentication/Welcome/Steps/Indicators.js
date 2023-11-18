import React from "react"
import { IonGrid } from "@ionic/react"
import clsx from "clsx"

const Indicators = ({ currentStep }) => {
  return (
    <>
      <IonGrid className=" flex  justify-center mt-8">
        <div className="  w-fit h-fit flex gap-4 ">
          <div
            className={clsx("  w-3 h-3 opacity-70 rounded-full bg-neutral-500")}
          />
          <div
            className={clsx(
              "  w-3 h-3 opacity-70 rounded-full",
              currentStep >= 2 ? "bg-neutral-500" : "bg-neutral-300"
            )}
          />
          <div
            className={clsx(
              "  w-3 h-3 opacity-70 rounded-full",
              currentStep >= 3 ? "bg-neutral-500" : "bg-neutral-300"
            )}
          />
          <div
            className={clsx(
              "  w-3 h-3 opacity-70 rounded-full",
              currentStep >= 4 ? "bg-neutral-500" : "bg-neutral-300"
            )}
          />

          <div
            className={clsx(
              "  w-3 h-3 opacity-70 rounded-full",
              currentStep === 5 ? "bg-neutral-500" : "bg-neutral-300"
            )}
          />
        </div>
      </IonGrid>
    </>
  )
}

export default Indicators
