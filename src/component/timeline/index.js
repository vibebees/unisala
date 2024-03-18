import { IonGrid } from "@ionic/react"

// import StepInput from "../../component/roadmap/StepInput"
import SingleTimeline from "./organism/SingleTimeline"

export const TimeLine = ({ data }) => {
  // const [firstStep, setfirstStep] = useState(true)
  // const [data, setdata] = useState({
  //   stepOne: "",
  //   stepTwo: "",
  //   stepThree: "",
  //   stepFour: ""
  // })

  return (
    <IonGrid
      style={{ maxWidth: "900px" }}
      className="w-full ion-no-margin ion-no-padding"
    >
      <SingleTimeline data={data} />
    </IonGrid>
  )
}
