import React from "react"
import UserCard from "../../../component/userCard"
import {IonCol, IonGrid, IonRow} from "@ionic/react"
const members = [
    {
        "_id": "65941aa7cb2a068a66323bf1",
        "firstName": "dipu",
        "lastName": "testing",
        "username": "dipu",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "64b3ce6a20785e9049ec9483",
        "firstName": "test",
        "lastName": "test",
        "username": "testtest100",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "650da2757753c42d984d2754",
        "firstName": "ankit",
        "lastName": "test",
        "username": "xafari2579",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "64b92d0d20785e9049ec9beb",
        "firstName": "test",
        "lastName": "test",
        "username": "test",
        "picture": "test",
        "coverPicture": "test",
        "location": "test",
        "__typename": "SearchUser"
    },
    {
        "_id": "659249a7cb2a068a6632015e",
        "firstName": "testing",
        "lastName": "testing",
        "username": "testing1",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "657bcb9b2541004ec2fc1ba7",
        "firstName": "test",
        "lastName": "baroyak283",
        "username": "baroyak283",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "65045fbb4ea5bcce01ea490b",
        "firstName": "test2",
        "lastName": "test",
        "username": "no.reply",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "656694b9b528871c40a29a37",
        "firstName": "test",
        "lastName": "ătacoda1101",
        "username": "ătacoda1101",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "65179a8262c47ce86b8bfd18",
        "firstName": "test",
        "lastName": "test",
        "username": "test1",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    },
    {
        "_id": "65179b0362c47ce86b8bfd27",
        "firstName": "test",
        "lastName": "test",
        "username": "test2",
        "picture": null,
        "coverPicture": null,
        "location": null,
        "__typename": "SearchUser"
    }
  ]
export const Members = () => (
    <IonGrid>
        <IonRow>


            {members?.map((user, index) => (
                <IonCol
                    key={index}
                    size="12"
                    sizeSm="6"
                    sizeMd="4"
                    sizeLg="4"
                    sizeXl="4"
                >
                    <UserCard
                        key={index}
                        profileBanner={user?.coverPicture}
                        profileImg={user?.picture}
                        name={user?.firstName + " " + user?.lastName}
                        username={user?.username}
                        loaction={user?.location}
                        oneLineBio={"president"}
                    />
                </IonCol>
            ))}


        </IonRow>
    </IonGrid>)
