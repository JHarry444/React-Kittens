import {
  Button, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { context } from '../constants.json';

const KittenForm = ({ fetchKittens }) => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [cuteness, setCuteness] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        await axios.post(`${context}/create`, {
          name, breed, age, cuteness,
        });
        fetchKittens();
        setName('');
        setBreed('');
        setAge('');
        setCuteness('');
        setValidated(false);
        form.nameField.focus();
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
    <Form
      noValidate
      validated={validated}
      onSubmit={(e) => handleSubmit(e)}
      onReset={onReset}
    >
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
      <div className="mt-2">
        <Button type="submit" variant="primary" className="me-2">Submit</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
    </Form>
  );
};

export default KittenForm;

KittenForm.propTypes = {
  fetchKittens: PropTypes.func.isRequired,
};
