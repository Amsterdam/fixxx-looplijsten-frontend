import React, { FC } from "react"
import { Link } from "@reach/router"
import SearchResultWrap from "./SearchResultWrap"
import SearchResultMenu from "./SearchResultMenu"
import SearchResultAddress from "./SearchResultAddress"
import SearchResultDistance from "./SearchResultDistance"
import SearchResultCase from "./SearchResultCase"
import { to } from "../../config/page"
import displayAddress from "../../lib/displayAddress"
import {ActionButtonsComponentType} from "./SearchResults"

type Props = {
  caseItem: SearchResultCase
  actionButtonsComponent?:ActionButtonsComponentType
}

const SearchResultSingle: FC<Props> = ({ caseItem, actionButtonsComponent }) => {
  const {
    case_id: caseId,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    case_reason: reason,
    stadium,
    distance,
    teams,
    fraud_prediction: {
      fraud_probability: fraudProbability
    } = {}
  } = caseItem

  const linkTo = to(`cases/${ caseId }`)
  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const showDistance = distance !== undefined

  const ActionButtonsComponent = actionButtonsComponent

  return (
    <Link to={ linkTo }>
      <SearchResultWrap>
        <div>
          <SearchResultAddress address={ address } postalCode={ postalCode } />
          <SearchResultCase reason={ reason } stadium={ stadium } teams={ teams } fraudProbability={ fraudProbability } />
        </div>
        <SearchResultMenu>
          { showDistance &&
            <SearchResultDistance distance={ distance! } />
          }
          {
            ActionButtonsComponent &&
            <ActionButtonsComponent caseId={caseId} />
          }
        </SearchResultMenu>
      </SearchResultWrap>
    </Link>
  )
}
export default SearchResultSingle
