import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isFloat, isInt } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';

export default function Client({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const {photo, setPhoto} = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = axios.get(`/clients/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo);

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map(error => toast.error(error, { position: toast.POSITION.TOP_RIGHT }));
        history.push('/');
      }
    };

    getData();
  }, [id, setPhoto]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;

    if (firstName.length < 3 || firstName.length >= 255) {
      toast.error('The first name must be between 1 and 255 characters long.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (lastName.length < 3 || lastName.length >= 255) {
      toast.error('The last name must be between 1 and 255 characters long.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Invalid e-mail.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error('Invalid age.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Invalid weight.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('Invalid height.', {
        position: toast.POSITION.TOP_RIGHT
      });
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/clients/${id}`, {
          firstName,
          lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success('Client updated successfully.', { position: toast.POSITION.TOP_RIGHT });
      } else {
        const { data } = await axios.post(`/clients/`, {
          firstName,
          lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success('Client created successfully.', { position: toast.POSITION.TOP_RIGHT });
        history.push(`/client/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map(error => toast.error(error, { position: toast.POSITION.TOP_RIGHT }));
      } else {
        toast.error('Unknown error', { position: toast.POSITION.TOP_RIGHT });
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Edit client' : 'New client'}</Title>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt={firstName} />
          ) : (
            <FaUserCircle size={180}/>
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name"/>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name"/>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age"/>
        <input type="text" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight"/>
        <input type="text" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height"/>

        <button type="submit">Send</button>
      </Form>
    </Container>
  );
}

Client.propTypes = {
  match: PropTypes.shape({}).isRequired,
}
