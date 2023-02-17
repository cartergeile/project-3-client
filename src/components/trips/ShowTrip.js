import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTrip, removeTrip, updateTrip } from '../../api/trips'
import { getTripsFailure, removeTripFailure, removeTripSuccess } from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditTripModal from './EditTripModal'
import ShowBoat from '../boats/ShowBoat'
import CreateBoat from '../boats/createBoat'

const boatCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowTrip = (props) => {
    const [trip, setTrip] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [boatModalShow, setBoatModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props

    useEffect(() => {
        getOneTrip(id)
            .then(res => setTrip(res.data.trip))
            .catch(err => {
                msgAlert({
                heading: 'Error getting trips',
                message: getTripsFailure,
                variant: 'danger'
            })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updated])

    const deleteTrip = () => {
        removeTrip(user, trip.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: removeTripSuccess,
                    variant: 'success'
                })
            })
            .then(() => { navigate('/') })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: removeTripFailure,
                    variant: 'danger'
                })
            })
    }

    let boatCards
    if (trip) {
        if (trip.boats.length > 0) {
            boatCards = trip.boats.map(boat => (
                <ShowBoat
                    key={boat.id}
                    boat={boat}
                    user={user}
                    trip={trip}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!trip) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>{trip.location}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>City: {trip.city}</small></div>
                            <div><small>Start Date: {trip.startDate}</small></div>
                            <div><small>End Date: {trip.endDate}</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button
                                className="m-2"
                                size="lg"
                                variant="info"
                                onClick={() => setBoatModalShow(true)}
                            >
                                Add a boat to this trip
                            </Button>
                        </div>
                        {
                            trip.owner && user && trip.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Trip
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => deleteTrip()}
                                >
                                    Remove Trip
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={boatCardContainerLayout}>
                {boatCards}
            </Container>
            <EditTripModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateTrip={updateTrip}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                trip={trip}
            />
            <CreateBoat
                trip={trip}
                show={boatModalShow}
                handleClose={() => setBoatModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowTrip