import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { IonInput, IonIcon, IonItem, IonAvatar, IonLabel } from "@ionic/react"
import { searchCircle } from "ionicons/icons"
import "./index.css"
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect"
import { useLazyQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../graphql/uni"
import { userSearch } from "../../../graphql/user"
import {
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "../../../servers/types"
import { searchUniFromBar } from "../../../store/action/userActivity"
import { useDispatch, useSelector } from "react-redux"
import { awsBucket } from "../../../servers/s3.configs"
import { SearchBarResultList } from "./searchResultList"

function index() {
  const history = useHistory(),
    [searchValue, setSearchValue] = useState(""),
    [dropDownOptions, setDropDownOptions] = useState(false),
    [options, setOptions] = useState([]),
    [GetUni, unidata] = useLazyQuery(UniSearchDataList(searchValue), {
      context: { server: UNIVERSITY_SERVICE_GQL }
    }),
    [GetUser, searchUser] = useLazyQuery(userSearch(searchValue), {
      context: { server: USER_SERVICE_GQL }
    }),
    dispatch = useDispatch()

  useEffect(() => {
   if (searchValue) {
    setDropDownOptions(true)
   } else {
    setDropDownOptions(false)
   }
  }, [searchValue])

  const HandleSearch = () => {
    // await GetUni()
    // await GetUser()
    dispatch(searchUniFromBar(searchValue, 5, setOptions))
  }
  // const debouncer = useCallback(debounce(GetUni, 1000), [])

  // useEffect(() => {
  //   if (unidata?.data?.searchSchool && searchUser?.data?.searchUser?.user) {
  //     setOptions([
  //       ...unidata?.data?.searchSchool,
  //       ...searchUser?.data?.searchUser?.user
  //     ])
  //   } else if (Array.isArray(unidata?.data?.searchSchool)) {
  //     setOptions([...unidata?.data?.searchSchool])
  //   } else if (Array.isArray(searchUser?.data?.searchUser?.user)) {
  //     setOptions([...searchUser?.data?.searchUser?.user])
  //   }
  // }, [unidata.data, searchUser.data])

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
            if (searchValue && e.keyCode === 13) {
              setDropDownOptions(false)
              return history.push(`/search/uni/${searchValue}`)
            }
          }}
        />
        <Link
          to={searchValue ? `/search/uni/${searchValue}` : "#"}
          className="search-box__search-icon"
        >
          <IonIcon
            icon={searchCircle}
            className="search-box__icon"
            onClick={() => setDropDownOptions(false)}
          />
        </Link>
      </div>
      {dropDownOptions && (
        <div className="recommend-search">
          <div>
            <Link to={`/search/users/${searchValue}`}>
              <p
                className="recommend-search__user"
                onClick={() => setDropDownOptions(false)}
              >
                Search for users contaning &quot;{searchValue}
                &quot;
              </p>
            </Link>
          </div>
          {Array?.isArray(options) &&
            options.map((item, i) => <SearchBarResultList item ={item} key = {i} setDropDownOptions = {setDropDownOptions}/>)}
        </div>
      )}
    </>
  )
}

export default index
