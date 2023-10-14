import React, { useEffect, useRef } from "react"
import { getAllProps } from "./getAllProps"
import { UniversityTemplate } from "./templates/university"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "../../../../graphql/uni"
import { UNIVERSITY_SERVICE_GQL } from "../../../../servers/types"

export const UniversityPage = () => {
  const { id } = useParams(),
    { loading, data } = useQuery(getUpdatedSchoolInfo(id), {
      context: { server: UNIVERSITY_SERVICE_GQL }
    }),
    { uniData, isSideBar } = useSelector((store) => store?.university),
    allProps = getAllProps({ id, loading, data, uniData, isSideBar })

  console.log(id)
  return <UniversityTemplate allProps={allProps} />
}
