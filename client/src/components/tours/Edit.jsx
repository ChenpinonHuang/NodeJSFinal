import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';



const Edit = function (props) {

  const id = props.location.state.id;

  const [inputs, setInputs] = useState({
    destination: '',
    price: '',
    status: 'available'
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const toursResp = await Axios.get(`/api/tours/${id}`);
      if (toursResp.status === 200) setInputs(toursResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/tourss/update', inputs);

      if (resp.status === 200)  {
        toast("The tours was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the tours", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the tours", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/tours"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Tour</h1>
      </header>

      <hr/>

      <div>
        <Form onClick={handleSubmit}>
          <Form.Group>
            <Form.Label>destination:</Form.Label>
            <Form.Control
              name="destination"
              onChange={handleInputChange}
              value={inputs.destination}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tour Type:</Form.Label>
            <Form.Control
              as="select"
              name="tourType"
              onChange={handleInputChange}
              defaultValue={inputs.tourType}
            >
              {tourTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Group Size:</Form.Label>
            <Form.Control
              type="number"
              name="groupSize"
              step="1"
              min="1"
              max="10"
              onChange={handleInputChange}
              value={inputs.groupSize}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleInputChange}
              value={inputs.date}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;