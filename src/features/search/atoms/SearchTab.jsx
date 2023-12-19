import React, { useEffect, useMemo, useState } from "react"
import { IonCard, IonCardContent } from "@ionic/react"
import { useHistory } from "react-router"
import { URLgetter, URLupdate } from "utils/lib/URLupdate"

const SearchTab = () => {
  const [tab, setTab] = useState("all")
  const history = useHistory()
  const searchParams = new URLSearchParams(history.location.search)
  const query = searchParams.get("q") || ""

  const tabs = useMemo(() => {
    return [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Universities & Scholarships",
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
    const getTab = URLgetter("tab")
    if (getTab) {
      setTab(getTab)
    } else {
      setTab("all")
    }
  }, [history.location.search])

  return (
    <IonCard className=" sticky max-md:static -top-14 z-20 max-md:m-0">
      <IonCardContent>
        {query.length > 0 && (
          <h1 className="text-sm">Search Result For {`"${query}"`}: </h1>
        )}
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
              onClick={() => {
                const urldata = URLupdate("tab", t.value)
                history.push({ search: urldata })
              }}
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
