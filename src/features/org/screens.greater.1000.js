import { useQuery } from "@apollo/client"
import {
  IonCard,
  IonText,
  IonCol,
  IonItem,
  IonAvatar,
  IonLabel
} from "@ionic/react"
import { Link } from "react-router-dom"
import CreateSpace from "../../component/createSpace/CreateSpace"
import TopSpaces from "../../component/TopSpaces/TopSpaces"
import clsx from "clsx"
import TopOrgs from "./TopOrgs"

export const screenGreaterThan1000 = ({ title, topOrgs }) => {
  console.log({ topOrgs })
  return (
    <>
      <IonCol
        className=" ion-no-margin ion-no-padding "
        size="auto"
        style={{
          maxWidth: "250px",
          height: "90vh",
          position: "sticky",
          top: "16px",
          overflow: "auto"
        }}
      >
        <div className="mt-3">{title === "Top Orgs" && <CreateSpace />}</div>

        <IonCard className="min-w-[250px] mt-5 ion-no-margin ion-no-padding">
          <IonText color="dark">
            <h6 className="text-center my-2 font-semibold">
              {" "}
              Top Organizations
            </h6>
          </IonText>

          {Array.isArray(topOrgs) && <TopOrgs topOrgs={topOrgs} />}
        </IonCard>
      </IonCol>
    </>
  )
}
