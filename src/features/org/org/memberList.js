import MessageIcon2 from "Icons/MessageIcon2"
import { Avatar } from "component/Avatar"
import { Button, Col, Row, Typography } from "component/ui"

const memberList = ({
  profileBanner,
  profileImg,
  name,
  username,
  loaction: userLocation,
  oneLineBio,
  children
}) => {
  return (
    <Row className="border py-2 px-2 ion-no-padding ion-no-margin hover:bg-neutral-200 rounded-md w-full ion-no-padding ion-no-margin">
      <Col size={11} className="flex justify-start">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Avatar profilePic={profileImg} username={username} />
        </div>
        <div>
          <Typography variant="h2" className="w-full ml-2 mt-1">
            Dipu chaurasiya{" "}
            <span className="text-neutral-50 ml-3 text-xs pb-px bg-blue-400 px-2 rounded-full leading-normal">
              member
            </span>
            <span className="text-neutral-50 ml-3 text-xs pb-px bg-green-500 px-2 rounded-full leading-normal">
              Computer science
            </span>
          </Typography>
          <Typography
            variant="p"
            className="w-full ml-2 text-neutral-500 text-sm"
          >
            @dipu
          </Typography>
        </div>
      </Col>
      <Col
        size={1}
        className=" grid  ion-no-margin ion-no-padding items-center"
      >
        <Button
          fill="clear"
          size="small"
          shape="round"
          className="!w-fit rounded-full h-fit"
        >
          <MessageIcon2 />
        </Button>
      </Col>
    </Row>
  )
}

export default memberList
