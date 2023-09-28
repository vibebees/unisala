
import {useHistory, useLocation} from "react-router"
import useIsEmpty from "../../../../hooks/useIsEmpty"
import {createRef, useState} from "react"

export const getAllProps = ({id, loading, data, uniData, isSideBar}) => {

    const

        UniEmpty = useIsEmpty(uniData || {}, "School"),
        reportEmpty = useIsEmpty(uniData?.report || {}, "Report"),
        similarCollagesEmpty = useIsEmpty(uniData?.similarCollages || {}, "Report"),
        applicantsEmpty = useIsEmpty(uniData?.applicants || {}, "Applicants"),
        campusLifeEmpty = useIsEmpty(uniData?.students?.campusLife?.poll?.wordBestDescribe || {}, "WordBestDescribe"),
        libraryEmpty = useIsEmpty(uniData?.library || {}, "Library"),
        grantsEmpty = useIsEmpty(uniData?.grants || {}, "Grants"),
        testScoreEmpty = useIsEmpty(uniData?.testScore || {}, "TestScore"),
        visitWebsiteEmpty = useIsEmpty(uniData?.elevatorInfo?.urls || {}, "Urls"),
        professorsEmpty = useIsEmpty(uniData || {}, "Report"),
        interviewExperienceEmpty = useIsEmpty(uniData?.interviewExperience || {}, "InterviewExperience"),
        app = createRef(),
        profile = createRef(),
        statistics = createRef(),
        fees = createRef(),
        libraries = createRef(),
        grant = createRef(),
        testScore = createRef(),
        similarCollages = createRef(),
        report = createRef(),
        campusLife = createRef(),
        website = createRef(),
        Professors = createRef(),
        interviewExperience = createRef(),
        review = createRef(),

        [AdmisionAnimate, setAdmissionAnimate] = useState(false),
        [GrantAnimate, setGrantAnimate] = useState(false),
        [LibrariesAnimate, setLibrariesAnimate] = useState(false),
        [appState, setAppState] = useState({
            scrollTop: 0,
            clientHeight: 0
        }),
        history = useHistory(),
        location = useLocation(),
        queryParams = new URLSearchParams(location.search),
        tabFromURL = queryParams.get("tab"),
        [activeTab, setActiveTab] = useState(tabFromURL ? parseInt(tabFromURL) : 0),
        {scrollTop, clientHeight} = appState,
        UniScroll = () => {
            setAppState({
                scrollTop: app?.current?.scrollTop,
                clientHeight: app?.current?.clientHeight
            })
        },
        [width, setWidth] = useState(window.innerWidth),
        handleResize = () => {
            let {innerWidth} = window
            if (width !== innerWidth) {
                setWidth(innerWidth)
            }
        },
        handleScrolling = () => {
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
        }

    return {
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
        uniData,
        history,
        queryParams,
        interviewExperience,
        review,
        interviewExperienceEmpty,
        handleScrolling,
        reportDataSource: uniData?.report,
        campusPollDataSource: uniData?.students?.campusLife?.poll,
        isSideBar
    }

}
