import React from "react"
import Listsearch from "./atoms/List.search"
import FloatingButton from "component/FloatingButton"
import { addOutline } from "ionicons/icons"
import CreateListModal from "./atoms/CreateListModal"

const index = () => {
  return (
    <div className="min-h-[50vh]">
      <Listsearch />
      <FloatingButton
        Icon={addOutline}
        ModalData={CreateListModal}
        header="Create a List"
      />
    </div>
  )
}

export default index
