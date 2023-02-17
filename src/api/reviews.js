import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// POST /reviews/:tripId/:boatId
export const createReview = (tripId, boatId, newReview) => {
    return axios({
        url:`${apiUrl}/reviews/${tripId}/${boatId}`,
        method: 'POST',
        data: { review: newReview }
    })
}

// UPDATE
// PATCH /reviews/:tripId/:boatId/:reviewId
export const updateReview = (user, tripId, boatId, updatedReview) => {
    return axios({
        url: `${apiUrl}/reviews/${tripId}/${boatId}/${updatedReview._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}

// DELETE
// DELETE /reviews/:tripId/:boatId/:reviewId
export const deleteActor = (user, tripId, boatId, reviewId) => {
    return axios({
        url: `${apiUrl}/reviews/${tripId}/${boatId}/${reviewId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}