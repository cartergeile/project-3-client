import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateReview } from '../../api/reviews'
import ReviewForm from '../shared/ReviewForm'

const EditReviewModal = (props) => {
    const { user, boat, show, handleClose, msgAlert, triggerRefresh } = props

    const [review, setReview] = useState(props.review)

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

        updateReview(user, boat.id, review)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Your review has been updated.',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again.',
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
                    heading="Update Review"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReviewModal