import CloseIcon from "Icons/CloseIcon"
import Tick from "Icons/Tick"
import { Avatar, Button, Input, Item, Typography } from "component/ui"
import { useState } from "react"
import EditIcon from "./EditIcon"

const Contribution = ({ profilePic, description }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [descriptiona, setDescription] = useState(description)
  return (
    <Item className=" ion-no-padding">
      <Avatar src={profilePic} />{" "}
      {isEdit ? (
        <Input
          value={descriptiona}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setIsEdit(false)}
          autoFocus
          className="w-full mx-2 text-sm !px-2"
        />
      ) : (
        <div className="w-full">
          <Typography variant="h2" className="ml-4 text-sm    ">
            {description}
          </Typography>
        </div>
      )}
      <Button fill="clear" onClick={() => setIsEdit(!isEdit)} className="">
        {isEdit ? (
          <CloseIcon width={20} height={20} />
        ) : (
          <EditIcon width={20} height={20} />
        )}
      </Button>
      {isEdit && (
        <Button fill="clear" className="">
          <Tick width={20} height={20} />
        </Button>
      )}
    </Item>
  )
}
export default Contribution
