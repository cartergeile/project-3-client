import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const BoatsIndex= (props) => {
    const { boat, trip } = props

    return (
        <>
            <Card className="m-2 text-center" style={{ width: '25rem' }}>
                <Card.Img variant="top" src={boat.image} />
                <Card.Body>
                    <Card.Title>{boat.name}</Card.Title>
                    <Card.Text> {boat.passengers} Passengers <br/> {boat.length} ft. <br/>
                        <Link to={`/boats/${trip.id}/${boat._id}`} className="btn btn-primary">Details</Link>
                    </Card.Text>
                    {/* { trip.owner ?
                        <Card.Footer>
                        Contact: {trip.owner.email} 
                        </Card.Footer>
                    : null} */}
                </Card.Body>
            </Card>
        </>
    )
}

export default BoatsIndex