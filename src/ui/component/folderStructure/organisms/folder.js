import { IonCol, IonList, IonText } from "@ionic/react"
import { shieldOutline } from "ionicons/icons"
import {SeeMoreButton} from "../molecules/seeMoreButton"
import {Table} from "../molecules/table"
import {IconAtom} from "../atoms/iconAtom"
import SeeMoreModal from "../modal"
import {DetailItem} from "../molecules/detailItem"

export const FolderGeneral = ({item, allProps}) => {
    const {
        icon = shieldOutline,
        iconSize = 9,
        routing,
        folderSize = `text-${iconSize}xl text-blue-400`,
        name,
        label,
        link
    } = item

    console.log(iconSize, folderSize)
  return (
    <>
      <IonCol className="h-80 bg-neutral-50 px-0 shadow-md rounded-md flex justify-center flex-col items-center min-w-[250px] !shrink-0">
        <IconAtom icon={icon} className={folderSize} />
        <div className="w-full">
          <h3 className="text-center px-2 leading-5 text-lg !font-semibold text-neutral-700">
            {name}
          </h3>
        </div>
      </IonCol>
    </>
  )
}
