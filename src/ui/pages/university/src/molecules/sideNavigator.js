import SideDetails from "../../sideDetails"

export const SideNavigator = ({allProps}) => {

    const {
        data,
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
        GrantAnimate,
        LibrariesAnimate,
        appState,
        activeTab,
        UniScroll,
        interviewExperience
    } = allProps

      return (
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
                            Professors,
                            interviewExperience
                        }}
                        admissionAnimate={AdmisionAnimate}
                        grantAnimate={GrantAnimate}
                        activeTab={activeTab}
                        librariesAnimate={LibrariesAnimate}
                        UniScroll={UniScroll}
                        appState={appState}
                        unitId={data?.getSchoolInfo?.unitId}
                        allProps = {allProps}
                    />
    )
}
