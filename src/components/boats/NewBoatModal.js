import { useState } from 'react'
import { createBoat } from '../../api/boats'
import { createBoatSuccess, createBoatFailure } from '../shared/AutoDismissAlert/messages'
import BoatForm from '../shared/BoatForm'
import { Modal } from 'react-bootstrap'

const NewBoatModal = (props) => {
    const { user, msgAlert, trip, show, handleClose, triggerRefresh } = props

    const [boat, setBoat] = useState({})

    const onChange = (e) => {
        e.persist()

        setBoat(prevBoat => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'petsAllowed' && e.target.checked) {
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

        createBoat(user, trip.id, boat)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'New boat added!',
                    message: createBoatSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'There was an error',
                    message: createBoatFailure,
                    variant: 'danger'

                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <BoatForm
                    boat={boat}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Add a boat"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewBoatModal