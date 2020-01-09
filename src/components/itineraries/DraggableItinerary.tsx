import React, { FC, useContext, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import IconButton from "../global/IconButton"
import Itinerary from "./Itinerary"
import stateContext from "../../contexts/StateContext"
import confirm from "../../utils/confirm"

type Props = {
  itinerary: Itinerary
  index: number
}

const Div = styled.div`
  transition: opacity 0.6s ease-out
  opacity: ${ (props: { collapsed: boolean }) => props.collapsed ? 0 : 1 }
`

const Inner = styled.div`
  display: flex
  justify-content: space-between
`

const ButtonWrap = styled.div`
  width: 60px
  margin: 24px 0
  button:first-child {
    margin-bottom: 24px
  }
`

const DraggableItinerary: FC<Props> = ({ itinerary, index }) => {

  const {
    state: {
      itinerariesActions: {
        remove
      }
    }
  } = useContext(stateContext)

  const { id, case: { bwv_data }, notes } = itinerary
  const noteId = notes[0] && notes[0].id
  const noteText = notes[0] && notes[0].text
  const notePath = `/notes/${ id }/${ noteId || "" }`

  const [isCollapsed, setCollapse] = useState(false)
  const collapse = () => setCollapse(true)

  const onClick = () => confirm(
    "Weet je zeker dat je deze zaak (en eventuele notities) uit je looplijst wilt verwijderen?",
    () => {
      collapse()
      window.setTimeout(() => remove(id), 500)
    }
  )

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    borderBottom: "1px solid #767676",
    background: "white",
    borderRadius: "5px",
    boxShadow: isDragging ? "0 2px 20px black" : "none",
    padding: isDragging ? "0 8px" : 0,
    ...draggableStyle
  })

  return (
    <Div className="DraggableItinerary" collapsed={ isCollapsed }>
      <Draggable key={ String(id) } draggableId={ String(id) } index={ index }>
      { (provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          style={ getItemStyle(snapshot.isDragging, provided.draggableProps.style) }
        >
          <Inner>
            <Itinerary itinerary={ bwv_data } note={ noteText } />
            <ButtonWrap>
              <IconButton icon="DocumentText" onClick={ () => navigate(to(notePath)) } />
              <IconButton icon="TrashBin" onClick={ onClick } />
            </ButtonWrap>
          </Inner>
        </div>
      ) }
      </Draggable>
    </Div>
  )
}
export default DraggableItinerary
