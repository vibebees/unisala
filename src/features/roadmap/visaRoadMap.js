import React, { useState } from "react"
import { IonContent, IonCard, IonCardContent, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/react"
import {
    chevronDownOutline,
    chevronUpOutline
} from "ionicons/icons"
import { motion, AnimatePresence } from "framer-motion"
 import "./styles.css"
import {roadmapSteps} from "data/roadmap"

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
