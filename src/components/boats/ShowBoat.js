import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button, Row, Col, Breadcrumb } from 'react-bootstrap'
import { getOneBoat, removeBoat, updateBoat } from '../../api/boats'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditBoatModal from './EditBoatModal'
import ShowReview from '../reviews/ShowReview'
import NewReviewModal from '../reviews/NewReviewModal'
import { getOneTrip } from '../../api/trips'

const reviewCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBoat = (props) => {
    const { user, msgAlert, trip, triggerRefresh } = props
    // const { tripId, boatId } = useParams()
    const navigate = useNavigate()

    const [boat, setBoat] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [reviewModalShow, setReviewModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    console.log('user in ShowBoat props', user)
    console.log('msgAlert in ShowBoat props', msgAlert)
    console.log('trip in ShowBoat props', trip)
    console.log('boat in showboat', boat)
    // console.log('tripId', tripId)
    // console.log('boatId', boatId)
    // console.log('get one boat', getOneBoat(user, tripId, boatId))

    useEffect(() => {
        getOneBoat(user, trip.id, boat.id)
            .then(res => {
                console.log('boat res data', res.data)
                setBoat(res.data.boat)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting boats',
                    message: messages.getBoatsFailure,
                    variant: 'danger'
                })
            })
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
                    trip={trip}
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
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/trips">
                    Trips
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{boat.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <h1 className="text-center">{boat.name}</h1>
                    <h2 className="text-center">Captain {boat.captain}</h2>
                </Row>
                <Row>
                    <Col>
                        <img src={boat.image} className="rounded float-md-start" alt="" style={{ width: '50rem' }}/>
                    </Col>
                    <Col>
                        <h3 className="m-2">About this Boat</h3>
                        <p className="m-2">Passengers: {boat.passengers}</p>
                        <p className="m-2">{boat.length} ft.</p>
                        <p className="m-2">{boat.petsAllowed ? 'Pet Friendly' : 'No Pets Allowed'}</p>
                    </Col>
                </Row>
            </Container>
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
                boat.owner && user && boat.owner.id === user.id
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
                        Delete {boat.name}
                    </Button>
                </>
                :
                null
            }
            <Container 
                className="m-2" 
                style={reviewCardContainerLayout}
            >
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
                // tripId={tripId}
            />
            {/* <NewReviewModal
                boat={boat}
                user={user}
                trip={trip}
                show={reviewModalShow}
                handleClose={() => setReviewModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default ShowBoat