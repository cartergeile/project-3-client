import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTrip, removeTrip, updateTrip } from '../../api/trips'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditTripModal from './EditTripModal'


const ShowTrip = (props) => {
  const [trip, setTrip] = useState(null)
  const [editModalShow, setEditModalShow] = useState(false)
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
        message: 'Something went wrong, please try again',
        variant: 'danger'
      })
    })
  }, [updated])

  // remove trip
  const removeTrip = () => {
    deleteTrip(user, trip.id)
      .then(() => {
        msgAlert({
          heading: 'Success',
          message: 'This trip has been removed',
          variant: 'sucess'
        })
      })
      // redirect users
      .then(() => {navigate('/trips')})
      // failure message
      .catch(err => {
        msgAlert({
          heading: 'Error',
          message: 'Something went wrong, please try again',
          variant: 'danger'
        })
      }) 
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
                    onClick={() => removeTrip()}
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
    <EditTripModal 
      user={user}
      show={editModalShow}
      handleClose={() => setEditModalShow(false)}
      updateTrip={updateTrip}
      msgAlert={msgAlert}
      triggerRefresh={() => setUpdated(prev => !prev)}
      trip={trip}
    />
  </>
)
}

export default ShowTrip