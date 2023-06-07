import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register(props) {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const storedName = useSelector((state) => state.auth.user.name);
  const storedEmail = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { history } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setName(storedName);
    setEmail(storedEmail);
  }, [id, storedName, storedEmail]);

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

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('The password must be between 6 and 50 characters long.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, id, history }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Edit data' : 'Create a new account'}</h1>

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

        <button type="submit">{id ? 'Save changes' : 'Create account'}</button>
      </Form>
      <ToastContainer autoClose={3000}/>
    </Container>
  );
}

Register.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
