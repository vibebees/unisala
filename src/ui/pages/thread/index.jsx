import React from "react"
import { useParams, useLocation } from "react-router"
import { GetPostById } from "../../../graphql/user"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { IonSpinner, IonContent } from "@ionic/react"
import SingleThread from "../../component/thread/singleThread"

const index = () => {
  const { id } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const paramValue = queryParams.get("user")

  let payload = {
    id
  }

  if (paramValue) payload.user = paramValue

  const { data, loading } = useQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: payload
  })

  if (loading) return <IonSpinner />

  return (
    <IonContent className=" ">
      <SingleThread thread={data?.getPostById.post} />
    </IonContent>
  )
}

export default index
