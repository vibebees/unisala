import React from "react"
import Listsearch from "./atoms/List.search"
import FloatingButton from "component/FloatingButton"
import { addOutline } from "ionicons/icons"
import CreateListModal from "./atoms/CreateListModal"
import {
  IonText,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent
} from "@ionic/react"
import SingleList from "./atoms/SingleList"
import SingleUniversityList from "./atoms/SingleUniversityList"
import { useHistory } from "react-router"
import { URLgetter, URLdelete } from "utils/lib/URLupdate"
import Lists from "./molecules/Lists"

const index = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const data = URLgetter("id")
    if (data) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [history.location.search])

  return (
    <div className="min-h-[50vh]">
      <Listsearch />
      <section className="px-3">
        <IonText className="text-lg mt-6 font-bold ">Your Lists</IonText>
        <section>
          <SingleList />
          <SingleList />
          <SingleList />
          <SingleList />
          <br />
          <br />
          <br />
        </section>
        <IonModal isOpen={isOpen} backdropDismiss={false}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    const data = URLdelete("id")
                    history.push({ search: data })
                    setIsOpen(false)
                  }}
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <Lists />
          </IonContent>
        </IonModal>
      </section>
      <br />
      <br />
      <br />
      <FloatingButton
        Icon={addOutline}
        ModalData={CreateListModal}
        header="Create a List"
      />
    </div>
  )
}

export default index
