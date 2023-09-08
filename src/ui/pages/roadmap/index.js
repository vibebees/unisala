import React, { useState } from "react"
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonRadio,
  IonRadioGroup,
  IonInput,
  IonItem
} from "@ionic/react"
import {
  checkmarkCircle,
  chevronDownOutline,
  chevronUpOutline,
  removeCircleOutline,
  addCircleOutline,
  schoolOutline,
  bookOutline,
  calendarOutline,
  clipboardOutline,
  checkmarkCircleOutline
} from "ionicons/icons"
import { motion, AnimatePresence } from "framer-motion"
import { roadmapSteps } from "./roadmap"
import "./styles.css"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"

export const StudyAbroadRoadmap = () => {
  const [expandedStep, setExpandedStep] = useState(null)
  const [stepone, setStepOne] = useState({
    takenSAT: null
  })

  const toggleStep = (index) => {
    if (expandedStep === index) {
      setExpandedStep(null)
    } else {
      setExpandedStep(index)
    }
  }

  const getColorForStep = (index, totalSteps) => {
    const percentage = index / (totalSteps - 1)
    return `rgb(${255 * (1 - percentage)}, ${255 * percentage}, 0)`
  }

  return (
    <IonContent className="roadmap-background1">
      <IonGrid style={{ maxWidth: "900px", margin: "auto" }} className="w-full">
        <IonRow className=" !px-0 border  h-full rounded-md border-neutral-300 border-opacity-75 pt-2">
          <IonCol className="w-full h-full  px-0">
            <h2 className="text-center relative  font-medium text-lg mb-3">
              Your recent progress
            </h2>

            <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
              <p className="w-[10rem]  h-full text-sm opacity-40">
                2022 sep 23
              </p>
              <p className=" block text-sm h-full opacity-70">
                You have applied for the vis
              </p>
            </div>
            <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
              <p className="w-[10rem]  h-full text-sm opacity-40">
                2022 sep 23
              </p>
              <p className=" block text-sm h-full opacity-70">
                You have applied for the vis
              </p>
            </div>
            <div className="border-t h-full py-3 px-4  border-neutral-400 border-opacity-25 items-baseline border-op justify-start flex">
              <p className="w-[10rem]  h-full text-sm opacity-40">
                2022 sep 23
              </p>
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
        <IonRow class="w-full gap-6 h-full mt-10 ">
          <IonCol className="h-full ">
            <h4 className="font-semibold pl-4">Other useful information</h4>
            <div className="h-full mt-4 bg-neutral-100 border border-neutral-400 border-opacity-20 rounded-md px-5 py-6">
              <p className="text-sm text-neutral-600">
                As soon as we hear anything on your case we will update you
              </p>
              <br />
              <p className="text-sm text-neutral-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                doloremque commodi magni, soluta optio tenetur quisquam fugiat
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                <br />
                <br />
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                architecto ipsa quam at nobis dolorum, assumenda cupiditate ut
                officia! Ipsum, voluptas corrupti.
              </p>
            </div>
          </IonCol>
          <IonCol>
            <h4 className="font-semibold pl-4">Your next steps</h4>
            <div className="h-full mt-4 px-4 bg-neutral-100 border border-neutral-400 border-opacity-20 rounded-md py-6">
              <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
                <span className="text-sm text-neutral-400">1/10</span>
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
              </div>
              <div className="border-b border-neutral-400 border-opacity-40 pb-2 ">
                <span className="text-sm text-neutral-400">2/10</span>
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
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}
