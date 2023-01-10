// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonContent
} from "@ionic/react"
import useWindowWidth from "../../../../hooks/useWindowWidth"
import Filter from "./Filter"
import SearchResults from "./SearchResults"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchGetSuccess } from "../../../../store/action/index"
import { useQuery } from "@apollo/client"
import UniSearch from "../../../../graphql/uni/UniSearch"

function index({ query, match }) {
    const { name } = useParams()
    const windowWidth = useWindowWidth()

    const dispatch = useDispatch()
    const { loading, error, data } = useQuery(UniSearch(name), {
        context: { clientName: "uni" }
    })
    useEffect(() => {
        dispatch(searchGetSuccess(data?.searchSchool))
    }, [data])

    return (
        <IonContent>
            <IonGrid className="max-width-container">
                <IonCard>
                    <IonCardContent>
                        <h1>Search Result for {query}: </h1>
                    </IonCardContent>
                </IonCard>

                <IonRow>
                    {windowWidth > 768 && (
                        <IonCol className="filter-col">
                            <Filter />
                        </IonCol>
                    )}

                    <IonCol className="results-col">
                        <SearchResults />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default index
