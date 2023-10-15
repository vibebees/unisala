import {
    IonCard,
    IonList
} from "@ionic/react"
import {musicalNotes} from "ionicons/icons"
import "./index.css"
import {ThreadSkeleton} from "./threadSkeleton"
const R = require("ramda")

export const FeedSkeleton = () => {
    const skeleton = R.range(0, 3)
    return (

        <IonList>
            {skeleton.map((item, key) => <ThreadSkeleton key={item} style ={{marginTop: "50px"}} />)}
        </IonList>

    )
}
