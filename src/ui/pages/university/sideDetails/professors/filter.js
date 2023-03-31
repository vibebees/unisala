import { IonItem, IonList, IonSearchbar, IonSelect, IonSelectOption } from "@ionic/react"
import { useState } from "react"
import { global } from "../../../../../mockData/utils"

export function professorFilter() {
    const { subjects } = global
    let
        [results, setResults] = useState([...subjects]),
        [displayList, setDisplayList] = useState(false)

    const handleChange = (ev) => {
        let query = ""
        const { target } = ev
        if (target) query = target.value.toLowerCase()
        if (displayList) setDisplayList(true)
        setResults(subjects.filter((d) => d.toLowerCase().indexOf(query) > -1))
    }

    return (<div className="search-control">
        <h2 className="search-control__label">Majors</h2>
        <div className="field search-field">
            {/* <IonSelect
                interface="popover"
                placeholder="Any"
                className="select-field"
            >
                <IonSelectOption value="Any">Any</IonSelectOption>
                <IonSelectOption value="Agricultural Science">
                    Agricultural Science
                </IonSelectOption>
                <IonSelectOption value="Art">Art</IonSelectOption>
                <IonSelectOption value="Architecture">
                    Architecture
                </IonSelectOption>
            </IonSelect> */}
            <IonSearchbar animated={true} debounce={1000} placeholder="Computer Science" onIonChange={(ev) => handleChange(ev)}></IonSearchbar>
            {
                <IonList>
                    {results.map((result, index) => {
                        if (index > 3) {
                            return <IonItem key={index}>{result}</IonItem>
                        }
                        return ""
                    })}
                </IonList>}
        </div >
    </div >)
}
