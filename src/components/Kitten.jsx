import propTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

const Kitten = ({
  id, name, breed, age, cuteness, deleteKitten,
}) => (
  <Col>
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{breed}</Card.Text>
        <Card.Text>
          {age}
          {' '}
          years old
        </Card.Text>
        <Card.Text>
          {cuteness}
          /10
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Link href="#">Update</Card.Link>
        <Card.Link href="#" onClick={() => deleteKitten(id)}>Delete</Card.Link>
      </Card.Footer>
    </Card>
  </Col>
);

export default Kitten;

Kitten.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  breed: propTypes.string.isRequired,
  age: propTypes.number.isRequired,
  cuteness: propTypes.number.isRequired,
  deleteKitten: propTypes.func.isRequired,
};
