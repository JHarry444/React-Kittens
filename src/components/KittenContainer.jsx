import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import Kitten from './Kitten';

const KittenContainer = ({ kittens, deleteKitten, setCurrentKitten }) => (
  <Row className="card-group row-cols-3 g-4">
    {kittens.map(({
      id, name, breed, age, cuteness,
    }) => (
      <Kitten
        key={id}
        id={id}
        name={name}
        breed={breed}
        age={age}
        cuteness={cuteness}
        deleteKitten={deleteKitten}
        setCurrentKitten={setCurrentKitten}
      />
    ))}
  </Row>
);

export default KittenContainer;

KittenContainer.propTypes = {
  kittens: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    cuteness: PropTypes.number.isRequired,
  }).isRequired,
  deleteKitten: PropTypes.func.isRequired,
  setCurrentKitten: PropTypes.func.isRequired,
};
