import { IonCol, IonInput, IonRow } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import SaveButton from "./SaveButton"

const AddHistory = ({ setData }) => {
  const [data, setdata] = useState({
    date: Date.now(),
    description: ""
  })

  const addHistory = () => {
    let content = {
      date: data.date,
      content: data.description
    }
    setData((prev) => {
      const newData = prev.map((item) => {
        if (item.title === "2024") {
          return {
            ...item,
            child: [...item.child, content]
          }
        }
        return item
      })
      return newData
    })
    setdata({ date: Date.now(), description: "" })
  }

  return (
    <IonRow className="ion-no-padding h-11 ion-no-margin  mb-8 mt-4  justify-between rounded-md bg-neutral-200">
      <IonCol size="2" className="bg-white rounded-md pl-3 ">
        <IonInput
          className="w-full h-full ion-no-margin ion-no-padding pointer-events-none border-none"
          type="text"
          placeholder="Enter data"
          value={moment(data.date).format("YYYY-MM-DD")}
          onChange={(e) =>
            setdata((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </IonCol>
      <IonCol size="8" className="h-full pl-2 ion-no-margin ion-no-padding ">
        <IonInput
          autofocus
          className="w-full ion-no-padding h-full ion-no-margin  border-none "
          placeholder="Enter history description"
          value={data.description}
          onIonChange={(e) =>
            setdata((prev) => ({ ...prev, description: e.detail.value }))
          }
        />
      </IonCol>

      <IonCol size="auto" className="ion-no-margin ion-no-padding">
        <SaveButton label="Save" loading={false} onClick={addHistory} />
      </IonCol>
    </IonRow>
  )
}

export default AddHistory
