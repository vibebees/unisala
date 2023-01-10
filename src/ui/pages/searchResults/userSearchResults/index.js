// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react"
import SearchResults from "./SearchResults"
import Filter from "./Filter"
import useWindowWidth from "../../../../hooks/useWindowWidth"

function index({ query }) {
    const windowWidth = useWindowWidth()
    return (
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
    )
}

export default index
