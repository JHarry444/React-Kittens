import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

const Kitten = ({
  id, name, breed, age, cuteness, deleteKitten, setCurrentKitten,
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
        <Card.Link
          href="#"
          onClick={() => setCurrentKitten({
            id, name, breed, age, cuteness,
          })}
        >
          Update
        </Card.Link>
        <Card.Link href="#" onClick={() => deleteKitten(id)}>Delete</Card.Link>
      </Card.Footer>
    </Card>
  </Col>
);

export default Kitten;

Kitten.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  cuteness: PropTypes.number.isRequired,
  deleteKitten: PropTypes.func.isRequired,
  setCurrentKitten: PropTypes.func.isRequired,

};
