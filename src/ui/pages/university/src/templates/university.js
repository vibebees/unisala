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

import {useDispatch, useSelector} from "react-redux"
import {getUniData} from "../../../../../store/action"
import PreLoader from "../../../../component/preloader"
import {isSideBar} from "../../../../../store/action/University"

import useDocTitle from "../../../../../hooks/useDocTitile"
import Review from "../../Discussion/Post"
import {useHistory, useLocation} from "react-router"
import {NoDataDefaultCard} from "../organisms/noDataCard"
import {UniversityHeader} from "../molecules/headerNavigator"
import {UniversityBuild} from "../organisms/university"

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
        activeTab,
        setActiveTab,
        scrollTop,
        clientHeight,
        handleResize,
        reportEmpty,
        similarCollagesEmpty,
        applicantsEmpty,
        uniData,
        history,
        queryParams,
        interviewExperienceEmpty,
        handleScrolling
    } = allProps,
    dispatch = useDispatch()

    useDocTitle(id)

    useEffect(() => {
        const currentTab = queryParams.get("tab")
        if (currentTab) {
            setActiveTab(parseInt(currentTab))
        }
    }, [location.search])

    useEffect(() => {
        const params = new URLSearchParams()
        params.set("tab", activeTab.toString())
        history.push({ search: params.toString() })
    }, [activeTab])

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
                professorsEmpty,
                interviewExperienceEmpty
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
        professorsEmpty,
        interviewExperienceEmpty
    ])

    useEffect(() => {
        handleScrolling()
    }, [scrollTop, activeTab, clientHeight])

     useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    return loading ? (
        <PreLoader />
    ) : UniEmpty ? (
       <NoDataDefaultCard/>
    ) : uniData ? (
        <UniversityBuild allProps={allProps} />
    ) : null
}
