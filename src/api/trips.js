import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// GET /trips
export const getAllTrips = () => {
  return axios(`${apiUrl}/trips`)
}

// Read -> Show
// GET /trips/:tripId
export const getOneTrip = (id) => {
  return axios(`${apiUrl}/trips/${id}`)
}

// Create a trip
// POST /trips
export const createTrip = (user, newTrip) => {
  return axios({
    url: `${apiUrl}/trips`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { trip: newTrip}
  })
}

// Update a trip
// PATCH /trips/:tripId
export const updateTrip = (user, updatedTrip) => {
  return axios({
    url: `${apiUrl}/trips/${updatedTrip.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { trip: updatedTrip }
  })
}

// Delete a trip
// DELETE /trips/:tripId
export const removeTrip = (user, tripId) => {
  return axios({
    url: `${apiUrl}/trips/${tripId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}