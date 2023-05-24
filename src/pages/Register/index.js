import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('The name must be between 1 and 255 characters long.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('The password must be between 6 and 50 characters long.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        name,
        email,
        password,
      });

      toast.success('User created successfully', {
        position: toast.POSITION.TOP_RIGHT
      });
      history.push('/login/');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map(error => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Create a new account</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"/>
        </label>

        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"/>
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password"/>
        </label>

        <button type="submit">Create account</button>
      </Form>
      <ToastContainer autoClose={3000}/>
    </Container>
  );
}
