import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { createReview } from '../../api/reviews'
import { createReviewFailure, createReviewSuccess } from '../shared/AutoDismissAlert/messages'
import ReviewForm from '../shared/ReviewForm'


const NewReviewModal = (props) => {
    const { user, trip, boat, show, handleClose, msgAlert, triggerRefresh } = props

    // eslint-disable-next-line no-undef
    const [review, setReview] = useState({})

    console.log('boat from new review props', boat)
    console.log('trip from new reviewprops', trip)

    const onChange = (e) => {
        e.persist()

        setReview(prevReview => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedReview = {
                [updatedName] : updatedValue
            }
    
            return {
                ...prevReview, ...updatedReview
            }
        })

    }

    const onSubmit = (e) => {
        e.preventDefault()
        createReview(user, trip.id, boat.id, review)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Thank you!',
                    message: createReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: createReviewFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ReviewForm
                    review={review}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='New Review'
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewReviewModal