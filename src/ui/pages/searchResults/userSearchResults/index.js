// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonContent } from "@ionic/react"
import SearchResults from "./SearchResults"
import Filter from "./Filter"
import { useParams } from "react-router-dom"
import useWindowWidth from "../../../../hooks/useWindowWidth"
import useDocTitle from "../../../../hooks/useDocTitile"

function index({ query }) {
    const { name } = useParams()
    useDocTitle("Search ᛫ " + name)
    const windowWidth = useWindowWidth()
    return (
        <IonContent>
            <IonGrid className="max-width-container">
                <IonCard>
                    <IonCardContent>
                        <h1>Search Result for {query}: </h1>
                    </IonCardContent>
                </IonCard>

                <IonRow>
                    {windowWidth >= 768 && (
                        <IonCol className="filter-col">
                            <Filter />
                        </IonCol>
                    )}

                    <IonCol className="result-col">
                        <SearchResults />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default index
