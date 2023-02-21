import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { getAllTrips } from '../../api/trips'
import { getTripsFailure } from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const TripsIndex = (props) => {
    const [trips, setTrips] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
        getAllTrips()
            .then(res => setTrips(res.data.trips))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting trips',
                    message: getTripsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        console.log(error)
        return <p>Error!</p>
    }

    if (!trips) {
        return <LoadingScreen />
    } else if (trips.length === 0) {
        return <p>No trips yet, go add some!</p>
    }

    const tripCards = trips.map(trip => (
        <Card key={ trip.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ trip.location }</Card.Header>
            <Card.Body>
                <Card.Title>{ trip.city }</Card.Title>
                <Card.Text>
                {trip.formattedStartDate} – {trip.formattedEndDate} <br/>
                    <Link to={`/trips/${trip.id}`} className="btn btn-outline-primary">View { trip.location }</Link>
                </Card.Text>
                { trip.owner ?
                <Card.Footer>
                    owner: {trip.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerStyle }>
            { tripCards }
        </div>
    )
}

// export our component
export default TripsIndex