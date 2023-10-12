import React from "react"
import { useSelector } from "react-redux"
import { IonCard, IonCardContent, IonGrid } from "@ionic/react"
import GrantCard from "../grant/GrantCard"
import StudentChargeUnderGraduateTable from "../template/StudentChargeUnderGraduateTable"
import StudentChargeGraduateTable from "../template/StudentChargeGraduateTable"
import StudentChargeUnderGraduateTable2 from "../template/StudentChargeUnderGraduateTable2"
import Table from "../../../../component/TableCard/template/Table"
import UnderGraduateTableOne from "./undrGraduate/TableOne"

const index = () => {
  const { uniData, sidebar } = useSelector((store) => store?.university)

  const studentCharges = uniData?.studentCharges

  return (
    <>
      <IonCard
        style={{
          margin: "10px 0px 0px 0px "
        }}
        className="flex flex-col"
      >
        <h2 className="font-normal border-b border-neutral-300 text-neutral-700 px-2 text-lg py-2">
          Student Charges
        </h2>

        <section className="w-full max-md:flex-col gap-3 flex px-5 py-4">
          <div className="w-full">
            <h2 className="!text-neutral-800 font-semibold">UnderGraduate</h2>
            <UnderGraduateTableOne data={studentCharges.undergraduate} />
          </div>
          <div className="w-full">
            <h2 className="!text-neutral-800 font-semibold">Graduate</h2>
            <StudentChargeGraduateTable data={studentCharges.graduate} />
          </div>
        </section>
        <br />

        <section className="px-5 max-md:px-1 py-4 pb-7">
          <div className="w-full">
            <h2 className="!text-neutral-800 font-semibold">UnderGraduate</h2>
            <StudentChargeUnderGraduateTable2
              data={studentCharges.undergraduate}
            />
          </div>
          {studentCharges?.graduate.offCampusNotWithFamily ||
            (studentCharges?.graduate?.onCampus && (
              <div className="w-full mt-6">
                <h2 className="!text-neutral-800 font-semibold">Graduate</h2>
                <StudentChargeUnderGraduateTable2
                  data={studentCharges?.graduate}
                />
              </div>
            ))}
        </section>
        <section className="px-6 max-md:px-2 py-3 mb-10">
          <h2 className="!text-neutral-800 font-semibold">Extra Charges</h2>
          <div className="w-full flex justify-start gap-4 mt-3">
            <div className=" flex flex-col gap-2">
              {studentCharges.combinedChargeForRoomAndBoard !== -1 && (
                <h3>Combined charges for Room and Board</h3>
              )}
              {studentCharges.graduateApplicationFee !== -1 && (
                <h3>Graduate Application Fee</h3>
              )}
              {studentCharges.undergraduateApplicationFee !== -1 && (
                <h3>Undergraduate Application Fee</h3>
              )}
            </div>
            <div className=" flex flex-col gap-2">
              {studentCharges.combinedChargeForRoomAndBoard !== -1 && (
                <h1>
                  : <span className="px-2" /> $ {""}
                  {studentCharges.combinedChargeForRoomAndBoard}
                </h1>
              )}
              {studentCharges.graduateApplicationFee !== -1 && (
                <h1>
                  : <span className="px-2" />$ {""}
                  {studentCharges.graduateApplicationFee}
                </h1>
              )}
              {studentCharges.undergraduateApplicationFee !== -1 && (
                <h1>
                  : <span className="px-2" />$ {""}
                  {studentCharges.undergraduateApplicationFee}
                </h1>
              )}
            </div>
          </div>
        </section>
      </IonCard>
    </>
  )
}

export default index
