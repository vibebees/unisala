import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { IonInput, IonIcon } from "@ionic/react"
import { searchCircle } from "ionicons/icons"
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect"
import { useLazyQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../graphql/uni"
import { userSearch } from "../../../graphql/user"
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "../../../servers/types"
// import { searchUniFromBar } from "../../../store/action/userActivity"
// import { useDispatch } from "react-redux"
import { SearchBarResultList } from "./searchResultList"
import "./index.css"

function index() {
  const [searchValue, setSearchValue] = useState(""),
    [dropDownOptions, setDropDownOptions] = useState(false),
    [options, setOptions] = useState([]),
    [GetUni, unidata] = useLazyQuery(UniSearchDataList(searchValue), {
      context: { server: UNIVERSITY_SERVICE_GQL }
    }),
    [GetUser, searchUser] = useLazyQuery(userSearch(searchValue), {
      context: { server: USER_SERVICE_GQL }
    }),
    // dispatch = useDispatch(),
    dropdownRef = useRef(null)

  useEffect(() => {
    if (searchValue) {
      setDropDownOptions(true)
    } else {
      setDropDownOptions(false)
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOptions(false)
      }
    }
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchValue])

  const HandleSearch = () => {
    GetUni()
    GetUser()
    // dispatch(searchUniFromBar(searchValue, 5, setOptions))
  }
  // const debouncer = useCallback(debounce(GetUni, 1000), [])

  useEffect(() => {
    if (unidata?.data?.searchSchool && searchUser?.data?.searchUser?.user) {
      setOptions([
        ...unidata?.data?.searchSchool,
        ...searchUser?.data?.searchUser?.user
      ])
    } else if (Array.isArray(unidata?.data?.searchSchool)) {
      setOptions([...unidata?.data?.searchSchool])
    } else if (Array.isArray(searchUser?.data?.searchUser?.user)) {
      setOptions([...searchUser?.data?.searchUser?.user])
    }
  }, [unidata.data, searchUser.data])

  useDebouncedEffect(HandleSearch, [searchValue], 1000)

  return (
    <>
      <div className="search-box">
        <IonInput
          type="text"
          placeholder="Search"
          className="search-input-box"
          value={searchValue}
          onIonChange={(e) => {
            setSearchValue(e.detail.value)
            setDropDownOptions(true)
          }}
          onkeydown={(e) => {
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
      {dropDownOptions && Array?.isArray(options) && options.length > 0 && (
        <div className="recommend-search" ref={dropdownRef}>
          {Array?.isArray(options) &&
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

export default index
