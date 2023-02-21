import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneBoat, removeBoat, updateBoat } from '../../api/boats'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditBoatModal from './EditBoatModal'
import ShowReview from '../reviews/ShowReview'
import NewReviewModal from '../reviews/NewReviewModal'

const reviewCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBoat = (props) => {
    const { user, msgAlert, boat, trip, triggerRegresh } = props

    const [boat, setBoat] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    // const { id } = useParams()
    const navigate = useNavigate()

    console.log('user in ShowBoat props', user)
    console.log('msgAlert in ShowBoat props', msgAlert)

    useEffect(() => {
        getOneBoat(trip.id, boat.id)
            .then(res => setBoat(res.data.boat))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting boats',
                    message: messages.getBoatsFailure,
                    variant: 'danger'
                })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated])

    // remove boat
    const deleteBoat = () => {
        removeBoat(user, trip.id, boat.id)
            //success
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBoatSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate(`/trips/${trip.id}`)})
            // failure
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeBoatFailure,
                    variant: 'danger'
                })
            })
    }

    let reviewCards
    if (boat) {
        if (boat.reviews.length > 0) {
            reviewCards = boat.reviews.map(review => (
                <ShowReview
                    key={review.id}
                    review={review}
                    user={user}
                    boat={boat}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!boat) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ boat.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Cpt. { boat.captain }</small></div>
                            <div><small>Passengers: {boat.passengers}</small></div>
                            <div><small>{ boat.length } ft.</small></div>
                            <div>
                                <small>
                                    Pets Allowed?: { boat.petsAllowed ? 'Yes' : 'No' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button
                                className="m-2"
                                variant="dark"
                                size="lg"
                                onClick={() => setReviewModalShow(true)}
                            >
                                WRITE A REVIEW
                            </Button>
                        </div>
                        {
                            boat.owner && user && boat.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {boat.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => deleteBoat()}
                                >
                                    Set {boat.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
           <Container className="m-2"> style={reviewCardContainerLayout}
                {reviewCards}
           </Container>
            <EditBoatModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateBoat={updateBoat}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                boat={boat}
            />
           <NewReviewModal
                boat={boat}
                show={reviewModalShow}
                handleClose={() => setReviewModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowBoat