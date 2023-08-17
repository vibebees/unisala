import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonPopover
} from "@ionic/react"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import { useSelector } from "react-redux"
import { DeleteSpace } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useMutation } from "@apollo/client"

const linearGradientStyle = {
  background: "linear-gradient(90deg, rgba(0,0,0) 20%, rgba(99,96,96,1) 62%)"
}

const SpaceHeader = ({ spaceDetails }) => {
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  //   the user who created this space
  const { user } = spaceDetails || {}

  //  delete space
  const [deleteSpace] = useMutation(DeleteSpace, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: spaceDetails?._id }
  })
  return (
    <IonCard className="profile-header">
      <IonCardHeader className="ion-no-padding">
        <img className="w-full" src={spaceDetails?.image} alt="" />
      </IonCardHeader>

      <div
        style={linearGradientStyle}
        className="relative p-4 bg-gradient-to-r from-black from-40% via-[#282828] via-60% to-black to-100% text-white"
      >
        <h1 className="text-lg capitalize font-extrabold ">
          {spaceDetails?.name}
        </h1>
        <p className="font-medium ">{spaceDetails?.description}</p>

        {loggedinUser?.username === user?.username && (
          <>
            <IonButton className="absolute right-5 top-2" fill="clear" id="pop">
              <IonIcon
                className="text-2xl text-white cursor-pointer"
                icon={ellipsisHorizontalOutline}
              />
            </IonButton>
            <IonPopover trigger="pop" triggerAction="click" size="auto">
              <IonContent>
                <IonButton
                  expand="full"
                  fill="clear"
                  className="text-black font-normal"
                >
                  <IonIcon slot="start" icon={create} />
                  Update Space
                </IonButton>
                <IonButton
                  expand="full"
                  fill="clear"
                  className="text-black font-normal"
                  onClick={deleteSpace}
                >
                  <IonIcon slot="start" icon={trash} />
                  Delete Space
                </IonButton>
              </IonContent>
            </IonPopover>
          </>
        )}
      </div>
    </IonCard>
  )
}

export default SpaceHeader
