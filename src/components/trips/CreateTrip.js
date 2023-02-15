import { useState } from 'react'
import { createTrip } from '../../api/trips'
import TripForm from '../shared/TripForm'

import { useNavigate } from 'react-router-dom'

const CreateTrip = (props) => {
  const { user, msgAlert } = props
  const navigate = useNavigate()

  const [trip, setTrip] = useState({
    location: '',
    city: '',
    startDate: '',
    endDate: '',
  })

  const onChange = (e) => {
    e.persist()

    setTrip(prevTrip => {
      const updatedName = e.target.name 
      let updatedValue = e.target.value 

      const updatedTrip = {
        [updatedName] : updatedValue
      }

      return {
        ...prevTrip, ...updatedTrip
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    createTrip(user, trip)
    // navigate to show page
      .then(res => { navigate(`/trips/${res.data.trip.id}`)})
      // success msg
      .then(() => {
        msgAlert({
          heading: 'Success!',
          message: 'New trip created!',
          variant: 'success'
        })
      })
      // handle error
      .catch(() => {
        msgAlert({
          heading: 'Uh Oh!',
          message: 'Something went wrong, please try again',
          variant: 'danger'
        })
      })
  }

  return (
    <TripForm
        trip={trip}
        handleChange={onChange}
        handleSubmit={onSubmit}
        heading='Create a new trip.'
        />
  )
}

export default CreateTrip