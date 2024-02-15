import { useQuery } from "@apollo/client"
import { createContext } from "react"
import { Spaces } from "./template"
import { USER_SERVICE_GQL } from "servers/types"
import { getAllProps } from "./getAllProps"
import { useSelector } from "react-redux"
import SpaceIndex from "./SpaceIndex/SpaceIndex"
import {
  getUserProfile,
  GetSpaceCategory,
  GetTopOrgs,
  GetOrgSpace
} from "graphql/user"
import { useParams } from "react-router"

export const OrgContext = createContext()

export default function SpacePage({ allPropssetPopup }) {
  const params = useParams(),
    { data: topOrgData } = useQuery(GetTopOrgs, {
      variables: { limit: 6 },
      context: { server: USER_SERVICE_GQL }
    }),
    { user, loggedIn } = useSelector((store) => store?.userProfile),
    profileData =
      loggedIn &&
      useQuery(getUserProfile, {
        context: { server: USER_SERVICE_GQL },
        variables: {
          username: user?.username
        }
      }),
    { data, loading } = useQuery(GetOrgSpace, {
      context: { server: USER_SERVICE_GQL },
      variables: { name: params.category }
    })

  const allProps = getAllProps({
    user,
    loggedIn,
    profileData,
    data,
    topOrgData,
    loading
  })

  return (
    <OrgContext.Provider value={allProps}>
      <Spaces allProps={allProps} />
    </OrgContext.Provider>
  )
}
