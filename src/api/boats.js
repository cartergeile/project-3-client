// api call
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllBoats = () => {
    return axios(`${apiUrl}/boats`)
}

// READ -> Show
export const getOneBoat = (id) => {
    return axios(`${apiUrl}/boats/${id}`)
}

// Create (create boat)
export const createBoat = (user, newBoat) => {
    console.log('this is the user', user)
    console.log('this is the newBoat', newBoat)
    return axios({
        url: `${apiUrl}/boats`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { boat: newBoat }
    })
}

// Update (update boat)
export const updateBoat = (user, updatedBoat) => {
    return axios({
        url: `${apiUrl}/boats/${updatedBoat.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { boat: updatedBoat }
    })
}

// Delete (delete boat)
export const removeBoat = (user, boatId) => {
    return axios({
        url: `${apiUrl}/boats/${boatId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}