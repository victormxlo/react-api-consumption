import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { ClientContainer, ProfilePicture, NewClient } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/clients');
      setClients(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/clients/${id}`);
      const newClients = [...clients];
      newClients.splice(index, 1);
      setClients(newClients);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('You need to login', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error('An error occurred while deleting the client', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Clients</h1>

      <NewClient to="/client/">New client</NewClient>

      <ClientContainer>
        {clients.map((client, index) => (
          <div key={String(client.id)}>
            <ProfilePicture>
              {get(client, 'Photos[0].url', false) ? (
                <img src={client.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{client.first_name}</span>
            <span>{client.email}</span>

            <Link to={`/client/${client.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/client/${client.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              onClick={(e) => handleDelete(e, client.id, index)}
              size={16}
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </ClientContainer>
    </Container>
  );
}
