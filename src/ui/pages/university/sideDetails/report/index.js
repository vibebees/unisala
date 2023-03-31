// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonCard,
    IonCardContent, IonCol, IonGrid, IonIcon, IonRow,
    IonText,
    IonTitle
} from "@ionic/react"
import { arrowDown, arrowUp } from "ionicons/icons"
import { useSelector } from "react-redux"
import useGrade from "../../../../../hooks/useGrade"
import useGradeColor from "../../../../../hooks/useGradeColor"
import "./Report.css"

const Report = () => {
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

    const [more, setMore] = React.useState(false)

    const { uniData } = useSelector((store) => store?.university)
    const { isSideBar } = useSelector((store) => store?.university)

    // const {
    //     academics,
    //     atheltics,
    //     average,
    //     campus,
    //     campusFood,
    //     diversity,
    //     dorms,
    //     location,
    //     partyScene,
    //     Professors,
    //     safety,
    //     studentLife,
    //     value
    // } = uniData?.report

    return isSideBar?.reportEmpty ? null : (
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
                <h1>Report</h1>
            </IonCardContent>
            <IonCardContent className="average-report">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div
                                style={{
                                    background: useGradeColor(
                                        uniData?.report?.average
                                    )
                                }}
                                className="report"
                            >
                                <h1 style={{ fontSize: "35px" }}>
                                    {useGrade(uniData?.report?.average)}
                                </h1>
                            </div>
                            <IonTitle className="ion-padding-top">
                                <IonText color="dark">
                                    <h1
                                        style={{
                                            fontSize: "30px"
                                        }}
                                    >
                                        {" "}
                                        Average{" "}
                                    </h1>
                                </IonText>
                            </IonTitle>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <div
                    style={{
                        margin: "auto"
                    }}
                >
                    <div className="report">
                        <h1>A+</h1>
                    </div>
                    <IonTitle>
                        <IonText color="dark">
                            <h1> Average </h1>
                        </IonText>
                    </IonTitle>
                </div> */}
            </IonCardContent>
            <IonGrid
                style={{
                    margin: 0,
                    padding: "0px 0px 30px 0px",
                    height: more || width >= 768 ? "auto" : 225,
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                {width < 768 && (
                    <div
                        onClick={() => {
                            setMore(!more)
                        }}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "white",
                            zIndex: 1,
                            textAlign: "center",
                            padding: "10px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            borderTop: "1px solid #C4C4C4"
                        }}
                        className="short"
                    >
                        {more ? "Show Less" : "Show More"}
                        <IonIcon icon={more ? arrowUp : arrowDown} />
                    </div>
                )}
                <IonRow>
                    {[
                        {
                            title: "Academics",
                            report: uniData?.report?.academics
                        },
                        {
                            title: "Diveristy",
                            report: uniData?.report?.diversity
                        },
                        {
                            title: "Value",
                            report: uniData?.report?.value
                        },
                        {
                            title: "Athletics",
                            report: uniData?.report?.atheltics
                        },
                        {
                            title: "Party Scene",
                            report: uniData?.report?.partyScene
                        },
                        {
                            title: "Professors",
                            report: uniData?.report?.professors
                        },
                        {
                            title: "Location",
                            report: uniData?.report?.location
                        },
                        {
                            title: "Dorms",
                            report: uniData?.report?.dorms
                        },
                        {
                            title: "Campus Food",
                            report: uniData?.report?.campusFood
                        },
                        {
                            title: "Student Life",
                            report: uniData?.report?.studentLife
                        },
                        {
                            title: "Safety",
                            report: uniData?.report?.safety
                        },
                        {
                            title: "Professors",
                            report: uniData?.report?.professors
                        }
                    ].map((item, index) => {
                        return (
                            <IonCol
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    minWidth: width > 520 ? "220px" : "150px",
                                    margin: 0
                                }}
                                className="ion-padding"
                                key={index}
                            >
                                <IonRow
                                    style={{
                                        gap: "5px",
                                        margin: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <div
                                        className="small-report"
                                        style={{
                                            background: useGradeColor(
                                                item.report
                                            ),
                                            width:
                                                width < 520 ? "40px" : "50px",
                                            height:
                                                width < 520 ? "40px" : "50px"
                                        }}
                                    >
                                        <h1
                                            style={{
                                                margin: "0px",
                                                fontSize: "21px"
                                            }}
                                        >
                                            {useGrade(item.report)}
                                        </h1>
                                    </div>
                                    <div className="">
                                        <IonText color="dark">
                                            <h6
                                                style={{
                                                    minWidth: "150px",
                                                    textAlign: "center"
                                                }}
                                            >
                                                {" "}
                                                {item.title}{" "}
                                            </h6>
                                        </IonText>
                                    </div>
                                </IonRow>
                            </IonCol>
                        )
                    })}
                </IonRow>
            </IonGrid>
        </IonCard>
    )
}
export default Report
