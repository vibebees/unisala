import React from "react"
import { useSelector } from "react-redux"
import { IonCard, IonCardContent, IonGrid } from "@ionic/react"
import TableOne from "./template/TableOne"
import TableTwo from "./template/TableTwo"
import ApplicationCharge from "./template/ApplicationCharge"

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
          <TableOne
            data={studentCharges?.undergraduate}
            level={"UndeGraduate"}
          />
          <TableOne data={studentCharges?.graduate} level={"Graduate"} />
        </section>
        <br />

        <section className="px-5 max-md:px-1 py-4 pb-7">
          <TableTwo
            data={studentCharges?.undergraduate}
            level={"UndeGraduate"}
          />

          <TableTwo data={studentCharges?.graduate} level={"Graduate"} />
        </section>
        <IonCard className="px-6 max-md:px-2 py-3 mb-10 bg-blue-400 text-white">
          <h2 className=" px-3 text-lg font-semibold">Application Charges</h2>
          <ApplicationCharge allProps={{ studentCharges: studentCharges }} />
        </IonCard>
      </IonCard>
    </>
  )
}

export default index
