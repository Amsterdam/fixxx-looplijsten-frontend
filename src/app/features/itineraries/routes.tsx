import OpenIssuesPage from "./components/pages/open-issues/OpenIssuesPage"
import SearchPage from "./components/pages/search/SearchPage"
import SuggestionsPage from "./components/pages/suggestions/SuggestionsPage"
import ListItinerariesPage from "./components/pages/list/ListItinerariesPage"
import ListTeamSettingsOptionsPage from "./components/pages/list/ListTeamSettingsOptionsPage"
import ItineraryPage from "./components/pages/itinerary/ItineraryPage"
import CreateItineraryPage from "./components/pages/create/CreateItineraryPage"

export default {
  "/": ListItinerariesPage,
  "/issuemeldingen/": OpenIssuesPage,
  "/lijst-instellingen/": ListTeamSettingsOptionsPage,
  "/lijst/:itineraryId/": ItineraryPage,
  "/lijst/:itineraryId/issuemeldingen/": OpenIssuesPage,
  "/lijst/:itineraryId/suggesties/": SuggestionsPage,
  "/lijst/:itineraryId/zoeken/": SearchPage,
  "/lijst/nieuw/": CreateItineraryPage,
  "/lijst/nieuw/:teamSettingsId/": CreateItineraryPage,
  "/zoeken/": SearchPage
}
