import React, { useEffect, useRef } from "react"
 import {getAllProps} from "./getAllProps"
import {UniversityTemplate} from "./templates/univesity"
import {useParams} from "react-router"
import {useDispatch, useSelector} from "react-redux"
import {useQuery} from "@apollo/client"
import {getSchoolInfo} from "../../../../graphql/uni"
import {UNIVERSITY_SERVICE_GQL} from "../../../../servers/types"

export const UniversityPage = () => {

    const
    {id} = useParams(),
    {loading, data} = useQuery(getSchoolInfo(id), {
        context: {server: UNIVERSITY_SERVICE_GQL}
    }),
    {uniData} = useSelector((store) => store?.university),
    allProps = getAllProps({id, loading, data, uniData})

    return <UniversityTemplate allProps={allProps} />
}
