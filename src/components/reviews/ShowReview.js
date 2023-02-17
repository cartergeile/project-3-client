import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteReview } from '../../api/reviews'
import EditReviewModal from './EditReviewModal'

const ShowReview = (props) => {
    const { review, user, boat, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const removeReview = () => {
        deleteReview(user, boat.id, review._id)
            .then(() => {
                msgAlert({
                    heading: 'Review Deleted',
                    message: 'Your review has been deleted.',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
                    message: 'Something went wrong. Please try again.',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{review.author}</Card.Header>
                <Card.Body>
                    <small>{review.note}</small>
                </Card.Body>
                <Card.Footer>
                    <small>{review.createdAt}</small><br />
                    {
                        user && review.author && user._id === review.author._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Review
                            </Button>
                            <Button
                                onClick={() => removeReview()}
                                variant="danger"
                                className="m-2"
                            >
                                Delete Review
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditReviewModal
                user={user}
                boat={boat}
                review={review}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowReview