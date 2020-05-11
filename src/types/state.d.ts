declare type ErrorMessage = string
declare type OErrorMessage = ErrorMessage | undefined

declare type ItinerariesState = {
  isFetching: boolean
  isInitialized: boolean
  errorMessage?: ErrorMessage
  itineraries: Itineraries
}

declare type AuthState = {
  isInitialized: boolean
  token?: AuthToken
  user?: AuthUser
  errorMessage?: ErrorMessage
}

declare type StreetSuffix = string
declare type Query = [PostalCode, StreetNumberString, StreetSuffix]
declare type SearchState = {
  isFetching: boolean
  query?: Query
  results?: SearchResults
  suggestions?: SearchResults
  issues?: SearchResults
  errorMessage?: ErrorMessage
}

declare type PlanningSettingsState = {
  isFetching: boolean
  isUpdating: boolean
  data?: {
    projects: string[]
    stadia: Stadia
    settings: PlanningSettings
  }
  errorMessage?: ErrorMessage
}

declare type UsersState = {
  isFetching: boolean
  errorMessage?: ErrorMessage
  results?: Users
}
