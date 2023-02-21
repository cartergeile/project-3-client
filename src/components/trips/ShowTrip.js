import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { getOneTrip, removeTrip, updateTrip } from '../../api/trips'
import { getTripsFailure, removeTripFailure, removeTripSuccess } from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditTripModal from './EditTripModal'
// import ShowBoat from '../boats/ShowBoat'
import NewBoatModal from '../boats/NewBoatModal'
import BoatsIndex from '../boats/BoatsIndex'

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
                <BoatsIndex
                    key={boat.id}
                    boat={boat}
                    user={user}
                    trip={trip}
                    msgAlert={msgAlert}
                />
            ))
        }
    }

    if (!trip) {
        return <LoadingScreen />
    }

    return (
        <>
            <h1 className="text-center">{trip.location}</h1>
            <h2 className="text-center">{trip.city}</h2>
            <h3 className="text-center">{trip.formattedStartDate} – {trip.formattedEndDate}</h3>
                        <Container className="m-2" style={boatCardContainerLayout}>
                            {boatCards}
                        </Container>
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
            <EditTripModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateTrip={updateTrip}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                trip={trip}
            />
            <NewBoatModal
                trip={trip}
                user={user}
                show={boatModalShow}
                handleClose={() => setBoatModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowTrip