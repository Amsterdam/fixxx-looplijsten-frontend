import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"
import SearchResultDistance from "./SearchResultDistance"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  reason: string
  stadium: Stadium
  distance?: number
  teams?: TeamMembers[]
}

const Div = styled.div``
const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultCase: FC<Props> = ({ reason, stadium, distance, teams }) => {

  const {
    auth: {
      user: { email = "" } = {}
    }
  } = useGlobalState()

  const showDistance = distance !== undefined
  const hasTeam = teams !== undefined && teams.length > 0
  const showTeam = hasTeam
  const firstTeam = teams![0]
  const isOwnTeam = hasTeam && firstTeam.map(({ user: { email } }) => email).includes(email)
  const teamString = hasTeam ? firstTeam.map(({ user: { full_name } }) => full_name).join(", ") : ""
  const team = hasTeam ? (isOwnTeam ? "In mijn lijst" : `In lijst: ${ teamString }`) : ""

  return (
    <Div className="SearchResultCase">
      <P>{ reason }</P>
      <Signal text={ stadium } />
      { showDistance &&
        <SearchResultDistance distance={ distance! } />
      }
      { showTeam &&
        <P>{ team }</P>
      }
    </Div>
  )
}
export default SearchResultCase
