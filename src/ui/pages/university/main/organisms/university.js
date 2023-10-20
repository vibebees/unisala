import React, { useEffect, useState } from "react"
import {
  IonContent
} from "@ionic/react"
import Discussion from "../../Discussion"
import Review from "../../Discussion/Post"
import { HeaderNavigator } from "../molecules/headerNavigator"
import { SideNavigator } from "../molecules/sideNavigator"
import { UniversityHeader } from "../molecules/header"

export const UniversityBuild = ({ allProps }) => {
  const {
    data,
    app,
    profile,
    UniScroll
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
            <Discussion uniId={data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId} />
            <Review uniId={data?.getUpdatedSchoolInfo?.elevatorInfo?.unitId} />
          </div>
        </div>
      </section>
    </IonContent>
  )
}
