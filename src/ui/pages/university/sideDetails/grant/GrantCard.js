// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"

import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"

const GrantCard = ({ titles, title, value }) => {
    const [counts, setCounts] = React.useState(0)
    // useEffect(() => {
    //     for (let count = counts; count <= value; count++) {
    //         setTimeout(() => {
    //             setCounts(count)
    //         }, 300)
    //     }
    // }, [])
    useEffect(() => {
        let start = 0
        // first three numbers from props
        const end = parseInt(value.substring(0, 3))
        // if zero, return
        if (start === end) return

        // find duration per increment
        let totalMilSecDur = parseInt(3)
        let incrementTime = (totalMilSecDur / end) * 1000

        // timer increments start counter
        // then updates count
        // ends if start reaches end
        let timer = setInterval(() => {
            start += 1
            setCounts(String(start) + value.substring(3))
            if (start === end) clearInterval(timer)
        }, incrementTime)

        // dependency array
    }, [value])
    return (
        <div>
            <IonText
                style={{
                    textAlign: "center"
                }}
                color="dark"
            >
                <h2>{titles}</h2>
            </IonText>
            <IonText style={{ textAlign: "center" }} color="dark">
                <IonText className="">
                    <h1>{useIsData(value) === -1 ? "N/A" : counts}</h1>
                </IonText>
            </IonText>
            <IonText style={{ textAlign: "center" }} color="medium">
                <p>{title}</p>
            </IonText>
        </div>
    )
}
export default GrantCard
