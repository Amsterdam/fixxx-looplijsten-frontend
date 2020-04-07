import React, { FC } from "react"
import SearchForm from "./SearchForm"
import SearchResults, {ActionButtonsComponentType} from "./SearchResults"
import SmallSpinner from "../global/SmallSpinner"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  actionButtonsComponent?:ActionButtonsComponentType
}

const Search: FC<Props> = ({ actionButtonsComponent }) => {
  const {
    search: {
      isFetching,
      results
    }
  } = useGlobalState()

  const showSpinner = isFetching

  return (
    <div className="Search">
      <SearchForm />
      { showSpinner &&
        <SmallSpinner />
      }
      <SearchResults
        results={ results }
        actionButtonsComponent={actionButtonsComponent}
      />
    </div>
  )
}
export default Search
