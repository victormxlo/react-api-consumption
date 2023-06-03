import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { ClientContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/clients');
      setClients(response.data);
    }

    getData();
  }, [])

  return (
    <Container>
      <Loading isLoading />

      <h1>Clients</h1>

      <ClientContainer>
        {clients.map(client => (
          <div key={String(client.id)}>
            <ProfilePicture>
              {get(client, 'Photos.url', false) ? (
                <img src={client.Photos.url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{client.first_name}</span>
            <span>{client.email}</span>

            <Link to={`/client/${client.id}/edit`}>
              <FaEdit size={16}/>
            </Link>

            <Link to={`/client/${client.id}/delete`}>
              <FaWindowClose size={16}/>
            </Link>
          </div>
        ))}
      </ClientContainer>
    </Container>
  );
}
