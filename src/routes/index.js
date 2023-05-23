import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Client from '../pages/Client';
import Clients from '../pages/Clients';
import Error from '../pages/Error';
import Login from '../pages/Login';
import Photos from '../pages/Photos';
import Register from '../pages/Register';

export default function Routes() {
  return (
      <Switch>
        <MyRoute exact path="/" component={Clients} isClosed={false} />
        <MyRoute exact path="/client/:id/edit" component={Client} isClosed />
        <MyRoute exact path="/client/" component={Client} isClosed />
        <MyRoute exact path="/photos/:id" component={Photos} isClosed />
        <MyRoute exact path="/login/" component={Login} isClosed={false} />
        <MyRoute exact path="/register/" component={Register} isClosed={false} />
        <MyRoute path="*" component={Error} />
      </Switch>
  );
}
