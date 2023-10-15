import React from "react"
import StudentChargeCard from "../atoms/StudentChargeCard"
import { IonIcon } from "@ionic/react"
import { chevronDownOutline } from "ionicons/icons"
import clsx from "clsx"

const StudentChargesGraduate = ({ data }) => {
  const [expand, setExpand] = React.useState(false)
  return (
    <>
      <div className="pt-3  border my-3 rounded-md mx-2 bg-neutral-100">
        <h1 className="my-3 px-5 font-medium text-lg">Graduate</h1>
        <div className="flex px-5  justify-start gap-3">
          <StudentChargeCard
            header="Applicatoin Fee"
            value={20}
            subHeader="Average"
          />
          <StudentChargeCard
            header="Room and Board Charges"
            value={20}
            subHeader="Average"
          />
        </div>
        <section
          className={clsx(
            "mt-5 transition-all duration-200 ease-linear",
            expand ? "h-full max-h-[19rem]" : "h-full max-h-0  overflow-hidden"
          )}
        >
          <section>
            <h1 className="my-3 px-5 font-medium text-lg">
              InState charge for Graduate
            </h1>
            <div className="flex px-5  justify-start gap-3">
              <StudentChargeCard
                header="Per Credit Hour"
                value={data.inState.perCreditHourCharge}
                subHeader="Average"
              />
              <StudentChargeCard
                header="Reqquired Fees"
                value={data.inState.requiredFees}
                subHeader="Average"
              />
              <StudentChargeCard
                header="Tuition Fees"
                value={data.inState.tuition}
                subHeader="Average"
              />
            </div>
          </section>
          <section>
            <h1 className="my-3 px-5 font-medium text-lg">
              Out State charge for Graduate
            </h1>
            <div className="flex px-5  justify-start gap-3">
              <StudentChargeCard
                header="Per Credit Hour"
                value={data.outOfState.perCreditHourCharge}
                subHeader="Average"
              />
              <StudentChargeCard
                header="Reqquired Fees"
                value={data.outOfState.requiredFees}
                subHeader="Average"
              />
              <StudentChargeCard
                header="Tuition Fees"
                value={data.outOfState.tuition}
                subHeader="Average"
              />
            </div>
          </section>
        </section>

        <div
          onClick={() => setExpand(!expand)}
          className="bg-gradient-to-t from-neutral-300   cursor-pointer  flex justify-center mt-3 pb-1 "
        >
          {/* <IonIcon
            className="text-lg pt-1 opacity-60 group-hover:opacity-100 text-center "
            icon={chevronDownOutline}
          /> */}
          <p>{expand ? "Show Less" : "Expand"}</p>
        </div>
      </div>
    </>
  )
}

export default StudentChargesGraduate
