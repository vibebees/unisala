import { useEffect, useMemo, useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonCardTitle
} from "@ionic/react"
import { useLocation, Link, useHistory } from "react-router-dom"
import { UniSearchDataList } from "../../../graphql/uni"
import { userSearch } from "../../../graphql/user"
import useDocTitle from "../../../hooks/useDocTitile"
import { useQuery } from "@apollo/client"
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "../../../servers/types"
import UserCard from "../../component/userCard"
import CourseCard from "../../component/courseCard"
import UserSearchResult from "./user"
import UniSearchResult from "./uni"

function index() {
  const [tab, setTab] = useState("all")
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""
  useDocTitle("Search ᛫ " + query)
  const history = useHistory()
  const { data: unidata } = useQuery(UniSearchDataList(query), {
    context: { server: UNIVERSITY_SERVICE_GQL }
  })
  const { data: searchUser } = useQuery(userSearch(query), {
    context: { server: USER_SERVICE_GQL }
  })

  const tabs = useMemo(() => {
    return [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Universities",
        value: "uni"
      },
      {
        name: "Users",
        value: "user"
      },
      {
        name: "Posts",
        value: "post"
      }
    ]
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("tab")
    // check if gotten params is actually valid or not
    console.log(params)
    if (
      params === "all" ||
      params === "uni" ||
      params === "user" ||
      params === "post"
    ) {
      setTab(params)
    } else {
      console.log("heree")
      setTab("all")
    }
  }, [])

  useEffect(() => {
    history.push(`?q=${query}&tab=${tab}`)
  }, [tab])

  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonCard>
          <IonCardContent>
            {query.length > 0 && <h1>Search Result For {`"${query}"`}: </h1>}
            <div
              style={{
                display: "inline-flex",
                gap: "1rem",
                marginTop: "1.5rem",
                overflow: "auto"
              }}
            >
              {tabs.map((t, index) => (
                <p
                  key={index}
                  onClick={() => setTab(t.value)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: t.value === tab ? "#3171e0" : "",
                    borderBottom: t.value === tab ? "2px solid #3171e0" : ""
                  }}
                >
                  {t.name}
                </p>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="result-col">
            {tab === "all" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  marginTop: "1.5rem"
                }}
              >
                <div>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#4d4d4d"
                    }}
                  >
                    Users
                  </h3>

                  {searchUser?.searchUser?.user.length ? (
                    <div className="grid-3">
                      {searchUser?.searchUser?.user.map((user, index) => (
                        <UserCard
                          key={index}
                          profileBanner={user?.coverPicture}
                          profileImg={user?.picture}
                          name={user?.firstName + " " + user?.lastName}
                          username={user?.username}
                          loaction={user?.location}
                          oneLineBio={user?.oneLineBio}
                        />
                      ))}
                    </div>
                  ) : (
                    <IonCardTitle
                      style={{
                        textAlign: "center",
                        color: "#898989"
                      }}
                    >
                      Sorry! No result found &#9785;
                    </IonCardTitle>
                  )}
                </div>

                <div>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#4d4d4d"
                    }}
                  >
                    Universities
                  </h3>
                  <div>
                    {Array.isArray(unidata?.searchSchool) &&
                    unidata?.searchSchool.length ? (
                      unidata?.searchSchool.map((data, index) => {
                        return (
                          <Link to={`/university/${data?.name}`} key={index}>
                            <CourseCard allProps={data} />
                          </Link>
                        )
                      })
                    ) : (
                      <IonCardTitle
                        style={{
                          textAlign: "center",
                          color: "#898989"
                        }}
                      >
                        Sorry! No result found &#9785;
                      </IonCardTitle>
                    )}
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#4d4d4d"
                    }}
                  >
                    Posts
                  </h3>
                </div>
              </div>
            )}
            {tab === "user" && <UserSearchResult query={query} />}
            {tab === "uni" && <UniSearchResult query={query} />}
            {tab === "post" && <h1>Posts</h1>}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default index

