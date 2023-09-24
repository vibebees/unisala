
import useIsEmpty from "../../../../hooks/useIsEmpty"
import {createRef, useState} from "react"

export const getAllProps = ({id, loading, data, uniData}) => {

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
        [AdmisionAnimate, setAdmissionAnimate] = useState(false),
        [GrantAnimate, setGrantAnimate] = useState(false),
        [LibrariesAnimate, setLibrariesAnimate] = useState(false),
        [appState, setAppState] = useState({
            scrollTop: 0,
            clientHeight: 0
        }),
        [activeTab, setActiveTab] = useState(0),
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
        uniData
    }

}
