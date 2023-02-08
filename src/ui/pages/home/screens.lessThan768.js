// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonHeader, IonIcon } from "@ionic/react"
import SearchBox from "../../component/searchBox"
import Authentication from "../../component/authentication"

export const screenLessThan768 = ({
    setActiveProfile,
    personCircle,
    activeProfile
}) => {
    return (
        <IonHeader
            style={{
                position: "sticky",
                top: 0,
                zIndex: 999,
                backgroundColor: "white",
                padding: "8px",
                borderBottom: "1px solid #e0e0e0"
            }}
            className="ion-no-border"
        >
            <div
                style={{
                    display: "flex",
                    alignSelf: "center",
                    height: "100%",
                    width: "95%",
                    margin: "auto",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <SearchBox />
                <div
                    onClick={() => {
                        setActiveProfile(true)
                    }}
                    className="profile-pop"
                >
                    <IonIcon size="large" icon={personCircle} />
                    {/* {activeProfile && <ProfilePop />} */}
                    {activeProfile && (
                        <Authentication
                            setActiveProfile={setActiveProfile}
                            activeProfile={activeProfile}
                        />
                    )}
                </div>
            </div>
        </IonHeader>
    )
}
