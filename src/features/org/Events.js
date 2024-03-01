import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { GetAllEventsBySpaceID } from "graphql/user"
import { USER_SERVICE_GQL } from "servers/types"
import { OrgContext } from "."
import { EventCard } from "component/events"

const Events = () => {
  const { orgId, role } = useContext(OrgContext)
  const { data } = useQuery(GetAllEventsBySpaceID, {
    context: { server: USER_SERVICE_GQL },
    variables: { spaceId: orgId }
  })

  return (
    <>
      {data?.getAllEventBySpaceId?.data?.length > 0 &&
        data?.getAllEventBySpaceId?.data?.map((event, index) => {
          return <EventCard role={role} key={index} data={event} />
        })}
    </>
  )
}

export default Events
