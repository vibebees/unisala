import AboutUser from "./aboutUser"
import Badges from "./badges"
import TestScore from "./testScore"
import Education from "./education"

function index({ data }) {
  const { about, badges, education, testScore, myProfile } = data
  return (
    <>
      {(myProfile || (!myProfile && !about.private && about.text)) && (
        <AboutUser about={about} myProfile={myProfile} />
      )}
      <Badges badge={badges} myProfile={myProfile} />
      {(myProfile ||
        (!myProfile && !education.private && education.schools.length > 0)) && (
        <Education education={education} myProfile={myProfile} />
      )}
      {(myProfile ||
        (!myProfile &&
          !testScore.private &&
          (testScore.scores?.ACT_SCORE?.maths ||
            testScore.scores?.SAT_SCORE?.maths ||
            testScore.scores?.IELTS_SCORE?.score ||
            testScore.scores?.TOEFL_SCORE?.score))) && (
        <TestScore testScore={testScore} myProfile={myProfile} />
      )}
    </>
  )
}

export default index
