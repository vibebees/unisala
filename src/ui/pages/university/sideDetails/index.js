// eslint-disable-next-line no-use-before-define
import React from "react"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from "@ionic/react"
import {
  barChartOutline,
  cashOutline,
  desktopOutline,
  homeOutline,
  libraryOutline,
  peopleOutline,
  receiptOutline,
  thumbsUpOutline,
  schoolOutline
} from "ionicons/icons"

import Grant from "./grant"
import Libraries from "./libraries"
import SimilarCollage from "./similarCollage"
import VisitWebsite from "./visitWebsite"
import Professors from "./professors"
import Interview from "./Interview"
import { useSelector } from "react-redux"
import Discussion from "../Discussion"
import Scholarship from "./scholarship"
import { ReportCard } from "../../../component/reportCard"
import { PollCard } from "../../../component/pollCard"
import { CardWithCircularGrid } from "../../../component/cardWithCircularGrid"
import StudentCharges from "./studentCharges"
import FinancialAid from "./financialAid"
import Statstics from "./statistics"
import Admission from "./admission"
import Ranking from "./Ranking"

const SideDetails = ({
  activeTab,
  appState,
  UniScroll,
  forwardedRef,
  admissionAnimate,
  grantAnimate,
  librariesAnimate,
  unitId,
  allProps
}) => {
  const {
    reportDataSource,
    campusPollDataSource,
    testScoreDataSource,
    isSideBar,
    uniData
  } = allProps

  const sideMenu = [
    !isSideBar?.scholarshipsEmpty && {
      title: "Scholarships",
      icon: schoolOutline,
      ref: "scholarship"
    },
    !isSideBar?.StudentChargesEmpty && {
      title: "Student Charges",
      icon: cashOutline,
      ref: "studentCharges"
    },

    !isSideBar?.adminssionEmpty && {
      title: "Admission",
      icon: cashOutline,
      ref: "adminssion"
    },

    !isSideBar?.financialAidEmpty && {
      title: "Aid",
      icon: thumbsUpOutline,
      ref: "financialAid"
    },

    !isSideBar?.statisticsEmpty && {
      title: "Statistics",
      icon: barChartOutline,
      ref: "statistics"
    },
    !isSideBar?.libraryEmpty && {
      title: "Libraries",
      icon: libraryOutline,
      ref: "libraries"
    },
    !isSideBar?.testScoreEmpty && {
      title: "Test Score",
      icon: homeOutline,
      ref: "testScore"
    },
    !isSideBar?.visitWebsiteEmpty && {
      title: "Visit Website",
      icon: desktopOutline,
      ref: "website"
    },
    !isSideBar?.professorsEmpty && {
      title: "Professors",
      icon: peopleOutline,
      ref: "Professors"
    },
    // !isSideBar?.grantsEmpty && {
    //   title: "Grant",
    //   icon: thumbsUpOutline,
    //   ref: "grant"
    // },

    !isSideBar?.similarCollagesEmpty && {
      title: "Similar Collages",
      icon: thumbsUpOutline,
      ref: "similarCollages"
    },
    !isSideBar?.reportEmpty && {
      title: "Report",
      icon: receiptOutline,
      ref: "report"
    },
    !isSideBar?.campusLifeEmpty && {
      title: "Campus Life",
      icon: thumbsUpOutline,
      ref: "campusLife"
    },

    !isSideBar?.interviewExperienceEmpty && {
      title: "Interview Experience",
      icon: receiptOutline,
      ref: "interviewExperience"
    }
  ]
  const [width, setWidth] = React.useState(window.innerWidth)
  const handleResize = () => {
    const { innerWidth } = window

    if (width !== innerWidth) {
      setWidth(innerWidth)
    }
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <IonGrid className={width > 719 ? "ion-padding" : ""}>
      <IonRow
        className=""
        style={{
          display: "flex"
        }}
      >
        {width > 720 && (
          <IonCol style={{ flexShrink: 0, height: "auto" }}>
            <IonCard
              style={{
                position: "sticky",
                top: "70px"

                // minWidth: "20vw"
              }}
            >
              <IonList>
                {sideMenu.map((item, i) => {
                  return (
                    item.title && (
                      <IonItem
                        style={{
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          forwardedRef.app.current.scrollTo(
                            0,
                            forwardedRef[item.ref].current.offsetTop +
                              forwardedRef.profile.current.clientHeight
                          )
                        }}
                        key={i}
                      >
                        <IonIcon
                          color={activeTab === i ? "primary" : "medium"}
                          icon={item.icon}
                        />
                        <IonLabel
                          color={activeTab === i ? "primary" : "dark"}
                          className="ion-margin-start"
                        >
                          <h2>{item.title}</h2>
                        </IonLabel>
                      </IonItem>
                    )
                  )
                })}
              </IonList>
            </IonCard>
          </IonCol>
        )}
        <IonCol className="w-[calc(100%-270px)]" style={{ flex: 1, margin: 0 }}>
          <section ref={forwardedRef.scholarship}>
            <Scholarship />
          </section>
          <section ref={forwardedRef.studentCharges}>
            <StudentCharges />
          </section>
          <section ref={forwardedRef.admission}>
            <Admission />
          </section>

          <section ref={forwardedRef.financialAid}>
            <FinancialAid />
          </section>

          <section ref={forwardedRef.statistics}>
            {/* <Admission
              appState={appState}
              admissionAnimate={admissionAnimate}
              UniScroll={UniScroll}
            /> */}
            <Statstics />
          </section>

          <section ref={forwardedRef.libraries}>
            <Libraries librariesAnimate={librariesAnimate} />
          </section>

          {/* <section ref={forwardedRef.grant}>
            <Grant grantAnimate={grantAnimate} />
          </section> */}

          <section ref={forwardedRef.testScore}>
            <CardWithCircularGrid
              dataSource={testScoreDataSource}
              parentProps={allProps}
            />
          </section>

          <section ref={forwardedRef.website}>
            <VisitWebsite />
          </section>
          <section ref={forwardedRef.Professors}>
            <Professors />
          </section>
          <section ref={forwardedRef.similarCollages}>
            <SimilarCollage />
          </section>
          <section ref={forwardedRef.Interview}>
            <Interview unitId={unitId} />
          </section>
          <section ref={forwardedRef.report}>
            <ReportCard
              dataSource={uniData.userEvaluation.report}
              parentProps={allProps}
            />
          </section>
          <section ref={forwardedRef.campusLife}>
            <PollCard
              dataSource={uniData.userEvaluation.reviews}
              parentProps={allProps}
            />
          </section>

          <section>
            <Ranking />
          </section>
          {/* <section ref={forwardedRef.Interview}>
            <Discussion unitId={unitId} />
          </section> */}
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}
export default SideDetails
