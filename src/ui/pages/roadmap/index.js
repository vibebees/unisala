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
import ProgressReport from "./progressReport"
// import StepInput from "../../component/roadmap/StepInput"
import { roadmapSteps } from "./roadmap"
import "./styles.css"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"

export const StudyAbroadRoadmapInput = () => {
  const [firstStep, setfirstStep] = useState(true)
  const [data, setdata] = useState({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: ""
  })

  return (
    <IonContent className="roadmap-background1">
      <IonGrid style={{ maxWidth: "900px", margin: "auto" }} className="w-full">
        <ProgressReport />
        <IonRow class="w-full gap-6 h-full mt-10 ">
          {/* <IonCol className="h-full ">
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
          </IonCol> */}
          <IonCol>
            <h4 className="font-semibold pl-4">Your next steps</h4>
            <div className="h-full mt-4 px-4 bg-neutral-100 border border-neutral-400 border-opacity-20 rounded-md py-6">
              <div className="flex items-center  w-full">
                {/* <StepInput
                  currentstep={"1/10"}
                  label={"Enter your ILETS Test Result"}
                  placeholder={"Enter score"}
                  inputType={"number"}
                  setInput={setdata}
                  name={"stepOne"}
                  inputValue={data.stepOne}
                  key={1}
                /> */}
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
