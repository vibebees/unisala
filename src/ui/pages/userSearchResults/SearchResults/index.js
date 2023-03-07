import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { userSearch } from "../../../../graphql/user"
import UserCard from "../../../component/userCard"
import noResultsFound from "../../../../assets/no-results.jpg"
import { USER_SERVICE_GQL } from "../../../../servers/types"

function index({ query }) {
  console.log({ query }, "firing user search query")
  const { data } = useQuery(userSearch(query), {
    context: { server: USER_SERVICE_GQL }
})
  if (!data?.searchUser?.user.length) {
    return (
      <IonCard style={{ textAlign: "center" }}>
        <img alt="unisala: no results found" src={noResultsFound} />
        <IonCardHeader>
          <IonCardTitle>Sorry! No result found &#9785;</IonCardTitle>
          <IonCardSubtitle>
            There were not any saved views, recent queries, or source matching
            your search.
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    )
  }

  return (
    <div className="grid-3">
      {data?.searchUser?.user.map((user, index) => (
        <Link to={`/@/${user?.username}`} key={index}>
          <UserCard
            profileBanner="https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            profileImg="https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80"
            name={user?.firstName + " " + user?.lastName}
            username={user?.username}
            loaction={user?.location}
            oneLineBio={user?.oneLineBio}
          />
        </Link>
      ))}
    </div>
  )
}

export default index
