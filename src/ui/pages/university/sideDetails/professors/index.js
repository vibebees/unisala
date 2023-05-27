import { useEffect, useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonAvatar,
  IonRow,
  IonText,
  IonIcon
} from "@ionic/react"
import { star, starOutline, chevronForward, chevronBack } from "ionicons/icons"
import { Query } from "@apollo/client/react/components"
import { GetProfessor } from "../../../../../graphql/uni"
import { useSelector } from "react-redux"
import { ProfessorFilter } from "./filter"
import { Avatar } from "../../../../component/Avatar"
import { UNIVERSITY_SERVICE_GQL } from "../../../../../servers/types"
import "./professors.css"

export const Professors = () => {
  const { uniData } = useSelector((store) => store?.university)
  const [filterMajors, setFilterMajors] = useState("")
  const [filterRating, setFilterRating] = useState(0)
  const [profData, setProfData] = useState([])
  const [page, setPage] = useState(0)
  const unitId = uniData?.unitId

  return (
    <Query
      query={GetProfessor}
      variables={{
        unitId,
        page: 0,
        overallRating: filterRating,
        major: filterMajors
      }}
      context={{ server: UNIVERSITY_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore }) => {
        useEffect(() => {
          setProfData(data?.getProfessors)
        }, [data])

        return (
          <IonCard
            style={{ margin: "15px 0px 0px 0px" }}
            className="ion-margin-top"
          >
            <IonCardContent style={{ borderBottom: "1px solid #C4C4C4" }}>
              <h1>Professors</h1>
            </IonCardContent>
            <ProfessorFilter
              setFilterMajors={setFilterMajors}
              setFilterRating={setFilterRating}
              filterRating={filterRating}
              setPage={setPage}
            />
            {loading && (
              <IonRow>
                <h1 className="text-center pt-1 pb-1" style={{ width: "100%" }}>
                  Loading...
                </h1>
              </IonRow>
            )}
            {profData?.length > 0 && !loading && (
              <IonRow>
                {profData.map((data, index) => {
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
                              <IonAvatar>
                                <Avatar username={professorName} />
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
                                  icon={
                                    index <= overallRating ? star : starOutline
                                  }
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
                <div
                  style={{
                    borderTop: "1px solid #C4C4C4",
                    width: "100%",
                    display: "inline-flex",
                    cursor: "pointer",
                    padding: "8px 0"
                  }}
                >
                  <IonIcon
                    style={{
                      fontSize: "25px"
                    }}
                    icon={chevronBack}
                    onClick={() => {
                      if (page < 1) return
                      fetchMore({
                        variables: { unitId, page: page - 1 },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return
                          setPage(page - 1)
                          setProfData(fetchMoreResult.getProfessors)
                        }
                      })
                    }}
                  />
                  <IonIcon
                    style={{
                      fontSize: "25px"
                    }}
                    icon={chevronForward}
                    onClick={() => {
                      fetchMore({
                        variables: { unitId, page: page + 1 },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult.getProfessors.length) return
                          setPage(page + 1)
                          setProfData(fetchMoreResult.getProfessors)
                        }
                      })
                    }}
                  />
                </div>
              </IonRow>
            )}
            {!profData?.length && !loading && (
              <IonRow>
                <h1 className="text-center pt-1 pb-1" style={{ width: "100%" }}>
                  No data
                </h1>
              </IonRow>
            )}
          </IonCard>
        )
      }}
    </Query>
  )
}
export default Professors
