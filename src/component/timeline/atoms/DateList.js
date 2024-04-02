/* eslint-disable no-unreachable */
import { IonIcon } from "@ionic/react"
import clsx from "clsx"
import { Avatar, Button, Col, Row, Typography } from "component/ui"
import Modal from "component/ui/Modal"
import { closeCircle, create } from "ionicons/icons"
import { useState } from "react"
import ContributionsList from "../organism/ContributionsList"
import EditHistory from "./EditHistory"

const DateList = ({ date = "", content = "" }) => {
  const [edit, setedit] = useState(false)
  return (
    <Row className="border-t h-full py-2 px-4 group ion-no-margin ion-no-padding  border-neutral-400 border-opacity-25 items-center  justify-start flex">
      <Col size="3" className="ion-no-padding ion-no-margin">
        <Typography variant="h5" className="text-sm opacity-40">
          {date}
        </Typography>
      </Col>
      <Col className="ion-no-padding ion-no-margin  w-full">
        {edit ? (
          <EditHistory text={"Sonja joinedthe team"} />
        ) : (
          <Typography variant="h3" className="text-sm opacity-70">
            {content}
          </Typography>
        )}
      </Col>
      <Col>
        <Modal
          ModalButton={
            <Row className="ion-no-padding ion-no-margin  w-full">
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
            </Row>
          }
          ModalData={<ContributionsList />}
        />
      </Col>

      <Col
        size="auto"
        className={clsx(
          "ion-no-padding opacity-0 group-hover:opacity-100  ion-no-margin ",
          edit && "opacity-100"
        )}
      >
        <Button
          fill="clear"
          color="primary"
          className="text-sm opacity-70 ion-no-margin  "
          size="small"
          onClick={() => setedit(!edit)}
        >
          <IonIcon
            className={clsx("", edit && "text-red-500")}
            icon={edit ? closeCircle : create}
          />
        </Button>
      </Col>
    </Row>
  )
}

export default DateList
