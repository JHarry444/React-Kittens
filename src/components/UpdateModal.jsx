import {
  Button, Form, FormGroup, FormLabel, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { context } from '../constants.json';

const UpdateModal = ({
  currentKitten, fetchKittens, setCurrentKitten,
}) => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [cuteness, setCuteness] = useState('');

  useEffect(() => {
    setName(currentKitten.name);
    setBreed(currentKitten.breed);
    setAge(currentKitten.age);
    setCuteness(currentKitten.cuteness);
  }, [currentKitten]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        await axios.patch(`${context}/update/${currentKitten.id}`, {
          name, breed, age, cuteness,
        });
        setCurrentKitten();
        fetchKittens();
        return;
      } catch (err) {
        console.error(err);
      }
    }
    setValidated(true);
  };

  const onReset = (e) => {
    e.preventDefault();
    setName('');
    setBreed('');
    setAge('');
    setCuteness('');
    setValidated(false);
    e.target.nameField.focus();
  };

  return (
    <Modal show onHide={() => setCurrentKitten()}>
      <Modal.Header>
        <Modal.Title>Update Kitten</Modal.Title>
      </Modal.Header>
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => handleSubmit(e)}
        onReset={onReset}
      >
        <Modal.Body>
          <FormGroup>
            <FormLabel>Name:</FormLabel>
            <Form.Control name="nameField" required onChange={(e) => setName(e.target.value)} value={name} />
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Breed:</FormLabel>
            <Form.Control required onChange={(e) => setBreed(e.target.value)} value={breed} />
            <Form.Control.Feedback type="invalid">
              Please enter a breed.
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Age:</FormLabel>
            <Form.Control type="Number" required min={1} max={30} onChange={(e) => setAge(e.target.value)} value={age} />
            <Form.Control.Feedback type="invalid">
              Please enter an age from 1 to 30.
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Cuteness:</FormLabel>
            <Form.Control type="Number" required min={0} max={10} onChange={(e) => setCuteness(e.target.value)} value={cuteness} />
            <Form.Control.Feedback type="invalid">
              Please enter a level of cuteness from 0 to 10.
            </Form.Control.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCurrentKitten()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>

    </Modal>
  );
};

export default UpdateModal;

UpdateModal.propTypes = {
  currentKitten: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    cuteness: PropTypes.number.isRequired,
  }).isRequired,
  fetchKittens: PropTypes.func.isRequired,
  setCurrentKitten: PropTypes.func.isRequired,
};
