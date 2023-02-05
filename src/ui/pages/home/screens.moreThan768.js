// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCol, IonCard, IonText, IonAvatar, IonItem, IonLabel } from "@ionic/react"
import BadgesTab from "./BadgeTab"
export const screensMoreThan768 = ({ activeTab, setActiveTab, unisalaImg, profileData, decode }) => {
    return (
        <IonCol
            size="auto"
            style={{
                height: "100%",
                position: "sticky",
                top: "15px",
                overflow: "auto"
            }} >
            {decode
                ? <>
                    <IonCard>
                        <div className="aside-profile">
                            <div>
                                <IonAvatar
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}>
                                    <img
                                        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                                        alt=""
                                    />
                                </IonAvatar>
                            </div>
                        </div>
                        <div className="aside-profile-details">
                            <IonText
                                className="flex justify-content-center"
                                color="dark">
                                <h6>
                                    {profileData?.data?.getUser
                                        ?.user?.firstName +
                                        " " +
                                        profileData?.data?.getUser
                                            ?.user?.lastName}
                                </h6>
                                <img
                                    src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                    alt=""
                                    width={20}
                                />
                            </IonText>
                            <IonText color="medium">
                                <p>
                                    @
                                    {
                                        profileData?.data?.getUser
                                            ?.user?.username
                                    }
                                </p>
                            </IonText>
                        </div>
                    </IonCard>
                    <IonCard className="badges-card">
                        <IonText color="dark">
                            <h6
                                style={{
                                    padding: "10px"
                                }}>
                                Badges
                            </h6>
                        </IonText>
                        <BadgesTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {profileData?.user?.badges?.earnedBadges?.map(
                            (item, index) => {
                                return (
                                    <IonItem
                                        style={{
                                            margin: "0px",
                                            padding: "0px"
                                        }}
                                        lines="none"
                                        key={index}>
                                        <IonAvatar slot="start">
                                            <img
                                                src={
                                                    "https://www.svgrepo.com/show/178831/badges-money.svg"
                                                } />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2
                                                style={{
                                                    margin: 0
                                                }}>
                                                {item?.title}
                                            </h2>
                                            <p
                                                style={{
                                                    margin: 0
                                                }}>
                                                {item?.description}
                                            </p>
                                        </IonLabel>
                                    </IonItem>
                                )
                            }
                        )}
                    </IonCard>
                </>
                : <IonCard
                    style={{
                        maxWidth: "250px"
                    }}>
                    <img src={unisalaImg} alt="unisala" />
                    <h5 className="black-text"
                        style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                            lineHeight: "26px",
                            padding: "5px"
                        }}>
                        If studying abroad is your dream, making it simple is ours! ✅
                    </h5>
                </IonCard>
            }
        </IonCol>
    )
}
