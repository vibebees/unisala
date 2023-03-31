import { IonCard, IonCardContent } from "@ionic/react"
import UserCard from "../../../component/userCard"
import ConnectButton from "./ConnectButton"

function index() {
  const users = [
    {
      profileBanner:
        "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      profileImg:
        "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
      name: "John Doe",
      username: "johndoe",
      loaction: "Nepal",
      oneLineBio: "this is a one liner",
      _id: "6403fa03f991e074636cca2b"
    }
  ]

  return (
    <IonCard>
      <IonCardContent>
        <h2>Recommended for you</h2>
        <div className="grid-3">
          {users.map((item, index) => {
            return (
              <UserCard
                key={index}
                profileBanner={item.profileBanner}
                profileImg={item.profileImg}
                name={item.name}
                username={item.username}
                loaction={item.loaction}
                oneLineBio={item.oneLineBio}
              >
                <ConnectButton user={item} />
              </UserCard>
            )
          })}
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default index
