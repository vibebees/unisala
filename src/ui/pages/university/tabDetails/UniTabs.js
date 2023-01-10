// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonGrid, IonRow, IonCol, IonText } from "@ionic/react"

const UniTabs = ({ activeTab, HandleTabClick }) => {
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
    return (
        <IonGrid
            style={{
                margin: "auto",
                width: "100%"
            }}
            className="w-full"
        >
            <IonRow
                size="auto"
                style={{
                    margin: "auto",
                    justifyContent: "center"
                }}
                className=""
            >
                {[
                    {
                        name: "FAQ"
                    },

                    {
                        name: "Discussion"
                    },
                    {
                        name: "Reviews"
                    }
                ].map((tab, index) => {
                    return (
                        <IonCol
                            size={width > 720 && "auto"}
                            style={{
                                textAlign: "center",
                                borderBottom: "4px solid",
                                borderColor:
                                    activeTab === index ? "#3880ff" : "#e0e0e0",
                                padding: "0px 3%",
                                cursor: "pointer",
                                transition: "all 0.3s ease-in-out"
                            }}
                            key={index}
                            onClick={() => {
                                HandleTabClick(index)
                            }}
                        >
                            <IonText
                                color={activeTab === index ? "primary" : "dark"}
                            >
                                <h2
                                    style={{
                                        fontSize:
                                            width > 720 ? "1.3rem" : "1.2rem",
                                        fontWeight: "500",
                                        transition: "all 0.3s ease-in-out"
                                    }}
                                >
                                    {tab.name}
                                </h2>
                            </IonText>
                        </IonCol>
                    )
                })}
            </IonRow>
        </IonGrid>
    )
}
export default UniTabs
