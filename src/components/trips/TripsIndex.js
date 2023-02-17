import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from our api file
import { getAllTrips } from '../../api/trips'

// need our messages from our autodismissalert directory
import { getTripsFailure } from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any CSS style, but in camelCase instead of the typical hyphenated naming convention
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet
const TripsIndex = (props) => {
    const [trips, setTrips] = useState(null)
    const [error, setError] = useState(false)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our pets from the api when the component mounts
    useEffect(() => {
        getAllTrips()
            .then(res => setTrips(res.data.trips))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pets',
                    message: getTripsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!trips) {
        // if no trips loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (trips.length === 0) {
        // otherwise if there ARE no trips, display that message
        return <p>No trips yet, go add some!</p>
    }

    // once we have an array of pets, loop over them
    // produce one card for every pet
    const tripCards = trips.map(trip => (
        <Card key={ trip.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ trip.location }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/trips/${trip.id}`} className="btn btn-info">View { trip.location }</Link>
                </Card.Text>
                { trip.owner ?
                <Card.Footer>
                    owner: {trip.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the petcards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { tripCards }
        </div>
    )
}

// export our component
export default TripsIndex