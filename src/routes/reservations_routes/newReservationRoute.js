import { db } from "../../database/db_configs.js"
import { getSpotlightAvailable, updateSpotlightAvailable } from '../../models/spotlights_sql.js'
import { createReservation, getReservationById } from '../../models/reservations_sql.js'

// function convertToTimestamp(dateStart, dateEnd) {
//   console.log(dateStart, dateEnd)
//   // Séparer la date et l'heure "02/03/2025, 12:34"
//   let [startDate, startTime] = dateStart.split(", ");
//   // Séparer jour, mois et année
//   let [startDate_Day, startDate_Month, startDate_Year] = startDate.split("/").map(Number);
//   // Séparer heure et minute
//   let [startTime_Hour, startTime_Minute] = startTime.split(":").map(Number);
//   // Construire un objet Date
//   let new_dateStart = new Date(startDate_Year, startDate_Month - 1, startDate_Day, startTime_Hour, startTime_Minute);
//   // Obtenir le timestamp
//   let timestampStart = Math.floor(new_dateStart.getTime());

//   // Séparer la date et l'heure pour la fin
//   let [endDate, endTime] = dateEnd.split(", ");
//   let [endDate_Day, endDate_Month, endDate_Year] = endDate.split("/").map(Number);
//   let [endTime_Hour, endTime_Minute] = endTime.split(":").map(Number);
//   // Construire un objet Date pour la fin
//   let new_dateEnd = new Date(endDate_Year, endDate_Month - 1, endDate_Day, endTime_Hour, endTime_Minute);
//   // Obtenir le timestamp
//   let timestampEnd = Math.floor(new_dateEnd.getTime());

//   return { timestampStart, timestampEnd };
// }

const newReservation = (req, res) => {
  try {
    const { id_utilisateur, id_projecteur, date_debut, date_fin } = req.body

    if (!id_utilisateur || !id_projecteur || !date_debut || !date_fin) {
      return res.status(400).json({ message: "Champs vides" });
    }

    // db.all(getSpotlightAvailable, ['disponible'], (err, rows) => {
    //   if (err) {
    //     return res.status(500).json({ error: err.message })
    //   }

    //   if (!Array.isArray(rows) || rows.length === 0) {
    //     return res.status(400).json({ message: `Aucun projecteur disponible` });
    //   }
      
    //   db.all(getReservationById, [id_projecteur], (err, compare) => {
    //     if (err) {
    //       return res.status(500).json({ error: err.message })
    //     }

    //     if (!compare || compare.lenth === 0) {
    //       return res.status(400).json({ message: `Aucun projecteur disponible` });
    //     }
    //     //console.log(date_debut, date_fin)

    //     let newTimestampDate = convertToTimestamp(date_debut, date_fin)
    //     let newTimestampDate_Start = newTimestampDate.timestampStart
    //     let newTimestampDate_End = newTimestampDate.timestampEnd

    //     for (const row of compare) {
    //       let oldTimestampDate = convertToTimestamp(compare.date_start, compare.date_end)
    //       let oldTimestampDate_Start = oldTimestampDate.timestampStart
    //       let oldTimestampDate_End = oldTimestampDate.timestampEnd

    //       //console.log(newTimestampDate, oldTimestampDate)
          
    //       if (!((newTimestampDate_Start <= oldTimestampDate_Start && newTimestampDate_End <= oldTimestampDate_Start) || 
    //         (newTimestampDate_Start >= oldTimestampDate_End && newTimestampDate_End >= oldTimestampDate_End))) {
    //         return res.json({ message: "Plage horaire indisponible" });
    //       }
    //     }  

    //     db.run(createReservation, [id_utilisateur, id_projecteur, date_debut, date_fin], (err) => {
    //       if (err) {
    //         return res.status(500).json({ error: err.message })
    //       }
    //       res.json({ message: `Nouvelle reservation de ${id_projecteur} debut ${date_debut} et fin ${date_fin}` })
  
    //       db.run(updateSpotlightAvailable, ['non disponible', id_projecteur], (err) => {
    //         if (err) {
    //           return res.status(500).json({ error: err.message })
    //         }
    //         console.log("mis a jour")
    //       })
    //     })
    //   })
    // })

    db.all(getSpotlightAvailable, ['disponible'], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      // Empeche la reservation d'un projecteur si aucun n'est disponible
      if (!rows.length === 0) {
        return res.status(400).json({ message: `Aucun projecteur disponible` });
      }

      db.run(createReservation, [id_utilisateur, id_projecteur, date_debut, date_fin], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: `Nouvelle reservation de ${id_projecteur} de ${date_debut} à ${date_fin}` })

        db.run(updateSpotlightAvailable, ['non disponible', id_projecteur], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
        })
      })
    })
  } catch (error) {
    return res.json({ status: 400, success: false, error: error.message })
  }
}

export { newReservation }