import {useReducer, useMemo} from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createSetResults,
  createSetSuggestions,
  createSetTeam,
  createSetError,
  createClear
} from "./searchReducer"
import { get, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import isEmptyObject from "../lib/utils/isEmptyObject"
import groupCasesByAddress from "../lib/groupCasesByAddress"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

const useSearch = () : [SearchState, SearchActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const search = (postalCode: PostalCode, streetNumber: StreetNumberString, suffix: StreetSuffix) => {

    (async () => {

      dispatch(createStartFetching([postalCode, streetNumber, suffix]))

      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const [response, result] = await get(url)

      dispatch(createStopFetching())

      // Handle error responses
      if (isForbidden(response)) return handleForbiddenResponse()
      if (notOk(response)) return false

      // Set results
      const { cases } = result
      const nonEmptyCases = cases.filter((obj: SearchResultCase) => !isEmptyObject(obj))
      const groupedCases = groupCasesByAddress(nonEmptyCases)
      const results = groupedCases.map(cases => ({ success: true, data: { cases } }))
      dispatch(createSetResults(results))
    })()
  }

  const getSuggestions = async (itineraryId: Id) => {

    dispatch(createStartFetching())

    const url = getUrl(`itineraries/${ itineraryId }/suggestions`)
    const [response, result] = await get(url)

    dispatch(createStopFetching())

    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to GET"
      dispatch(createSetError(errorMessage))
      return
    }

    const { cases } = result
    const results = cases.map((caseItem: SearchResultCase) => ({ success: true, data: { cases: [caseItem] } }))
    dispatch(createSetSuggestions(results))
  }

  const setTeam = (caseId: CaseId, teamMembers?: TeamMembers) => {
    dispatch(createSetTeam(caseId, teamMembers))
  }

  const clear = () => {
    dispatch(createClear())
  }

  // We memoize the selectors to ensure it only re-triggers a hook when state changes
  const actionCreators = { search, getSuggestions, setTeam, clear }
  const actionCreatorsMemoized = useMemo(() => actionCreators, [actionCreators])

  return [state, actionCreatorsMemoized]
}

export default useSearch
