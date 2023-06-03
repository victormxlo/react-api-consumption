import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector(state => state.auth.isLoading);

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

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" />

        <button type="submit">Log-In</button>
      </Form>

    </Container>
  );
}
