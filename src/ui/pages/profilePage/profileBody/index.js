// eslint-disable-next-line no-use-before-define
import React from "react"
import AboutUser from "./aboutUser"
import Badges from "./badges"
import TestScore from "./testScore"
import Education from "./education"

function index({ data }) {
    const { about, badges, education, testScore, myProfile } = data
    return (
        <>
            <AboutUser about={about} myProfile={myProfile} />
            <Badges badge={badges} myProfile={myProfile} />
            <Education education={education} myProfile={myProfile} />
            <TestScore testScore={testScore} myProfile={myProfile} />
        </>
    )
}

export default index
