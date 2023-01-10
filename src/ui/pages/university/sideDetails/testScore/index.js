// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonCol,
    IonRow,
    IonText
} from "@ionic/react"
import { useSelector } from "react-redux"
import useIsData from "../../../../../hooks/useIsData"
const TestScore = () => {
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

    const { uniData, isSideBar } = useSelector((store) => store.University)

    return (
        !isSideBar?.testScoreEmpty && (
            <IonCard
                style={{
                    margin: "15px 0px 0px 0px"
                }}
                className="ion-margin-top"
            >
                <IonCardContent
                    style={{
                        borderBottom: "1px solid #C4C4C4"
                    }}
                >
                    <h1>TestScore</h1>
                </IonCardContent>
                <IonCardContent>
                    <IonText color="dark">
                        <h2>ACT Score Required:</h2>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            {[
                                {
                                    title: "Composite",
                                    min: uniData?.testScore?.act?.composite
                                        ?.percentile25th,
                                    max: uniData?.testScore?.act?.composite
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.act?.composite?.percentile25th} - ${uniData?.testScore?.act?.composite?.percentile75th}`
                                },
                                {
                                    title: "English",
                                    min: uniData?.testScore?.act?.english
                                        ?.percentile25th,
                                    max: uniData?.testScore?.act?.english
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.act?.english?.percentile25th} - ${uniData?.testScore?.act?.english?.percentile75th}`
                                },
                                {
                                    title: "Math",
                                    min: uniData?.testScore?.act?.math
                                        ?.percentile25th,
                                    max: uniData?.testScore?.act?.math
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.act?.math?.percentile25th} - ${uniData?.testScore?.act?.math?.percentile75th}`
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol
                                        style={{
                                            margin: "5px",
                                            padding: "0px"
                                        }}
                                        key={index}
                                        className="ion-padding"
                                    >
                                        <div
                                            style={{
                                                width:
                                                    width > 720
                                                        ? "175px"
                                                        : "130px",
                                                height:
                                                    width > 720
                                                        ? "175px"
                                                        : "130px"
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
                                                    src={item.image}
                                                    style={{
                                                        width: "50px"
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
                                                                {useIsData(
                                                                    item.min
                                                                )}
                                                                {" - "}
                                                                {useIsData(
                                                                    item.max
                                                                )}
                                                            </h2>
                                                        ) : (
                                                            <h1
                                                                style={{
                                                                    margin: 0,
                                                                    padding: 0
                                                                }}
                                                            >
                                                                {useIsData(
                                                                    item.min
                                                                )}
                                                                {" - "}
                                                                {useIsData(
                                                                    item.max
                                                                )}
                                                            </h1>
                                                        )}
                                                    </IonText>

                                                    <p>{item.title}</p>
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
                                    </IonCol>
                                )
                            })}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
                <IonCardContent>
                    <IonText color="dark">
                        <h2>SAT Score Required:</h2>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            {[
                                {
                                    title: "Composite",
                                    min: uniData?.testScore?.sat?.composite
                                        ?.percentile25th,
                                    max: uniData?.testScore?.sat?.composite
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.sat?.composite?.percentile25th} - ${uniData?.testScore?.sat?.composite?.percentile75th}`
                                },
                                {
                                    title: "English",
                                    min: uniData?.testScore?.sat?.english
                                        ?.percentile25th,
                                    max: uniData?.testScore?.sat?.english
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.sat?.english?.percentile25th} - ${uniData?.testScore?.sat?.english?.percentile75th}`
                                },
                                {
                                    title: "Math",
                                    min: uniData?.testScore?.sat?.math
                                        ?.percentile25th,
                                    max: uniData?.testScore?.sat?.math
                                        ?.percentile75th,
                                    score: `${uniData?.testScore?.sat?.math?.percentile25th} - ${uniData?.testScore?.sat?.math?.percentile75th}`
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol
                                        style={{
                                            margin: "5px",
                                            padding: "0px"
                                        }}
                                        key={index}
                                        className="ion-padding"
                                    >
                                        <div
                                            style={{
                                                width:
                                                    width > 720
                                                        ? "175px"
                                                        : "130px",
                                                height:
                                                    width > 720
                                                        ? "175px"
                                                        : "130px"
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
                                                    src={item.image}
                                                    style={{
                                                        width: "50px"
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
                                                                {useIsData(
                                                                    item.min
                                                                )}
                                                                {" - "}
                                                                {useIsData(
                                                                    item.max
                                                                )}
                                                            </h2>
                                                        ) : (
                                                            <h1
                                                                style={{
                                                                    margin: 0,
                                                                    padding: 0
                                                                }}
                                                            >
                                                                {useIsData(
                                                                    item.min
                                                                )}
                                                                {" - "}
                                                                {useIsData(
                                                                    item.max
                                                                )}
                                                            </h1>
                                                        )}
                                                    </IonText>

                                                    <p>{item.title}</p>
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
                                    </IonCol>
                                )
                            })}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )
    )
}
export default TestScore
