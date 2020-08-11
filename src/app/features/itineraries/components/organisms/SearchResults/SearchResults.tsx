import React, { useMemo } from "react"
import { useParams } from "@reach/router"

import { useSearch } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"

type Props = {
  postalCode: string
  streetNumber: number
  suffix?: string
}

const SearchResults: React.FC<Props> = ({ postalCode, streetNumber, suffix }) => {
  const { itineraryId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId!)
  const { data, isBusy } = useSearch(postalCode, streetNumber, suffix)

  const items = useMemo(() => casesToCardCaseProps(data?.cases, itinerary), [itinerary, data])

  return items.length > 0
    ? <ItineraryItemCardList items={items}/>
    : !isBusy
      ? <p>Geen resultaat</p>
      : null
}

export default SearchResults