// api call
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Show one boat
// GET /boats/:tripId/:boatId
export const getOneBoat = (tripId, boatId) => {
    return axios(`${apiUrl}/boats/${tripId}/${boatId}`)
}

// Create (create boat)
// POST /boats/:tripId
export const createBoat = (user, tripId, newBoat) => {
    console.log('this is the user', user)
    console.log('this is the newBoat', newBoat)
    return axios({
        url: `${apiUrl}/boats/${tripId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { boat: newBoat }
    })
}

// Update (update boat)
// PATCH /boats/:tripId/:boatId
export const updateBoat = (user, tripId, updatedBoat) => {
    return axios({
        url: `${apiUrl}/boats/${tripId}/${updatedBoat.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { boat: updatedBoat }
    })
}

// Delete (delete boat)
// DELETE /boats/:tripId/:boatId
export const removeBoat = (user, tripId, boatId) => {
    return axios({
        url: `${apiUrl}/boats/${tripId}/${boatId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}