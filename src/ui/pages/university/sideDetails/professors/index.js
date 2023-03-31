import {
  IonCard,
  IonCardContent,
  IonCol,
  IonAvatar,
  IonRow,
  IonText,
  IonIcon,
  IonSelectOption,
  IonSelect
} from "@ionic/react"
import "./professors.css"
import { star, starOutline } from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { GetProfessor } from "../../../../../graphql/uni"
import { useSelector } from "react-redux"
import { professorFilter } from "./filter"
import { UNIVERSITY_SERVICE } from "../../../../../servers/types"

export const Professors = () => {
  const { uniData } = useSelector((store) => store?.university)

  const { data } = useQuery(GetProfessor(uniData?.unitId), {
    context: { server: UNIVERSITY_SERVICE }
  })

  return (
    <IonCard style={{ margin: "15px 0px 0px 0px" }} className="ion-margin-top">
      <IonCardContent style={{ borderBottom: "1px solid #C4C4C4" }}>
        <h1>Professors</h1>
        {professorFilter()}
      </IonCardContent>
      {data?.getProfessors.length ? (
        <IonRow>
          {data?.getProfessors.map((data, index) => {
            const { overallRating, professorName, subject } = data
            return (
              <IonCol size={"6"} key={index}>
                <IonCard>
                  <div className="professor-profile">
                    <div>
                      <IonAvatar
                        style={{
                          width: "60px",
                          height: "60px"
                        }}
                      >
                        <img
                          src="https://www.svgrepo.com/show/206842/professor.svg"
                          alt=""
                        />
                      </IonAvatar>
                    </div>
                  </div>
                  <div className="professor-profile-details">
                    <IonText className="flex" color="dark">
                      <h3>{professorName}</h3>
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
                            icon={index <= overallRating ? star : starOutline}
                          />
                        ))}
                      </div>
                    </IonText>
                    <IonText color="medium" className="flex">
                      <p>{subject}</p>
                      <div className="flex justify-content-center">
                        <p>{overallRating}</p>
                        <img
                          width={25}
                          alt="happy"
                          src="https://cdn-icons-png.flaticon.com/512/282/282578.png"
                        />
                      </div>
                    </IonText>
                  </div>
                </IonCard>
              </IonCol>
            )
          })}
        </IonRow>
      ) : (
        <IonRow>
          <h1 className="text-center pt-1 pb-1" style={{ width: "100%" }}>
            No data
          </h1>
        </IonRow>
      )}
    </IonCard>
  )
}
export default Professors
