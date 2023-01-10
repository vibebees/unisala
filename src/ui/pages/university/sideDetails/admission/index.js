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
import "./Admission.css"
import { Bar } from "react-chartjs-2"
import TotalCard from "./TotalCard"
import { useSelector } from "react-redux"
import useIsData from "../../../../../hooks/useIsData"

const Admission = ({ admissionAnimate }) => {
    const { uniData, isSideBar } = useSelector((store) => store.University)

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Admision Bar Chart"
            }
        }
    }
    const labels = ["Applied", "Accepted", "Enrolled"]
    const data = {
        labels,
        datasets: [
            {
                label: "Male",
                data: [
                    useIsData(
                        uniData?.applicants?.fallEnrollment?.men
                            ?.totalApplicants
                    ),
                    useIsData(
                        uniData?.applicants?.fallEnrollment?.men?.totalAccepted
                    ),

                    useIsData(
                        uniData?.applicants?.fallEnrollment?.men?.totalEnrolled
                            ?.fullTime +
                            uniData?.applicants?.fallEnrollment?.men
                                ?.totalEnrolled?.partTime
                    )
                ],
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
                label: "Female",
                data: [
                    useIsData(
                        uniData?.applicants?.fallEnrollment?.women
                            ?.totalApplicants
                    ),

                    useIsData(
                        uniData?.applicants?.fallEnrollment?.women
                            ?.totalAccepted
                    ),

                    useIsData(
                        uniData?.applicants?.fallEnrollment?.women
                            ?.totalEnrolled?.fullTime +
                            uniData?.applicants?.fallEnrollment?.women
                                ?.totalEnrolled?.partTime
                    )
                ],
                backgroundColor: "rgba(53, 162, 235, 0.5)"
            }
        ]
    }

    return (
        !isSideBar?.applicantsEmpty && (
            <IonCard
                style={{
                    margin: "10px 0px 0px 0px"
                }}
            >
                <IonCardContent
                    style={{
                        borderBottom: "1px solid #C4C4C4"
                    }}
                >
                    <h1>Admission</h1>
                </IonCardContent>
                <IonCardContent
                // style={{
                //     borderBottom: "1px solid #C4C4C4"
                // }}
                >
                    <IonText color="dark">
                        <h2>Acceptance Rate</h2>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            {[
                                {
                                    title: "Applide",
                                    value: `${useIsData(
                                        uniData?.applicants?.fallEnrollment
                                            ?.total?.totalApplicants
                                    )}`,
                                    image: "https://cdn-icons-png.flaticon.com/512/7389/7389814.png"
                                },
                                {
                                    title: "Total Accepted",
                                    value: `${useIsData(
                                        uniData?.applicants?.fallEnrollment
                                            ?.total?.totalAccepted
                                    )}`,
                                    image: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png"
                                },
                                {
                                    title: "Total Enrolled",
                                    value: `${useIsData(
                                        (uniData?.applicants?.fallEnrollment
                                            ?.total?.totalEnrolled?.fullTime ===
                                        -1
                                            ? null
                                            : uniData?.applicants
                                                  ?.fallEnrollment?.total
                                                  ?.totalEnrolled?.fullTime +
                                              uniData?.applicants
                                                  ?.fallEnrollment?.total
                                                  ?.totalEnrolled?.partTime) ===
                                            -1
                                            ? null
                                            : uniData?.applicants
                                                  ?.fallEnrollment?.total
                                                  ?.totalEnrolled?.fullTime
                                    )}`,
                                    image: "https://cdn-icons-png.flaticon.com/512/7156/7156208.png"
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol
                                        // size="auto"
                                        key={index}
                                        style={{
                                            alignSelf: "center",
                                            margin: "5px",
                                            padding: 0
                                        }}
                                        className="ion-padding"
                                    >
                                        {/* <IonTitle
                                        style={{ textAlign: "center" }}
                                        color="dark"
                                    >
                                        <IonTitle className="">
                                            {item.value}
                                        </IonTitle>
                                    </IonTitle>
                                    <IonText
                                        style={{ textAlign: "center" }}
                                        color="medium"
                                    >
                                        <p>{item.title}</p>
                                    </IonText> */}
                                        {admissionAnimate && (
                                            <TotalCard {...item} />
                                        )}
                                    </IonCol>
                                )
                            })}
                            {/* <IonCol>
                            <CircularBar value={40} />
                            <IonText
                                style={{
                                    textAlign: "center"
                                }}
                                color="medium"
                            >
                                <p>Applide</p>
                            </IonText>
                        </IonCol> */}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
                {/* <IonGrid style={{ padding: 0 }}>
                <IonRow>
                    <IonCol
                        style={{
                            borderBottom: "1px solid #C4C4C4",
                            borderRight: "1px solid #C4C4C4"
                        }}
                    >
                        <IonCardContent>
                            <IonItem lines="none">
                                <IonIcon icon={female} />
                                <IonLabel className="ion-padding-start">
                                    <h2>Female Admissions</h2>
                                </IonLabel>
                            </IonItem>
                            <IonGrid>
                                <IonRow>
                                    {[
                                        {
                                            title: "Applide",
                                            value: "6036"
                                        },
                                        {
                                            title: "Total Accepted",
                                            value: "5877"
                                        },
                                        {
                                            title: "Total Enrolled",
                                            value: "2580"
                                        }
                                    ].map((item, index) => {
                                        return (
                                            <IonCol
                                                key={index}
                                                className="ion-padding"
                                            >
                                                <IonTitle
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    color="dark"
                                                >
                                                    <h1 className="">
                                                        {item.value}
                                                    </h1>
                                                </IonTitle>
                                                <IonText
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    color="medium"
                                                >
                                                    <p>{item.title}</p>
                                                </IonText>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCol>
                    <IonCol
                        style={{
                            borderBottom: "1px solid #C4C4C4"
                        }}
                    >
                        <IonCardContent>
                            <IonItem lines="none">
                                <IonIcon icon={male} />
                                <IonLabel className="ion-padding-start">
                                    <h2>Male Admissions</h2>
                                </IonLabel>
                            </IonItem>
                            <IonGrid>
                                <IonRow>
                                    {[
                                        {
                                            title: "Applide",
                                            value: "6036"
                                        },
                                        {
                                            title: "Total Accepted",
                                            value: "5877"
                                        },
                                        {
                                            title: "Total Enrolled",
                                            value: "2580"
                                        }
                                    ].map((item, index) => {
                                        return (
                                            <IonCol
                                                key={index}
                                                className="ion-padding"
                                            >
                                                <IonTitle
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    color="dark"
                                                >
                                                    <h1 className="">
                                                        {item.value}
                                                    </h1>
                                                </IonTitle>
                                                <IonText
                                                    style={{
                                                        textAlign: "center"
                                                    }}
                                                    color="medium"
                                                >
                                                    <p>{item.title}</p>
                                                </IonText>
                                            </IonCol>
                                        )
                                    })}
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid> */}
                {admissionAnimate &&
                    uniData?.applicants?.fallEnrollment?.men
                        ?.totalApplicants !== -1 && (
                        <div className="admission-chart">
                           {/* { console.log({ options, data, message: "problem here" })} */}
                            {/* <Bar options={options} data={data} /> */}
                        </div>
                    )}
                <IonCardContent>
                    <IonText color="dark">
                        <h2>Applying</h2>
                    </IonText>
                    <IonGrid>
                        <IonRow>
                            {[
                                {
                                    title: "Application Fee",
                                    value: `$${useIsData(
                                        uniData?.applicants?.applicationFee
                                    )}`
                                },
                                {
                                    title: "Act Range",
                                    value: `${useIsData(
                                        uniData?.applicants?.actRange?.min
                                    )} - ${useIsData(
                                        uniData?.applicants?.actRange?.max
                                    )}`
                                },
                                {
                                    title: "Sat Range",
                                    value: `${useIsData(
                                        uniData?.applicants?.satRange?.min
                                    )} - ${useIsData(
                                        uniData?.applicants?.satRange?.max
                                    )}`
                                }
                            ].map((item, index) => {
                                return (
                                    <IonCol key={index} className="ion-padding">
                                        <IonText
                                            style={{ textAlign: "center" }}
                                            color="dark"
                                        >
                                            <h1 className="">
                                                {useIsData(item.value)}
                                            </h1>
                                        </IonText>
                                        <IonText
                                            style={{ textAlign: "center" }}
                                            color="medium"
                                        >
                                            <p>{useIsData(item.title)}</p>
                                        </IonText>
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
export default Admission
