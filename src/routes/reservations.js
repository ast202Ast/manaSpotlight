import { newReservation } from "./reservations_routes/newReservationRoute.js"
import { showAllReservations } from "./reservations_routes/showAllReservationsRoute.js"
import { showReservation } from "./reservations_routes/showReservationRoute.js"
import { updReservation } from "./reservations_routes/updReservationRoute.js"
import { delAllReservations } from "./reservations_routes/delAllReservationsRoute.js"
import { delReservation } from "./reservations_routes/delReservationRoute.js"

const reservations = {
  newReservation,
  showAllReservations,
  showReservation,
  updReservation,
  delAllReservations,
  delReservation
}

export { reservations }