/* eslint-disable no-console */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import {
  Col,
  Container, Row,
} from 'react-bootstrap';
import KittenContainer from './components/KittenContainer';
import KittenForm from './components/KittenForm';
import { context } from './constants.json';
import UpdateModal from './components/UpdateModal';

function App() {
  const [kittens, setKittens] = useState([]);
  const [currentKitten, setCurrentKitten] = useState();

  const fetchKittens = async () => {
    try {
      const { data } = await axios.get(`${context}/getAll`);
      const fetchedKittens = data.map(({ createAt, updatedAt, ...rest }) => ({ ...rest }));
      setKittens(fetchedKittens);
      console.log('KITTENS FETCHED');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(fetchKittens, []);

  const deleteKitten = async (id) => {
    try {
      await axios.delete(`${context}/remove/${id}`);
      fetchKittens();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Kittens</h1>
      <Container>
        <Row>
          <Col className="col-4">
            <KittenForm fetchKittens={fetchKittens} />
          </Col>
          <Col className="col-8">
            <KittenContainer
              kittens={kittens}
              deleteKitten={deleteKitten}
              setCurrentKitten={setCurrentKitten}
            />
          </Col>
        </Row>
      </Container>
      {
        currentKitten && (
        <UpdateModal
          currentKitten={currentKitten}
          fetchKittens={fetchKittens}
          setCurrentKitten={setCurrentKitten}
        />
        )
      }
    </div>
  );
}

export default App;
