import {IonSegment} from "@ionic/react"
import Segments from "../atoms/Segment"
const Tabs = ({props}) => {
    const {options, onClick, scrollable = true} = props
    return (
        <IonSegment value="default" scrollable= {scrollable} >
            {
                options?.map(({name, icon, count = false, nav }, i) => <Segments
                    key={i}
                    name={name}
                    icon={icon}
                    onClick={onClick}
                    count={count}
                    nav={nav}
                />)
            }
        </IonSegment>

    )
}
export default Tabs
