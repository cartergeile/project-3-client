import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

import { getAllBoats } from '../../api/boats'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const BoatsIndex = (props) => {
    const [boats, setBoats] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the boats in index', boats)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our boats from the api when the component mounts
    useEffect(() => {
        getAllBoats()
            .then(res => setBoats(res.data.boats))
            .catch(err => {
                msgAlert({
                    heading: 'Error populating boats',
                    message: messages.getBoatsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!boats) {
      return <LoadingScreen />
    } else if (boats.length === 0) {
      return <p>There are no boats in inventory.</p>
    }

     // produce a card for every boat
    const boatCards = boats.map(boat => (
        <Card key={ boat.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ boat.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/boats/${boat.id}`} className="btn btn-info">View { boat.name }</Link>
                </Card.Text>
                { boat.owner ?
                <Card.Footer>
                     owner: {boat.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the boatcards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { boatCards }
        </div>
    )
}

// export our component
export default BoatsIndex