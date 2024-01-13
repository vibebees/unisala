import {IonIcon, IonLabel, IonSegmentButton} from "@ionic/react"
import * as icons from "ionicons/icons"
import {useLocation} from "react-router"

const Segment = ({name = "", icon = "", onClick = () => {}, nav = ""}) => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const iconName = icon in icons ? icons[icon] : icons["alert"]
    let isActive = false

        // Check if any query parameter value matches the 'name'
        queryParams.forEach((value) => {
            if (value.toLowerCase() === name.toLowerCase()) {
                isActive = true
            }
        })

    const activeClasses = isActive ? "bg-blue-500 text-white" : "bg-transparent text-gray-600"
return (
        <>
            <IonSegmentButton value={name} onClick={(e) => onClick(e, nav)} className={activeClasses}>
            <IonIcon icon={iconName}></IonIcon>
                <IonLabel>{name}</IonLabel>
            </IonSegmentButton>
        </>

    )

}
export default Segment
