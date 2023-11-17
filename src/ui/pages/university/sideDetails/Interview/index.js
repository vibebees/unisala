import { useEffect, useState } from "react"
import { IonAvatar, IonCard, IonButton } from "@ionic/react"
import { Avatar } from "../../../../component/Avatar"
import { useQuery } from "@apollo/client"
import { GetInterviewExperience } from "../../../../../graphql/user"
import { USER_SERVICE_GQL } from "../../../../../servers/types"
import {CardHeader} from "component/Reusable/cardHeader"

export const InterviewExperienceCard = ({data}) => {
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
            University: <b>{data?.university}</b>
          </p>
        )}
        {data?.major && (
          <p>
            Major: <b>{data?.major}</b>
          </p>
        )}
        {data?.attempt && (
          <p>
            Attemp: <b>{data?.attempt}</b>
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
        {data?.conversation?.split(/me\s*:|vo\s*:|me\s+:|vo\s+-/i)
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
export default function index({ unitId }) {
  const [page, setPage] = useState(1)
  const { data, loading, fetchMore } = useQuery(GetInterviewExperience, {
    variables: { unitId, page: 1, pageSize: 1 },
    context: { server: USER_SERVICE_GQL }
  }),
  [interviewExperiences, setInterviewExperiences] = useState([])



  useEffect(() => {
    setInterviewExperiences(data?.getInterviewExperience?.interviewExperience)
  },
   [data])
  const fetchMoreHandler = () => {
    setPage(page + 1)
    fetchMore({
      variables: {
        unitId: unitId,
        page: page + 1,
        pageSize: 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          getInterviewExperience: {
            ...prev.getInterviewExperience,
            interviewExperience: [
              ...prev.getInterviewExperience.interviewExperience,
              ...fetchMoreResult.getInterviewExperience.interviewExperience
            ]
          }
        })
      }
    })
  }

  return (
    <IonCard
      style={{ margin: "15px 0px 0px 0px" }}
      className="ion-margin-top"
    >
      <CardHeader header={"Interview Experience"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        {!interviewExperiences?.length > 0 && (
          <h1
            style={{
              textAlign: "center",
              margin: "20px"
            }}
          >
            No data available
          </h1>
        )}
        {interviewExperiences?.length > 0 &&
          interviewExperiences.map(
            (data, index) => {
              return (
                <InterviewExperienceCard key={index} data={data} />
              )
            }
          )}

        <div className="flex justify-center pb-4">
          <IonButton size="small" onClick={fetchMoreHandler}>
            {loading ? "Loading" : "See More"}
          </IonButton>
        </div>
      </div>
    </IonCard>
  )
}
