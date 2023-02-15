import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneBoat, removeBoat, updateBoat } from '../../api/boats'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditBoatModal from './EditBoatModal'



const ShowBoat = (props) => {
    const [boat, setBoat] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowBoat props', user)
    console.log('msgAlert in ShowBoat props', msgAlert)

    useEffect(() => {
        getOneBoat(id)
            .then(res => setBoat(res.data.boat))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting boats',
                    message: messages.getBoatsFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    // remove boat
    const deleteBoat = () => {
        removeBoat(user, boat.id)
            //success
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBoatSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // failure
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeBoatFailure,
                    variant: 'danger'
                })
            })
    }


    if(!boat) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ boat.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small></small></div>
                            <div><small></small></div>
                            <div><small></small></div>
                            <div><small></small></div>
                            <div>
                                <small>
                                    Pets Allowed?: { boat.petsAllowed ? 'yes' : 'no' }
                                </small>
                            </div>
                            <div><small></small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        
                        {
                            boat.owner && user && boat.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {boat.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => deleteBoat()}
                                >
                                    Set {boat.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
           
            <EditBoatModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateBoat={updateBoat}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                boat={boat}
            />
           
        </>
    )
}

export default ShowBoat