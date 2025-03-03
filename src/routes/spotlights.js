import { newSpotlight } from "./spotlights_routes/newSpotlightRoute.js"
import { showAllSpotlights } from "./spotlights_routes/showAllSpotlightsRoute.js"
import { showSpotlight } from "./spotlights_routes/showSpotlightRoute.js"
import { showSpotlightAvailable } from "./spotlights_routes/showSpotlightAvailableRoute.js"
import { updSpotlight } from "./spotlights_routes/updSpotlightRoute.js"
import { delAllSpotlights } from "./spotlights_routes/delAllSpotlightsRoute.js"
import { delSpotlight } from "./spotlights_routes/delSpotlightRoute.js"

const spotlights = {
  newSpotlight,
  showAllSpotlights,
  showSpotlight,
  showSpotlightAvailable,
  updSpotlight,
  delAllSpotlights,
  delSpotlight
}

export { spotlights }