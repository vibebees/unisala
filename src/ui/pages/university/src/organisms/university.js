import React, { useEffect, useState } from "react"
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { UniProfile } from "../../uniProfile"
import Discussion from "../../Discussion"

import { useDispatch, useSelector } from "react-redux"
import { getUniData } from "../../../../../store/action"
import PreLoader from "../../../../component/preloader"
import { isSideBar } from "../../../../../store/action/University"

import useDocTitle from "../../../../../hooks/useDocTitile"
import Review from "../../Discussion/Post"
import { useHistory, useLocation } from "react-router"
import { NoDataDefaultCard } from "./noDataCard"
import { HeaderNavigator } from "../molecules/headerNavigator"
import { SideNavigator } from "../molecules/sideNavigator"
import { UniversityHeader } from "../molecules/header"

export const UniversityBuild = ({ allProps }) => {
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
    LibrariesAnimate,
    appState,
    activeTab,
    UniScroll,
    uniData,
    interviewExperience,
    GrantAnimate,
    scholarshipsEmpty,
    StudentChargesEmpty
  } = allProps

  return (
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
        <HeaderNavigator allProps={allProps} />
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div ref={profile}>
            <UniversityHeader allProps={allProps} />
          </div>
          <SideNavigator allProps={allProps} />
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
  )
}
