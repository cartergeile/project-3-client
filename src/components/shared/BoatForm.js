import { Form, Button, Container } from 'react-bootstrap'

const BoatForm = (props) => {

  const { boat, handleChange, handleSubmit, heading } = props

  return (
    <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder=""
                        name="name"
                        id="name"
                        value={ boat.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Captain:</Form.Label>
                    <Form.Control 
                        placeholder=""
                        name="captain"
                        id="captain"
                        value={ boat.captain }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Passengers:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder=""
                        name="passengers"
                        id="passengers"
                        value={ boat.passengers }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Length:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="ft"
                        name="length"
                        id="length"
                        value={ boat.length }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Image:</Form.Label>
                    <Form.Control 
                        placeholder="Please upload image link"
                        name="image"
                        id="image"
                        value={ boat.image }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Pets Allowed?"
                        name="petsAllowed"
                        defaultChecked={ boat.petsAllowed }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
  )
}

export default BoatForm