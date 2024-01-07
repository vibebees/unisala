import React, { createContext } from "react"
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
import ListContainer from "./molecules/ListContainer"
import SingleUniversityList from "./atoms/SingleUniversityList"
import { useHistory } from "react-router"
import { URLgetter, URLdelete } from "utils/lib/URLupdate"
import Lists from "./molecules/Lists"

export const ListContext = createContext()

const index = () => {
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)
  const [lists, setLists] = React.useState([])

  React.useEffect(() => {
    const data = URLgetter("id")
    if (data) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [history.location.search])

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      <div className="min-h-[50vh]">
        {/* <Listsearch /> */}
        <br />
        <section className="px-3">
          <IonText className="text-lg mt-6 font-bold ">Your Lists</IonText>
          <section>
            <ListContainer />
            <br />
            <br />
            <br />
          </section>
          <IonModal isOpen={isOpen} backdropDismiss={false}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Lists</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    className=""
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
            <IonContent className="ion-padding ion-margin">
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
    </ListContext.Provider>
  )
}

export default index
