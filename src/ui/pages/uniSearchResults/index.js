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
import useWindowWidth from "../../../hooks/useWindowWidth"
import Filter from "./Filter"
import SearchResults from "./SearchResults"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchGetSuccess } from "../../../store/action/index"
import { useQuery } from "@apollo/client"
import { UniSearch } from "../../../graphql/uni"
import useDocTitle from "../../../hooks/useDocTitile"
import { UNIVERSITY_SERVICE } from "../../../servers/types"

function index() {
    const { name } = useParams()
    const windowWidth = useWindowWidth()
    useDocTitle("Search ᛫ " + name)

    const dispatch = useDispatch()
    const { data } = useQuery(UniSearch(name), {
        context: { service: UNIVERSITY_SERVICE }
    })
    useEffect(() => {
        dispatch(searchGetSuccess(data?.searchSchool))
    }, [data])

    return (
        <IonContent>
            <IonGrid className="max-width-container">
                <IonCard>
                    <IonCardContent>
                        <h1>Search Result for {`"${name}"`}: </h1>
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
