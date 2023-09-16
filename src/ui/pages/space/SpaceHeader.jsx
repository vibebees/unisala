import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonModal,
  IonPopover,
  IonTitle,
  IonToolbar,
  useIonToast
} from "@ionic/react"
import { create, ellipsisHorizontalOutline, trash } from "ionicons/icons"
import { useSelector } from "react-redux"
import { DeleteSpace } from "../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router"
import { useState } from "react"
import UpdateSpaceForm from "../../component/updateSpace/UpdateSpaceForm"

const linearGradientStyle = {
  background: "linear-gradient(90deg, rgba(0,0,0) 20%, rgba(99,96,96,1) 62%)"
}

const SpaceHeader = ({ spaceDetails }) => {
  const { user: loggedinUser } = useSelector((state) => state.userProfile)

  //   the user who created this space
  const { user } = spaceDetails || {}
  const [present, dismiss] = useIonToast()
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)

  //  delete space
  const [deleteSpace] = useMutation(DeleteSpace, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: spaceDetails?._id },
    onCompleted: (data) => {
      if (data?.deleteSpaceCategoryById?.success) {
        present({
          duration: 5000,
          className: "text-white font-bold",
          message: "Space has been deleted successfully",
          buttons: [
            {
              text: "X",
              handler: () => {
                dismiss()
              }
            }
          ],
          color: "primary",
          mode: "ios"
        })

        setTimeout(() => {
          history.push("/home")
        }, 100)
      } else {
        present({
          duration: 3000,
          message: "Error occured while deleting the space.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  console.log(spaceDetails.image)
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
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <IonIcon slot="start" icon={create} />
                  Update Space
                </IonButton>

                <IonModal isOpen={isOpen}>
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Update Your Space</IonTitle>
                      <IonButton
                        onClick={() => setIsOpen(false)}
                        slot="end"
                        fill="clear"
                      >
                        Close
                      </IonButton>
                    </IonToolbar>
                  </IonHeader>

                  <UpdateSpaceForm
                    spaceDetails={spaceDetails}
                    setIsOpen={setIsOpen}
                  />
                </IonModal>

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
