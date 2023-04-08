import {
    IonCard,
    IonText,
    IonCol,
    IonItem,
    IonAvatar,
    IonLabel
} from "@ionic/react"
import { Link } from "react-router-dom"

export const screenGreaterThan1000 = ({ title }) => {
    return (
        <IonCol
            size="auto"
            style={{
                maxWidth: "250px",
                height: "90vh",
                position: "sticky",
                top: "15px",
                overflow: "auto"
            }}
        >
            <IonCard>
                <IonText color="dark">
                    <h6 style={{ padding: "10px" }}> {title }</h6>
                </IonText>

                {[
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85CYmrXtcB5lixCO4OD31B0lH2bSUWnYlwzXt&s=0"
                    },
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvc2BzBLe6O21S54mP4emzDPX0BV7Uha9kh0V&s=0"
                    },
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNw-o9FeNO_CPrOI_0GXJubkKMN1ORUHGILlo&s=0"
                    },
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAc3w5Bl9m8O-BjtEBT5ag4o95voXy8uJQ1iC&s=0"
                    },
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuS-57V0-jthS3Xt7V-w-H3aYD2FfUg0rZEOAx&s=0"
                    },
                    {
                        name: "Category #",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbypxZ6lLq4T3ZXxprpRysIjk03Zbr2rtBzLu2&s=0"
                    }
                ].map((item, index) => {
                    return (
                        <Link to={"/space/" + item?.name} key={index}>
                        <IonItem
                            style={{
                                margin: "0px",
                                padding: "0px"
                            }}
                            lines="none"
                            key={index}
                        >
                            <IonAvatar slot="start">
                                <img src={item.img} />
                            </IonAvatar>
                            <IonLabel>
                                <h2
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {item.name}
                                </h2>
                                <p
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {item.location}
                                </p>
                            </IonLabel>
                        </IonItem>
                      </Link>

                    )
                })}
            </IonCard>
        </IonCol>
    )
}
