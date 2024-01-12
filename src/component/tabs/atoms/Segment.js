import {IonIcon, IonLabel, IonSegmentButton} from "@ionic/react"
import {home, people} from "ionicons/icons"
import * as icons from "ionicons/icons"

const Segment = ({name = "", icon = "", onClick = () => {}}) => {
    const iconName = icon in icons ? icons[icon] : icons["alert"]
    return (
        <>
            <IonSegmentButton value={name} onClick={onClick}>
            <IonIcon icon={iconName}></IonIcon>
                <IonLabel>{name}</IonLabel>
            </IonSegmentButton>
        </>

    )

}
export default Segment
