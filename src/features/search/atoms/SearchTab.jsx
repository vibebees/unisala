import React, { useMemo, useState } from "react"
import { IonCard, IonCardContent } from "@ionic/react"

const SearchTab = () => {
  const [tab, setTab] = useState("all")
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""

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

  return (
    <IonCard className=" sticky -top-14 z-20">
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
  )
}

export default SearchTab
