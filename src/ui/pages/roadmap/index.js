import React, { useState } from "react"
import { IonContent, IonCard, IonCardContent, IonIcon } from "@ionic/react"
import {
    checkmarkCircle,
    chevronDownOutline,
    chevronUpOutline
} from "ionicons/icons"
import { motion, AnimatePresence } from "framer-motion"
import { roadmapSteps } from "./roadmap"

export const StudyAbroadRoadmap = () => {

    const [expandedStep, setExpandedStep] = useState(null)

    const toggleStep = (index) => {
        if (expandedStep === index) {
            setExpandedStep(null)
        } else {
            setExpandedStep(index)
        }
    }

    return (
        <IonContent>
            <div className="roadmap-container">
                {roadmapSteps.map((step, index) => (
                    <motion.div key={index}>
                        <div className={`roadmap-step ${expandedStep === index ? "expanded" : ""}`} onClick={() => toggleStep(index)}>
                            <div className="step-icon-container">
                                <IonIcon icon={checkmarkCircle} className="step-icon" />
                            </div>
                            <div className="step-content">
                                <div className="step-title">{step.title}</div>
                                <AnimatePresence>
                                    {expandedStep === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <IonCard>
                                                <IonCardContent>
                                                    {step.content}
                                                </IonCardContent>
                                            </IonCard>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {index !== roadmapSteps.length - 1 && (
                                <div className={`step-line ${expandedStep === index ? "expanded" : ""}`} />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </IonContent>
    )
}
