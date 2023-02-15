import { Form, Button, Container } from 'react-bootstrap'

const TripForm = (props) => {

  const { trip, handleChange, handleSubmit, heading } = props

  return (
    <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                  <Form.Label>Location</Form.Label>
                    <Form.Select
                        aria-label='trip location'
                        name="location"
                        defaultValue={ trip.location }
                        onChange={handleChange}
                    > 
                    <option>What area would you like to go?</option>
                    <option value='Mediterranean'>Mediterranean</option>
                    <option value='Caribbean'>Caribbean</option>
                    <option value='Indian Ocean'>Indian Ocean</option>
                    <option value='Antarctica'>Antarctica</option>
                    <option value='Far East'>Far East</option>
                    <option value='Mississippi River'>Mississippi River</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>City:</Form.Label>
                    <Form.Control 
                        placeholder="What city will your trip be located?"
                        name="city"
                        id="city"
                        value={ trip.city }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control 
                        type="date"
                        placeholder="When will yout trip start?"
                        name="startDate"
                        id="startDate"
                        value={ trip.startDate }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control 
                        type="date"
                        placeholder="When will yout trip end?"
                        name="endDate"
                        id="endDate"
                        value={ trip.endDate }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
  )
}

export default TripForm