import React, { FC, useContext } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { Search as SearchIcon } from "@datapunt/asc-assets"
import { to } from "../../config/domain"
import stateContext from "../../contexts/StateContext"

const NavWrap = styled.div`
  position: fixed
  width: 100%
  top: 50px
  left: 0
`

const Nav = styled.nav`
  background-color: #E6E6E6
  margin-bottom: 12px
  padding: 12px
  width: calc(100% - 24px);
`
const Ul = styled.ul`
  list-style: none
  margin: 0
  padding: 0
  display: flex
  justify-content: space-between
`
const Li = styled.li`
  a {
    color: black
  }
`
const LiSearch = styled.li`
  width: 24px
  height: 24px
  margin-right: 16px
`

const Navigation: FC = () => {

  const {
    state: {
      itineraries: {
        itineraries
      }
    }
  } = useContext(stateContext)

  const numItineraries = itineraries ? itineraries.length : 0
  const showCounter = numItineraries > 0

  return (
    <NavWrap>
      <Nav>
        <Ul>
          <Li><Link to={ to("/") }>Mijn looplijst { showCounter && `(${ numItineraries })` }</Link></Li>
          <LiSearch><Link to={ to("/zoeken") }><SearchIcon /></Link></LiSearch>
        </Ul>
      </Nav>
    </NavWrap>
  )
}
export default Navigation
