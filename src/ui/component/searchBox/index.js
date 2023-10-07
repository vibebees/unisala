import React, { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { IonInput, IonIcon } from "@ionic/react"
import { searchCircle } from "ionicons/icons"
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect"
import { useLazyQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../graphql/uni"
import { userSearch } from "../../../graphql/user"

import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "../../../servers/types"
import { SearchBarResultList } from "./searchResultList"
import "./index.css"

function Index() {
  const [searchValue, setSearchValue] = useState("")
  const [dropDownOptions, setDropDownOptions] = useState(false)
  const history = useHistory()
  const [options, setOptions] = useState([])
  const [GetUni, unidata] = useLazyQuery(UniSearchDataList(), {
    context: { server: UNIVERSITY_SERVICE_GQL },
    skip: true
  })
  const [GetUser, searchUser] = useLazyQuery(userSearch(), {
    context: { server: USER_SERVICE_GQL },
    skip: true
  })
  const dropdownRef = useRef(null)

  const handleSearch = () => {
    if (searchValue) {
      GetUni({ variables: { searchValue } })
      GetUser({ variables: { searchValue } })
    }
  }

  useDebouncedEffect(handleSearch, [searchValue], 1000)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOptions(false)
    }
  }

  useState(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="search-box">
        <IonInput
          type="text"
          placeholder="Search"
          className="search-input-box"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setDropDownOptions(false)
              history.push(searchValue ? `/search?q=${searchValue}` : "#")
            }
          }}
          value={searchValue}
          onIonChange={(e) => {
            setSearchValue(e.detail.value)
            setDropDownOptions(true)
          }}
          onKeyDown={(e) => {
            if (searchValue && e.keyCode === 27) {
              setDropDownOptions(false)
            }
          }}
        />
        <Link
          to={searchValue ? `/search?q=${searchValue}` : "#"}
          className="search-box__search-icon"
        >
          <IonIcon
            icon={searchCircle}
            className="search-box__icon"
            onClick={() => setDropDownOptions(false)}
          />
        </Link>
      </div>
      {dropDownOptions && Array.isArray(options) && options.length > 0 && (
        <div className="recommend-search" ref={dropdownRef}>
          {Array.isArray(options) &&
            options.map((item, i) => (
              <SearchBarResultList
                item={item}
                key={i}
                setDropDownOptions={setDropDownOptions}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default Index
