import DeleteIcon from "Icons/DeleteIcon"
import {
  Avatar,
  Button,
  Input,
  Item,
  List,
  Row,
  Typography
} from "component/ui"
import { useState } from "react"

const people = [
  {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    profilePic: "https://example.com/profile-pic-1.jpg"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "janesmith",
    profilePic: "https://example.com/profile-pic-2.jpg"
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    username: "bobjohnson",
    profilePic: "https://example.com/profile-pic-3.jpg"
  },
  {
    id: 4,
    fullName: "Alice Brown",
    username: "alicebrown",
    profilePic: "https://example.com/profile-pic-4.jpg"
  },
  {
    id: 5,
    fullName: "Mike Wilson",
    username: "mikewilson",
    profilePic: "https://example.com/profile-pic-5.jpg"
  }
]

const AddPeople = () => {
  const [selectedPeople, setSelectedPeople] = useState([])

  const handlePersonClick = (person) => {
    if (!selectedPeople.find((p) => p.id === person.id)) {
      setSelectedPeople([...selectedPeople, person])
    }
  }

  const handleDeleteClick = (person) => {
    setSelectedPeople(selectedPeople.filter((p) => p.id !== person.id))
  }

  return (
    <Row className="h-full flex-col w-full my-2 rounded-md">
      {selectedPeople.length > 0 && (
        <List>
          {selectedPeople.map((person) => (
            <Item lines="inset" className="group" key={person.id}>
              <Avatar src={person.profilePic} className="w-8 h-8" />{" "}
              <Input
                className="ml-2 rounded-md ion-no-margin mr-1 ion-no-padding !pl-2 text-sm h-4/5  border-transparent"
                placeholder="Write a description..."
              />
              <Button fill="clear" onClick={() => handleDeleteClick(person)}>
                <DeleteIcon
                  width={20}
                  height={20}
                  className="opacity-25 duration-300 group-hover:opacity-100"
                />
              </Button>
            </Item>
          ))}
        </List>
      )}

      <br />
      <Input className="w-full rounded-md" placeholder="Search people..." />
      <List>
        {people.map((person) => (
          <Item
            button
            key={person.id}
            onClick={() => handlePersonClick(person)}
          >
            <Avatar src={person.profilePic} />{" "}
            <Typography variant="h2" className="ml-4 text-sm">
              {person.fullName}
            </Typography>
          </Item>
        ))}
      </List>
    </Row>
  )
}

export default AddPeople
