// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard, IonCardContent, IonGrid, IonRow } from "@ionic/react"
import CourseCard from "../../../../component/CourseCard"
import { useSelector } from "react-redux"
import useIsData from "../../../../../hooks/useIsData"
const SimilarCollage = () => {
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
    // const similarCollage = [
    //     {
    //         image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         Title: "Nicholls State University",
    //         description:
    //             "Southeastern Louisiana is a public university located in Hammond, Louisiana. It is a mid-size institution with an enrollment of 9,248 undergraduate students ....Read More",
    //         location: "HAMMOND , LA",
    //         review: "4.94*67 Reviews",
    //         avarage: "A+",
    //         acceptance: "90%",
    //         act: "19 - 24",
    //         type: "university"
    //     },
    //     {
    //         image: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         Title: "Nicholls State University",
    //         description:
    //             "Southeastern Louisiana is a public university located in Hammond, Louisiana. It is a mid-size institution with an enrollment of 9,248 undergraduate students ....Read More",
    //         location: "HAMMOND , LA",
    //         review: "4.94*67 Reviews",
    //         avarage: "A+",
    //         acceptance: "90%",
    //         act: "19 - 24",
    //         type: "university"
    //     }
    // ]

    return (
        !isSideBar?.similarCollagesEmpty && (
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
                    <h1>Similar Collage</h1>
                </IonCardContent>
                <IonGrid className={width > 720 && "ion-padding"}>
                    {/* <IonRow>
                        {[
                            {
                                title: "Nicholls State University",
                                value: "38%"
                            },
                            {
                                title: "Nicholls State University",
                                value: "38%"
                            },
                            {
                                title: "Nicholls State University",
                                value: "38%"
                            },
                            {
                                title: "Nicholls State University",
                                value: "38%"
                            }
                        ].map(({ title, value }, index) => (
                            <IonCol size={"6"} key={index}>
                                <IonCard
                                    style={{
                                        padding: "10px",
                                        boxShadow: "none",
                                        border: "1px solid #C4C4C4",
                                        cursor: "pointer"
                                    }}
                                >
                                    <IonCardHeader
                                        style={{ minWidth: "225px" }}
                                    >
                                        <IonText color="primary">
                                            <h1
                                                style={{
                                                    fontSize: "20px"
                                                }}
                                            >
                                                {title}
                                            </h1>
                                        </IonText>
                                    </IonCardHeader>
                                    <IonCardContent
                                        style={{
                                            display: "flex",
                                            padding: "0 12px"
                                        }}
                                    >
                                        <IonIcon
                                            style={{
                                                fontSize: "20px",
                                                alignSelf: "center"
                                            }}
                                            className="ion-icon"
                                            icon={location}
                                        />
                                        <p
                                            className="ion-padding-start"
                                            style={{ alignSelf: "center" }}
                                        >
                                            HAMMOND , LA
                                        </p>
                                    </IonCardContent>
                                    <IonCardContent
                                        style={{
                                            display: "flex",
                                            padding: "0 12px"
                                        }}
                                    >
                                        <IonIcon
                                            style={{
                                                fontSize: "20px",
                                                alignSelf: "center"
                                            }}
                                            color="danger"
                                            className="ion-icon"
                                            icon={heart}
                                        />
                                        <p
                                            className="ion-padding-start"
                                            style={{ alignSelf: "center" }}
                                        >
                                            4.94*67 Review
                                        </p>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow> */}
                    {uniData?.similarSchools?.map((item, index) => (
                        <IonRow size="12" key={index}>
                            <CourseCard
                                image={item.image}
                                name={useIsData(item?.name)}
                                city={useIsData(
                                    item?.school?.elevatorInfo?.address?.city
                                )}
                                rating={useIsData(item?.rating)}
                                review={useIsData(item?.reviews)}
                                average={useIsData(
                                    item?.school?.report?.average
                                )}
                                acceptanceRate={useIsData(
                                    item?.school?.applicants?.acceptanceRate
                                )}
                                act={useIsData(item?.school?.applicants?.act)}
                                type={item.type}
                            />
                        </IonRow>
                    ))}
                </IonGrid>
            </IonCard>
        )
    )
}
export default SimilarCollage
