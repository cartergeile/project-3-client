import { Card, Button } from 'react-bootstrap'

const ShowReview = (props) => {
    const { review } = props

    return (
        <>
            <Card className="m-2">
                <Card.Header>{review.author}</Card.Header>
                <Card.Body>
                    <small>{review.note}</small>
                </Card.Body>
                <Card.Footer>{review.createdAt}</Card.Footer>
            </Card>
        </>
    )
}

export default ShowReview