import React from "react"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import displayAddress from "app/features/shared/utils/displayAddress"

import DeleteItineraryItemButton from "../components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import AddItineraryItemButton from "../components/molecules/AddItineraryItemButton/AddItineraryItemButton"
import FraudProbability from "app//features/shared/components/atoms/FraudProbability/FraudProbability"
import { Case, Itinerary, ItineraryItem } from "app/features/types"
import to from "../../shared/routing/to"

export const casesToCardCaseProps = (cases?: Case[], itinerary?: Itinerary, addDistance: boolean = false) => {
  if (!cases) {
    return []
  }

  const caseIdMap = getCaseIdMap((itinerary?.items ?? []) as unknown as ItineraryItem[])
  return cases.map(mapCaseToCardProps(itinerary?.id, caseIdMap, addDistance))
}

const getCaseIdMap = (items: ItineraryItem[]) =>
  items.reduce((acc, item) => ({ ...acc, [item.case.case_id ?? ""]: item.id }), {}
  )

const mapCaseToCardProps = (itineraryId: number | undefined, itineraryItemIds: Record<string, number>, addDistance: boolean = false) => (
  {
    id,
    case_id,
    case_reason,
    stadium,
    fraud_prediction,
    distance,
    address,
    current_states,
    reason
  }: any): React.ComponentProps<typeof ItineraryItemCard> => ({
  href: to("/cases/:id", { id: case_id || id }),
  backgroundColor: "level2",
  address: displayAddress(
    address?.street_name, 
    address?.number, 
    address?.suffix_letter, 
    address?.suffix
  ),
  postalCode: address.postal_code,
  reason: reason?.reason || case_reason,
  badge: current_states?.length > 0 ? <StadiumBadge stadium={ current_states[0].status_name || "" }/> : <StadiumBadge stadium={ stadium }/>,
  fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
  buttons: (onDeleteButtonClick: () => void) => <>
    { addDistance && distance && itineraryId && Object.keys(itineraryItemIds).length > 0 &&
    <p>{ Math.round(distance) }m</p> }
    { itineraryItemIds[case_id || id]
      ? <DeleteItineraryItemButton onDeleteButtonClicked={ onDeleteButtonClick } id={ itineraryItemIds[case_id || id]! } />
      : itineraryId ? <AddItineraryItemButton caseId={ case_id || id } itinerary={ itineraryId } /> : null
    }
  </>
})
