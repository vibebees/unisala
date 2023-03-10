import { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonModal,
  IonHeader,
  IonButtons,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  useIonToast
} from "@ionic/react"
import { people } from "ionicons/icons"
import { useQuery, useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
import {
  ConnectedList,
  getUserGql,
  RemoveConnectRequest
} from "../../../../graphql/user/"
import StateMessage from "../../../component/stateMessage"
import { USER_SERVICE_GQL } from "../../../../servers/types"

function index() {
  const [isOpen, setIsOpen] = useState(false),
    { user } = useSelector((store) => store?.userProfile),
    { data } = useQuery(ConnectedList, {
      context: { server: USER_SERVICE_GQL },
      variables: { userId: user._id }
    }),
    [present, dismiss] = useIonToast(),
    [removeConnectRequest] = useMutation(RemoveConnectRequest, {
      context: { server: USER_SERVICE_GQL },
      onError: (error) => {
        present({
          duration: 3000,
          message: error.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    })

  return (
    <IonCard>
      <IonCardContent>
        <IonText color="dark">Manage network</IonText>
        <div
          className="flex mt-05"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <div className="inline-2">
            <IonIcon icon={people} className="grey-icon-32" />
            <h2>Connections</h2>
          </div>
          <h2>{data?.connectedList?.connectionList.length}</h2>
        </div>
      </IonCardContent>

      <IonModal
        isOpen={isOpen}
        mode="ios"
        onDidDismiss={() => setIsOpen(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Manage Connection</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding modal-content">
          {data?.connectedList?.connectionList.map((item, index) => {
            return (
              <IonItem mode="ios" className="mb-1" key={index} lines="full">
                <IonAvatar slot="start">
                  <img
                    src="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
                    alt=""
                  />
                </IonAvatar>
                <IonLabel>
                  <div className="flex">
                    <div>
                      <h2>{item.user.firstName + " " + item.user.lastName}</h2>
                      <p>{item.user.username}</p>
                    </div>
                    <IonButton
                      mode="ios"
                      onClick={() =>
                        removeConnectRequest({
                          variables: { connecteeId: item.user._id },
                          update: (cache) => {
                            const getUser = cache.readQuery({
                              query: getUserGql,
                              variables: { username: item.user.username }
                            })
                            getUser &&
                              cache.writeQuery({
                                query: getUserGql,
                                variables: { username: item.user.username },
                                data: {
                                  getUser: {
                                    ...getUser.getUser,
                                    connectionType: null,
                                    user: getUser.getUser.user
                                  }
                                }
                              })
                          }
                        })
                      }
                      color="dark"
                      fill="outline"
                    >
                      Disconnect
                    </IonButton>
                  </div>
                </IonLabel>
              </IonItem>
            )
          })}
          {!data?.connectedList?.connectionList.length && (
            <StateMessage
              title="No Connections yet"
              subtitle="Add connections to see them here"
            />
          )}
        </IonContent>
      </IonModal>
    </IonCard>
  )
}

export default index
