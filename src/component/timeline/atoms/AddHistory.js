import { useMutation } from "@apollo/client"
import { IonInput, useIonToast } from "@ionic/react"
import { Button, Col, Grid, Row } from "component/ui"
import { OrgContext } from "features/org"
import { AddNewHistory } from "graphql/user"
import moment from "moment"
import { useContext, useState } from "react"
import { USER_SERVICE_GQL } from "servers/types"
import AddPeople from "./AddPeople"
import HistoryButton from "./SaveButton"

const AddHistory = ({ setData }) => {
  const { orgData } = useContext(OrgContext)
  const [addPeople, setAddPeople] = useState(true)
  const [present, dismiss] = useIonToast()
  const [data, setdata] = useState({
    date: Date.now(),
    description: ""
  })

  const [addHistoryMutation] = useMutation(AddNewHistory, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      orgId: orgData._id,
      title: data.description,
      description: data.description,
      date: moment(data.date).format("YYYY-MM-DD")
    },

    onCompleted: () => {
      setdata({ date: Date.now(), description: "" })
      present({
        duration: 3000,
        message: "History added successfully",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
  })
  return (
    <Grid className="ion-no-padding   w-full h-full ion-no-margin  mb-8 mt-4  justify-between rounded-md ">
      <Row className="w-full border justify-between h-full border-neutral-400 rounded-md ">
        <Col className="" size="auto">
          <IonInput
            className=" !px-2 h-full w-28 rounded-md shadow-md bg-white  ion-no-margin ion-no-padding pointer-events-none border-none"
            type="text"
            placeholder="Enter data"
            value={moment(data.date).format("YYYY-MM-DD")}
            onChange={(e) =>
              setdata((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </Col>
        <Col className=" border  bg-neutral-100 w-full  ion-no-margin ion-no-padding ">
          <IonInput
            autofocus
            className="w-full ml-2  ion-no-padding h-full ion-no-margin  border-none "
            placeholder="Enter history description"
            value={data.description}
            onIonChange={(e) =>
              setdata((prev) => ({ ...prev, description: e.detail.value }))
            }
          />
        </Col>

        <Col
          size="auto"
          className="ion-no-margin   bg-neutral-50 ion-no-padding"
        >
          <Button
            onClick={() => {
              setAddPeople(!addPeople)
            }}
            fill="outline"
            className="ion-no-margin w-fit"
          >
            Add People
          </Button>
        </Col>
      </Row>
      {addPeople && <AddPeople />}
      <Col className="w-full my-3 ">
        <HistoryButton
          label="Save History"
          loading={false}
          onClick={addHistoryMutation}
          className={"w-full my-5"}
        />
      </Col>
    </Grid>
  )
}

export default AddHistory
