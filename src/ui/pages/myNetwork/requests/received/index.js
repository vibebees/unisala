import { useQuery } from "@apollo/client"
import { ReceivedConnectionList } from "../../../../../graphql/user/"
import UserCard from "../../../../component/userCard"
import RequestReceivedButton from "./RequestReceivedButton"
import StateMessage from "../../../../component/stateMessage"
import emptyState from "../../../../../assets/emptyState.png"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

function index() {
  const { data: receivedConnectionList } = useQuery(ReceivedConnectionList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL }
  })

  return receivedConnectionList?.receivedConnectionList?.connectionList
    .length ? (
    <div className="grid-3">
      {receivedConnectionList?.receivedConnectionList?.connectionList.map(
        (item, index) => {
          return (
            <UserCard
              key={index}
              profileBanner="https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              profileImg="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
              name={item.user.firstName + " " + item.user.lastName}
              username={item.user.username}
              loaction={item.user.location}
              oneLineBio={item.user.oneLinerBio}
            >
              <RequestReceivedButton user={item} />
            </UserCard>
          )
        }
      )}
    </div>
  ) : (
    <StateMessage
      title="No Received Requests"
      subtitle="All the requests received will be visible here"
    >
      <img src={emptyState} alt="empty state" className="state-img" />
    </StateMessage>
  )
}

export default index
