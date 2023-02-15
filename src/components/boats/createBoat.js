import { useState } from 'react'
import { createBoat } from '../../api/boats'
import { createBoatSuccess, createBoatFailure } from '../shared/AutoDismissAlert/messages'
import BoatForm from '../shared/BoatForm'

import { useNavigate } from 'react-router-dom' 

const CreateBoat = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()

    const [boat, setBoat] = useState({
        name: '',
        captain: '',
        passengers: '',
        length: '',
        petsAllowed: false,
        image: ''
    })

    const onChange = (e) => {
        e.persist()

        setBoat(prevBoat => {
            const updatedName = e.target.name
            let updatedValue = e.target.updatedValue

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
            if (updatedName === 'petsAllowed' && !e.target.checked) {
                updatedValue = true 
            } else if (updatedName === 'petsAllowed' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedBoat = {
                [updatedName] : updatedValue
            }
            console.log('the boat', updatedBoat)
            return {
                ...prevBoat, ...updatedBoat
            }
        })
    }



const onSubmit = (e) => {
    e.preventDefault()

    createBoat(user, boat)
    .then(res => { navigate(`/boats/${res.data.boat.id}`)})
    .then(() => {
        msgAlert({
            heading: 'New boat added!',
            message: createBoatSuccess,
            variant: 'success'
        })
    })

    .catch(() => {
        msgAlert({
            heading: 'There was an error',
            message: createBoatFailure,
            variant: 'danger'

        })
    })
}

return (
    <BoatForm
        boat={boat}
        handleChange={onChange}
        handleSubmit={onSubmit}
        heading='Create a new boat.'
        />
    )
}

export default CreateBoat