import React, {useEffect, useState} from "react"
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import {UniProfile} from "../../uniProfile"
import SideDetails from "../../sideDetails"
import Discussion from "../../Discussion"
import {chevronBack} from "ionicons/icons"
import {useParams} from "react-router"
// Graphql
import {useQuery} from "@apollo/client"
import {useDispatch, useSelector} from "react-redux"
import {getUniData} from "../../../../../store/action"
import PreLoader from "../../../../component/preloader"
import useIsEmpty from "../../../../../hooks/useIsEmpty"
import {isSideBar} from "../../../../../store/action/University"
import {getSchoolInfo} from "../../../../../graphql/uni"
import {UNIVERSITY_SERVICE_GQL} from "../../../../../servers/types"
import useDocTitle from "../../../../../hooks/useDocTitile"
import Review from "../../Discussion/Post"

export const UniversityTemplate = ({allProps}) => {

    const {
        id,
        loading,
        data,
        UniEmpty,
        campusLifeEmpty,
        libraryEmpty,
        grantsEmpty,
        testScoreEmpty,
        visitWebsiteEmpty,
        professorsEmpty,
        app,
        profile,
        statistics,
        fees,
        libraries,
        grant,
        testScore,
        similarCollages,
        report,
        campusLife,
        website,
        Professors,
        AdmisionAnimate,
        setAdmissionAnimate,
        GrantAnimate,
        setGrantAnimate,
        LibrariesAnimate,
        setLibrariesAnimate,
        appState,
        setAppState,
        activeTab,
        setActiveTab,
        scrollTop,
        clientHeight,
        UniScroll,
        width,
        setWidth,
        handleResize,
        reportEmpty,
        similarCollagesEmpty,
        applicantsEmpty,
        uniData
    } = allProps,
    dispatch = useDispatch()
    useDocTitle(id)
    useEffect(() => {
        dispatch(getUniData(data?.getSchoolInfo))
    }, [data])

    useEffect(() => {
        dispatch(
            isSideBar({
                reportEmpty,
                similarCollagesEmpty,
                applicantsEmpty,
                libraryEmpty,
                grantsEmpty,
                campusLifeEmpty,
                testScoreEmpty,
                visitWebsiteEmpty,
                professorsEmpty
            })
        )
    }, [
        reportEmpty,
        similarCollagesEmpty,
        applicantsEmpty,
        libraryEmpty,
        grantsEmpty,
        testScoreEmpty,
        visitWebsiteEmpty,
        professorsEmpty
    ])

    useEffect(() => {
        if (
            scrollTop - profile?.current?.clientHeight <
            statistics?.current?.offsetTop
        ) {
            setActiveTab(0)
            setAdmissionAnimate(true)
        }
        if (
            statistics?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(0)
        }
        if (
            fees?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(1)
        }
        if (
            libraries?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(2)
        }
        if (
            libraries?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight + clientHeight &&
            libraries?.current?.clientHeight !== 0
        ) {
            setLibrariesAnimate(true)
        }
        if (
            grant?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(3)
        }
        if (
            grant?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight + clientHeight &&
            grant?.current?.clientHeight !== 0
        ) {
            setGrantAnimate(true)
        }
        if (
            testScore?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(4)
        }
        if (
            similarCollages?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(5)
        }
        if (
            report?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(6)
        }
        if (
            campusLife?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(7)
        }
        if (
            website?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(8)
        }
        if (
            Professors?.current?.offsetTop <=
            scrollTop - profile?.current?.clientHeight
        ) {
            setActiveTab(9)
        }
    }, [scrollTop, activeTab, clientHeight])

    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    return loading ? (
        <PreLoader />
    ) : UniEmpty ? (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                maxWidth: "600px",
                padding: "50px",
                margin: "auto",
                marginTop: "50px"
            }}
        >
            <img
                style={{
                    filter: "grayscale(100%)"
                }}
                src="https://cdn.iconscout.com/icon/free/png-256/university-2147728-1805825.png"
                alt=""
            />
            <IonText color="dark">
                <h1
                    style={{
                        fontSize: "2.5rem",
                        marginTop: "20px"
                    }}
                >
                    Oops!
                </h1>
            </IonText>
            <br />
            <IonText color="medium">
                <h2>No University found.</h2>
            </IonText>
        </div>
    ) : uniData ? (
        <IonContent>
            <section
                ref={app}
                onScroll={() => {
                    UniScroll()
                }}
                style={{
                    height: "92vh",
                    overflow: "auto",
                    scrollBehavior: "smooth",
                    backgroundColor: "#f5f5f5"
                }}
            >
                {/* {loading && <h1>loading</h1>} */}
                {width < 768 && (
                    <IonHeader
                        style={{
                            position: "sticky",
                            top: 0,
                            borderBottom: "1px solid #e0e0e0"
                        }}
                    >
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonBackButton text="Back" icon={chevronBack} defaultHref="/" />
                            </IonButtons>
                            <IonTitle
                                style={{
                                    fontSize: "1rem"
                                }}
                            >
                                {data?.getSchoolInfo?.elevatorInfo?.name}
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                )}
                <div style={{maxWidth: "1280px", margin: "0 auto"}}>
                    <div ref={profile}>
                        <UniProfile images={uniData?.pictures} />
                    </div>
                    <SideDetails
                        forwardedRef={{
                            app,
                            profile,
                            statistics,
                            fees,
                            libraries,
                            grant,
                            testScore,
                            similarCollages,
                            report,
                            campusLife,
                            website,
                            Professors
                        }}
                        admissionAnimate={AdmisionAnimate}
                        grantAnimate={GrantAnimate}
                        activeTab={activeTab}
                        librariesAnimate={LibrariesAnimate}
                        UniScroll={UniScroll}
                        appState={appState}
                        unitId={data?.getSchoolInfo?.unitId}
                    />
                    <div
                        style={{
                            width: "97%",
                            margin: "0 auto"
                        }}
                    >
                        <Discussion uniId={data?.getSchoolInfo?.unitId} />
                        <Review uniId={data?.getSchoolInfo?.unitId} />
                    </div>
                </div>
            </section>
        </IonContent>
    ) : null
}
