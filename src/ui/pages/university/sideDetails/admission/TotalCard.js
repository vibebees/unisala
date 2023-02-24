// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import useIsData from "../../../../../hooks/useIsData"

import { IonText } from "@ionic/react"
import useCountConverter from "../../../../../hooks/useCountConverter"

const TotalCard = ({ title, value, image }) => {
    const [counts, setCounts] = React.useState(0)
    // useEffect(() => {
    //     for (let count = counts; count <= value; count++) {
    //         setTimeout(() => {
    //             setCounts(count)
    //         }, 300)
    //     }
    // }, [])
    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
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
                width: width > 720 ? "175px" : "135px",
                height: width > 720 ? "175px" : "135px"
            }}
            className="rounded-circle"
        >
            <div
                style={{
                    borderRadius: "50%",
                    width: "90%",
                    height: "90%",
                    // border: "1px solid #c4c4c4",
                    boxShadow:
                        " rgba(67, 71, 85, 0.67) 0px 0px 0.25em, rgba(90, 125, 188, 0.15) 0px 0.25em 1em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "5px"
                }}
            >
                <img
                    src={image}
                    style={{
                        width: width < 720 ? "30px" : "50px"
                    }}
                    alt=""
                />
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <IonText color="dark">
                        {width < 720 ? (
                            <h2
                                style={{
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                {useIsData(value) !== "N/A"
                                    ? useCountConverter(value)
                                    : useIsData(value)}
                            </h2>
                        ) : (
                            <h1
                                style={{
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                {useIsData(value) !== "N/A"
                                    ? useCountConverter(value)
                                    : useIsData(value)}
                            </h1>
                        )}
                    </IonText>

                    <p>{title}</p>
                </div>

                {/* {index + 1 !== 3 && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: "98%",
                                                        fontSize: "35px",
                                                        color: "#428cff"
                                                    }}
                                                >
                                                    <IonIcon
                                                        icon={arrowForward}
                                                    />
                                                </div>
                                            )} */}
            </div>
        </div>
    )
}
export default TotalCard
