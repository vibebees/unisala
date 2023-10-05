import SideDetails from "../../sideDetails"

export const SideNavigator = ({ allProps }) => {
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
    studentCharges,
    scholarship,
    AdmisionAnimate,
    GrantAnimate,
    LibrariesAnimate,
    appState,
    activeTab,
    UniScroll,
    interviewExperience,
    scholarshipsEmpty,
    StudentChargesEmpty,
    financialAidEmpty,
    financialAid
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
        scholarship,
        studentCharges,
        interviewExperience,
        scholarshipsEmpty,
        StudentChargesEmpty,
        financialAidEmpty,
        financialAid
      }}
      admissionAnimate={AdmisionAnimate}
      grantAnimate={GrantAnimate}
      activeTab={activeTab}
      librariesAnimate={LibrariesAnimate}
      UniScroll={UniScroll}
      appState={appState}
      unitId={data?.getSchoolInfo?.unitId}
      allProps={allProps}
    />
  )
}
