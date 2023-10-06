import {useQuery} from "@apollo/client"
import { Spaces } from "./template"
import {USER_SERVICE_GQL} from "../../../servers/types"
import { getAllProps } from "./getAllProps"
import {useSelector} from "react-redux"

import { GetProfileCard,
  GetSpaceCategory,
  GetTopActiveSpaces
} from "../../../graphql/user"
import {useParams} from "react-router"

export default function SpacePage({allPropssetPopup}) {

  const
    params = useParams(),
    {data: topSpaceData} = useQuery(GetTopActiveSpaces, {
      variables: {limit: 6},
      context: {server: USER_SERVICE_GQL}
    }),
    {user, loggedIn} = useSelector((store) => store?.userProfile),
    profileData =
      loggedIn &&
      useQuery(GetProfileCard, {
        context: {server: USER_SERVICE_GQL},
        variables: {
          username: user?.username
        }
      }),
       { data, loading } = useQuery(GetSpaceCategory, {
        context: { server: USER_SERVICE_GQL },
        variables: { q: params.category }
      })

  const allProps = getAllProps({user, loggedIn, profileData, data, topSpaceData, loading})

  return <Spaces allProps={allProps} />
}
