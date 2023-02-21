// this modal is rendered by ShowBoat

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BoatForm from '../shared/BoatForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditBoatModal = (props) => {
    // destructure props
    const { tripId, user, show, handleClose, updateBoat, msgAlert, triggerRefresh } = props

    const [boat, setBoat] = useState(props.boat)

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

        updateBoat(user, tripId, boat)
            // closes modal
            .then(() => handleClose())
            // success message
            .then(() => {
                msgAlert({
                    heading: 'Boat added',
                    message: messages.updateBoatSuccess,
                    variant: 'success'
                })
            })
            // refresh the Show Page
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateBoatFailure,
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
                    heading="Update Boat"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBoatModal