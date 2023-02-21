import { Container, Form, Button } from "react-bootstrap"


const ReviewForm = (props) => {
    const { review, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
                    <Form.Label>Review:</Form.Label>
                    <Form.Control 
                        placeholder=""
                        name="note"
                        id="note"
                        value={ review.note }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Post</Button>
            </Form>
        </Container>
    )
}

export default ReviewForm