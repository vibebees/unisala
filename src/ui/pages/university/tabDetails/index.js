// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard } from "@ionic/react"

import UniTabs from "./UniTabs"
import FAQ from "./FAQ/Index"
import Discussion from "./Discussion"
import Reviews from "./Review"

const TabDetails = () => {
    const [activeTab, setActiveTab] = React.useState(0)
    const [tabClicked, setTabClicked] = React.useState(false)
    const HandleTabClick = (index) => {
        setActiveTab(index)
        setTabClicked(true)
    }
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
        <IonCard
            style={{
                padding: width > 720 ? "0px 30px" : "0px 10px",
                margin: width > 720 && "0px 28px"
            }}
        >
            <UniTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setTabClicked={setTabClicked}
                HandleTabClick={HandleTabClick}
            />
            <section
                style={{
                    minHeight: "400px"
                }}
            >
                {activeTab === 0 ? (
                    <FAQ />
                ) : activeTab === 1 ? (
                    <Discussion />
                ) : activeTab === 2 ? (
                    <Reviews />
                ) : null}
            </section>
        </IonCard>
    )
}
export default TabDetails
