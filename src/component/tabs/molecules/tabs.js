import {IonSegment} from "@ionic/react"
import Segments from "../atoms/Segment"
import {useState} from "react"
const Tabs = ({props}) => {
    const [selectedSegment, setSelectedSegment] = useState("home")

    const {options, onClick} = props

    return (
        <IonSegment value="default" scrollable= {true} >
            {
                options?.map(({name, icon}, i) => <Segments key={i} name={name} icon={icon} onClick={onClick} />)
            }
        </IonSegment>

    )
}
export default Tabs
