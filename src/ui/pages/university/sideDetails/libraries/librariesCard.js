// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"

import { IonText } from "@ionic/react"
import useIsData from "../../../../../hooks/useIsData"
import useCountConverter from "../../../../../hooks/useCountConverter"

const LibrariesCard = ({ title, value }) => {
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
        const end = parseInt(value?.substring(0, 3))
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
            setCounts(String(start) + value.substring(1))
            if (start === end) clearInterval(timer)
        }, incrementTime)

        // dependency array
    }, [value])
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className="rounded-rectangle">
                <img
                    alt=""
                    src="https://cdn-icons-png.flaticon.com/512/7398/7398653.png"
                    style={{
                        width: "60px"
                    }}
                />
                <IonText color="dark" className="">
                    <h1
                        style={{
                            fontSize: "30px"
                        }}
                    >
                        {useIsData(value) !== "N/A" &&
                        useCountConverter(value) !== "0"
                            ? useCountConverter(value) + "+"
                            : useIsData(value)}
                    </h1>
                </IonText>
                <IonText
                    style={{
                        textAlign: "center"
                    }}
                    color="medium"
                >
                    <p
                        style={{
                            fontSize: "16px"
                        }}
                    >
                        {title}
                    </p>
                </IonText>
            </div>
        </div>
    )
}
export default LibrariesCard
