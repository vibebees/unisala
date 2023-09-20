import React from "react"
import { useParams } from "react-router"
import { GetPostById } from "../../../graphql/user"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "../../../servers/types"
import { IonSpinner, IonContent } from "@ionic/react"
import SingleThread from "../../component/thread/singleThread"

const index = () => {
  const { id } = useParams()

  const { data, loading } = useQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      id
    }
  })

  if (loading) return <IonSpinner />
  console.log(data, "data")

  return (
    <IonContent className=" ">
      <SingleThread thread={data?.getPostById.post} />
    </IonContent>
  )
}

export default index
