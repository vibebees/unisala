import React from "react"
import { IonCol, IonCard, IonText, IonAvatar, IonIcon } from "@ionic/react"
import { Avatar } from "../../../../component/Avatar"
import { star, starOutline } from "ionicons/icons"

const ProfessorCard = ({ data }) => {
  const emoji = {
    0: "https://cdn-icons-png.flaticon.com/128/166/166527.png",
    1: "https://cdn-icons-png.flaticon.com/128/166/166527.png",
    2: "https://cdn-icons-png.flaticon.com/128/11269/11269926.png",
    3: "https://cdn-icons-png.flaticon.com/128/166/166549.png",
    4: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    5: "https://cdn-icons-png.flaticon.com/128/5624/5624232.png"
  }
  return (
    <>
      <IonCol size={"6"}>
        <IonCard>
          <div className="professor-profile">
            <div>
              <IonAvatar
                style={{
                  width: "60px",
                  height: "60px"
                }}
              >
                <IonAvatar>
                  <Avatar username={data.professorName} />
                </IonAvatar>
              </IonAvatar>
            </div>
          </div>
          <div className="professor-profile-details">
            <IonText
              className="flex"
              color="dark"
              style={{ whiteSpace: "nowrap" }}
            >
              <h3>{data.professorName}</h3>
              <div>
                {[1, 2, 3, 4, 5].map((index) => (
                  <IonIcon
                    key={index}
                    style={{
                      color: "#F8B64C",
                      margin: "0 3px",
                      padding: "0",
                      fontWeight: "bold",
                      fontSize: "25px"
                    }}
                    icon={index <= data.overallRating ? star : starOutline}
                  />
                ))}
              </div>
            </IonText>
            <IonText color="medium" className="flex">
              <p>{data.subject}</p>
              <div className="flex justify-content-center">
                <p>{data.overallRating}</p>
                <img
                  width={25}
                  alt="happy"
                  src={emoji[Math.trunc(data.overallRating)]}
                />
              </div>
            </IonText>
          </div>
        </IonCard>
      </IonCol>
    </>
  )
}

export default ProfessorCard
