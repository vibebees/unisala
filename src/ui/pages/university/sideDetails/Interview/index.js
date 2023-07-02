import { IonAvatar, IonCard, IonCardContent } from "@ionic/react"
import { Avatar } from "../../../../component/Avatar"
import { useQuery } from "@apollo/client"
import { GetInterviewExperience } from "../../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../../servers/types"

export default function index({ unitId }) {
  const { data } = useQuery(GetInterviewExperience, {
    variables: { unitId },
    context: { server: USER_SERVICE_GQL }
  })

  return (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <IonCardContent
        style={{
          borderBottom: "1px solid #C4C4C4"
        }}
      >
        <h1>Interview Experience</h1>
      </IonCardContent>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        {!data?.getInterviewExperience?.interviewExperience?.length > 0 && (
          <h1
            style={{
              textAlign: "center",
              margin: "20px"
            }}
          >
            No data available
          </h1>
        )}
        {data?.getInterviewExperience?.interviewExperience?.length > 0 &&
          data?.getInterviewExperience?.interviewExperience.map(
            (data, index) => {
              return (
                <div key={index} className="interview">
                  <IonCard
                    style={{
                      padding: "10px 20px 10px 20px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        borderBottom: "1px solid #C4C4C4",
                        fontSize: "20px",
                        marginBottom: "15px"
                      }}
                    >
                      {data.university && (
                        <p>
                          University: <b>{data.university}</b>
                        </p>
                      )}
                      {data.major && (
                        <p>
                          Major: <b>{data.major}</b>
                        </p>
                      )}
                      {data.attempt && (
                        <p>
                          Attemp: <b>{data.attempt}</b>
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        maxWidth: "600px"
                      }}
                    >
                      {data.conversation
                        .split(/me\s*:|vo\s*:|me\s+:|vo\s+-/i)
                        .map((item, key) => {
                          if (!item || item.trim() === "") return null
                          return (
                            <div
                              key={key}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "10px"
                              }}
                            >
                              <IonAvatar
                                style={{
                                  width: "30px",
                                  height: "30px"
                                }}
                              >
                                <Avatar
                                  username={key % 2 === 0 ? "VO" : "ME"}
                                />
                              </IonAvatar>
                              <p
                                style={{
                                  width: "fit-content"
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  </IonCard>
                </div>
              )
            }
          )}
      </div>
    </IonCard>
  )
}
