import React, { useState } from "react"
import { IonContent, IonCard, IonCardContent, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/react"
import {
    checkmarkCircle,
    chevronDownOutline,
    chevronUpOutline,
    removeCircleOutline,
    addCircleOutline
} from "ionicons/icons"
import { motion, AnimatePresence } from "framer-motion"
import { roadmapSteps } from "./roadmap"
import "./styles.css"
import { createAvatar } from "@dicebear/core"
import { thumbs } from "@dicebear/collection"

export const StudyAbroadRoadmap = () => {
    const [expandedStep, setExpandedStep] = useState(null)

    const toggleStep = (index) => {
        if (expandedStep === index) {
            setExpandedStep(null)
        } else {
            setExpandedStep(index)
        }
    }

    const getColorForStep = (index, totalSteps) => {
        const percentage = (index / (totalSteps - 1))
        return `rgb(${255 * (1 - percentage)}, ${255 * percentage}, 0)`
    }

    return (
        <IonContent className="roadmap-background1">
            <IonGrid style={{ maxWidth: "700px", margin: "auto" }}>
                <IonRow>
                    <IonCol>
                        <img src="https://icsblog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2023/05/10171257/study-abroad-usa.jpg" alt="Study Abroad Roadmap" className="roadmap-banner" />
                        <h2 className="roadmap-heading">Your Study In USA Roadmap</h2>
                        <p className="roadmap-description">Embarking on the journey of studying abroad is an adventure of a lifetime. Like any great journey, having a roadmap ensures you do not miss a single step. Dive into each phase of your adventure below.</p>

                    </IonCol>

                </IonRow>
                <IonRow>
                    <IonCol>
                        <div className="roadmap-container">
                            {roadmapSteps.map((step, index) => (
                                <motion.div key={index} className="roadmap-motion-div">
                                    <div className={`roadmap-step`} onClick={() => toggleStep(index)}>

                                        <div className="step-icon-container">
                                            <img src={step.image} alt={`Step ${index + 1}`} className="step-image" style={{ width: "100px" }} />
                                        </div>

                                        <div className="step-content">
                                            <span className="step-number">{index + 1}</span>
                                            <IonIcon icon={step.icon} className="step-icon" />
                                            <div className="step-title">{step.title}</div>
                                            <IonIcon icon={expandedStep === index ? chevronUpOutline : chevronDownOutline} className="toggle-icon" />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedStep === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="expandable-content"
                                            >

                                                <IonCard className="step-card">
                                                    <IonCardContent>
                                                        <ul className="content-list">
                                                            {step.content.map((o, i) => (
                                                                <li key={i} className="content-list-item">
                                                                    {o}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </IonCardContent>
                                                </IonCard>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <img src="https://i.ibb.co/BPjHZby/prashantbasnet94-happineess-and-exitement-in-Nepalese-student-f-c6dc665d-6e44-45c1-a807-0ac59a0fac93.png" alt="Study Abroad Roadmap" className="roadmap-banner" />

                    </IonCol>

                </IonRow>
            </IonGrid>
        </IonContent>
    )
}
