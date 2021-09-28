import propTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import Kitten from './Kitten';

const KittenContainer = ({ kittens, deleteKitten }) => (
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
      />
    ))}
  </Row>
);

export default KittenContainer;

KittenContainer.propTypes = {
  kittens: propTypes.arrayOf({
    id: propTypes.number,
    name: propTypes.string.isRequired,
    breed: propTypes.string.isRequired,
    age: propTypes.number.isRequired,
    cuteness: propTypes.number.isRequired,
  }).isRequired,
  deleteKitten: propTypes.func.isRequired,
};
