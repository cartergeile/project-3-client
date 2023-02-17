import { Modal } from 'react-bootstrap'
import { createReview } from '../../api/reviews'
import { createReviewFailure, createReviewSuccess } from '../shared/AutoDismissAlert/messages'
import ReviewForm from '../shared/ReviewForm'


const NewReviewModal = (props) => {
    const { user, boat, show, handleClose, msgAlert, triggerRefresh } = props

    const [review, setReview] = useState({})

    const onChange = (e) => {
        e.persist()

        setReview(prevReview => {
            const updatedName = e.target.name
            const updatedValue = e.target.value

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
        createReview(boat.id, review)
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
                    boat={boat}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Leave a review`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewReviewModal