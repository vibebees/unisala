import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { IonInput, IonIcon, IonItem, IonAvatar, IonLabel } from "@ionic/react"
import { searchCircle } from "ionicons/icons"
import "./index.css"
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect"
import { useLazyQuery } from "@apollo/client"
import { UniSearchDataList } from "../../../graphql/uni"
import { getUser } from "../../../graphql/user"
import { UNIVERSITY_SERVICE } from "../../../servers/types"

function index() {
    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [dropDownOptions, setDropDownOptions] = useState(false)
    const [options, setOptions] = useState([])
    const [GetUni, unidata] = useLazyQuery(UniSearchDataList(searchValue), {
        context: { clientName: UNIVERSITY_SERVICE }
    })
    console.log("firing request")
    const [GetUser, searchUser] = useLazyQuery(getUser, {
        variables: { searchString: searchValue }
    })

    useEffect(() => {
        if (searchValue.length > 2) {
            setDropDownOptions(true)
        } else {
            setDropDownOptions(false)
        }
    }, [searchValue])
    const HandleSearch = async () => {
        // setSearchValue("")
        await GetUni()
        await GetUser()
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
                        options.map((item, i) => {
                            return (
                                <Link
                                    to={
                                        `/university/${item?.elevatorInfo?.name}` ||
                                        `/@/${item?.username}`
                                    }
                                    key={i}
                                    onClick={() => setDropDownOptions(false)}
                                >
                                    <IonItem
                                        style={{
                                            margin: "0px",
                                            padding: "0px"
                                        }}
                                        lines="none"
                                        key={index}
                                    >
                                        <IonAvatar slot="start">
                                            <img
                                                src={
                                                    item?.elevatorInfo?.logo ||
                                                    item?.picture ||
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcCCJKE3QoYsKTUblewvIWujVUQWpsd7BhA&usqp=CAU"
                                                }
                                            />
                                        </IonAvatar>
                                        <IonLabel>
                                            <h2
                                                style={{
                                                    margin: 0
                                                }}
                                            >
                                                {item?.elevatorInfo?.name ||
                                                    `${item?.firstName} ${item?.lastName}`}
                                            </h2>
                                            <p
                                                style={{
                                                    margin: 0
                                                }}
                                            >
                                                {item?.elevatorInfo?.city ||
                                                    item?.location}
                                            </p>
                                        </IonLabel>
                                    </IonItem>
                                </Link>
                            )
                        })}
                </div>
            )}
        </>
    )
}

export default index
