// eslint-disable-next-line no-use-before-define
import React from "react"
import {
    IonList,
    IonLabel,
    IonListHeader,
    IonAvatar,
    IonItem,
    IonCard
} from "@ionic/react"

function Sidebar() {
    const topUni = [
        {
            location: "Cambridge, MA",
            name: "Harvard University",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85CYmrXtcB5lixCO4OD31B0lH2bSUWnYlwzXt&s=0"
        },
        {
            location: "New York, NY",
            name: "New York, NY",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvc2BzBLe6O21S54mP4emzDPX0BV7Uha9kh0V&s=0"
        },
        {
            location: "Princeton, NJ",
            name: "Princeton University",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNw-o9FeNO_CPrOI_0GXJubkKMN1ORUHGILlo&s=0"
        },
        {
            location: "Stanford, CA",
            name: "Stanford University",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAc3w5Bl9m8O-BjtEBT5ag4o95voXy8uJQ1iC&s=0"
        },
        {
            location: "Berkeley, CA",
            name: "University of California",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuS-57V0-jthS3Xt7V-w-H3aYD2FfUg0rZEOAx&s=0"
        },
        {
            location: "Philadelphia, PA",
            name: "California Institute of Technology",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbypxZ6lLq4T3ZXxprpRysIjk03Zbr2rtBzLu2&s=0"
        }
    ]
    return (
        <IonCard>
            <IonList lines="none">
                <IonListHeader>
                    <h3>Top Universities</h3>
                </IonListHeader>

                {topUni.map((University, i) => {
                    const { location, name, img } = University
                    return (
                        <IonItem key={i}>
                            <IonAvatar slot="start">
                                <img src={img} />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{name}</h2>
                                <p>{location}</p>
                            </IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        </IonCard>
    )
}

export default Sidebar
