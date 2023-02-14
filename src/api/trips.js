import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllTrips = () => {
  return axios(`${apiUrl}/trips`)
}

// Read -> Show
export const getOneTrip = (id) => {
  return axios(`${apiUrl}/trips/${id}`)
}

// Create a trip
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
export const updateTrip = (user, updatedTrip) => {
  return axios({
    url: `${apuUrl}/trips/${updatedTrip.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { trip: updatedTrip }
  })
}

// Delete a trip
export const removeTrip = (user, tripId) => {
  return axios({
    url: `${apiUrl}/trips/${tripId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}