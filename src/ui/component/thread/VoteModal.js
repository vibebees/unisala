// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { useLazyQuery } from "@apollo/client"
import { GetVoterList } from "../../../graphql/user"

export const VoteModal = ({ _id, isOpen, setIsOpen }) => {
    const [getVoterslist, { data }] = useLazyQuery(GetVoterList, {
        variables: {
            postId: _id,
            page: 0
        }
    })

    useEffect(() => {
        _id && isOpen && getVoterslist()
    }, [_id, isOpen])

    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={() => setIsOpen(false)}
            mode="ios"
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>votes</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>
                            Close
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding modal-content">
                {Array.isArray(data?.upVoteList?.upVoters) &&
                    data?.upVoteList?.upVoters.map((item, index) => {
                        // const { id, avatar, name, username } = chat
                        return (
                            <IonItem mode="ios" className="mb-1" key={index}>
                                <IonAvatar slot="start">
                                    <img
                                        src={
                                            item?.picture ||
                                            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                                        }
                                    />
                                </IonAvatar>
                                <IonLabel>
                                    <div className="flex">
                                        <div>
                                            <h2>
                                                {item?.firstName +
                                                    " " +
                                                    item?.lastName}
                                            </h2>
                                            <p>{item.university}</p>
                                        </div>
                                        <IonButton
                                            mode="ios"
                                            href={`http://localhost:3000/user/#${item.id}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            connect
                                        </IonButton>
                                    </div>
                                </IonLabel>
                            </IonItem>
                        )
                    })}
            </IonContent>
        </IonModal>
    )
}
export default VoteModal
