import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    search: {
      postalCode: string
      streetNumber: string
      suffix: string
    }
    setSearch: (a: string, b: string, c: string) => void

    parse: string
    setParse: (a: string) => void

    hasItinerary: (a: CaseId) => boolean
    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions

    isAnonymous: boolean
    toggleIsAnonymous: () => void

    clear: () => void
  }
}

const value = {
  state: {
    auth: {
      isInitialized: false,
      authToken: undefined
    },
    authActions: {
      authenticate: (a: string, b: string) => {},
      unAuthenticate: noop,
      clear: noop
    },

    search: {
      postalCode: "",
      streetNumber: "",
      suffix: ""
    },
    setSearch: noop,

    parse: "",
    setParse: noop,

    hasItinerary: () => false,
    itineraries: {
      isFetching: false,
      isInitialized: false,
      itineraries: [],
      errorMessage: undefined
    },
    itinerariesActions: {
      initialize: noop,
      add: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,

    clear: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
