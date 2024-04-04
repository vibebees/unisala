import React, { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { IonInput, IonSkeletonText } from "@ionic/react"
import { useLazyQuery } from "@apollo/client"

import { SearchBarResultList } from "./searchResultList"
import "./index.css"
import { USER_SERVICE_GQL } from "servers/types"
import { Search } from "graphql/user"
import { useDebouncedEffect } from "hooks/useDebouncedEffect"
import SearchIcon from "Icons/SearchIcon"
import { Button, Typography } from "component/ui"
import { URLgetter } from "utils/lib/URLupdate"

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(URLgetter("q") ?? "")
  const [show, setShow] = useState(false)
  const [dropDownOptions, setDropDownOptions] = useState(null)
  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem("recentSearch"))
  )

  const [searchData, { data, loading }] = useLazyQuery(Search, {
    context: {
      server: USER_SERVICE_GQL
    },
    skip: true
  })

  const dropdownRef = useRef(null)
  const handleSearch = async () => {
    if (searchValue.length > 0) {
      setDropDownOptions([])
      await searchData({
        variables: {
          q: searchValue
        }
      })
      setDropDownOptions(() => data?.search.items)
    }
  }

  useDebouncedEffect(handleSearch, [searchValue, data], 500)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false)
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
          placeholder="Search universities, people..."
          className="search-input-box !pr-10 "
          // onKeyUp={(e) => {
          // if (e.key === "Enter") {
          //  handleSearch(searchValue)
          // }
          //}}
          value={searchValue}
          onIonChange={(e) => {
            setShow(true)
            setSearchValue(e.detail.value)
          }}
          onKeyDown={(e) => {
            if (searchValue && e.keyCode === 27) {
              setShow(false)
            }
          }}
          onIonFocus={() => {
            if (recentSearch?.length > 0) setShow(true)
          }}
        />
        <Link
          to={searchValue ? `/search?q=${searchValue}` : "#"}
          className="search-box__search-icon flex justify-center items-center "
        >
          <SearchIcon onClick={() => setShow(false)} />
        </Link>
      </div>

      {show && (
        <div className="recommend-search z-100" ref={dropdownRef}>
          {loading && (
            <div className="space-y-4">
              <IonSkeletonText />
              <IonSkeletonText />
              <IonSkeletonText />
            </div>
          )}
          {data?.search?.totalItems === 0 && (
            <h1 className="text-sm opacity-80">
              No result found for {searchValue}
            </h1>
          )}
          {/* if there is no search perfomed yet but there is recent searches */}
          {/* available then only show recent searches */}

          {!dropDownOptions && recentSearch?.length > 0 && (
            <>
              <div className="flex items-center">
                <h1 className="font-semibold text-lg ">Recent Searches</h1>

                <Button
                  fill="clear"
                  className="font-medium"
                  onClick={() => {
                    setRecentSearch(null)
                    setShow(false)
                    localStorage.removeItem("recentSearch")
                  }}
                >
                  Clear
                </Button>
              </div>
              {recentSearch.map((item, index) => (
                <SearchBarResultList
                  item={item}
                  key={index}
                  setShow={setShow}
                />
              ))}
            </>
          )}

          {dropDownOptions?.map((item, index) => (
            <SearchBarResultList item={item} key={index} setShow={setShow} />
          ))}
        </div>
      )}
    </>
  )
}

