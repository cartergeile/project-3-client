import { useState } from 'react'
import { createTrip } from '../../api/trips'
import TripForm from '../shared/TripForm'

import { useNavigate } from 'react-router-dom'

const CreateTrip = (props) => {
  const { user, msgAlert } = props
  const navigate = useNavigate()

  const [trip, setTrip] = useState({

  })
}