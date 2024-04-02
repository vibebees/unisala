import { List } from "component/ui"
import Contribution from "../atoms/Contribution"

const ContributionArray = [
  {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    profilePic: "https://example.com/profile-pic-1.jpg",
    description: "John contributed to the event"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "janesmith",
    profilePic: "https://example.com/profile-pic-2.jpg",
    description: "Jane also contributed to the event"
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    username: "bobjohnson",
    profilePic: "https://example.com/profile-pic-3.jpg",
    description: "Bob contributed to the event"
  },
  {
    id: 4,
    fullName: "Alice Brown",
    username: "alicebrown",
    profilePic: "https://example.com/profile-pic-4.jpg",
    description: "Alice did the decoration"
  },
  {
    id: 5,
    fullName: "Mike Wilson",
    username: "mikewilson",
    profilePic: "https://example.com/profile-pic-5.jpg",
    Mike: "Mick did the hosting"
  }
]

const ContributionsList = () => {
  return (
    <List>
      {ContributionArray.map((item) => (
        <Contribution key={item.id} {...item} />
      ))}
    </List>
  )
}

export default ContributionsList
