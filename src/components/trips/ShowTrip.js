import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTrip, removeTrip, updateTrip } from '../../api/trips'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'


const ShowTrip = (props) => {
  const [trip, setTrip] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  const { user, msgAlert } = props

  useEffect(() => {
    getOneTrip(id)
    .then(res => setTrip(res.data.trip))
    .catch(err => {
      msgAlert({
        heading: 'Error getting trips',
        message: 'Something went wrong, please try again',
        variant: 'danger'
      })
    })
  }, [])

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
      </Card>
    </Container>
  </>
)
}

export default ShowTrip