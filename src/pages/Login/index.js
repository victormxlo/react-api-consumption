import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid e-mail.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Invalid password.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password }));
  }

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" />

        <button type="submit">Log-In</button>
      </Form>

    </Container>
  );
}
