import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function UserLogin() {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const users = [
    {
      username: 'inspector',
      password: '1234',
      name: 'Inspector Hema',
      phoneNumber: '123456',
      roles: 'inspector'
    },
    {
      username: 'harvester',
      password: '1234',
      name: 'jivan',
      phoneNumber: '123456',
      roles: 'harvestor'
    },
    {
      username: 'exporter',
      password: '1234',
      name: 'jivan',
      phoneNumber: '1234',
      roles: 'importer'
    },
    {
      username: 'exporter',
      password: '1234',
      name: 'tajku',
      phoneNumber: '1234',
      roles: 'exporter'
    },
    {
      username: 'processor',
      password: '1234',
      name: 'dip',
      phoneNumber: '1234',
      roles: 'processor'
    }
  ];

  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login process
   

    const foundUser = users.find(u => 
      u.username === user.username && 
      u.password === user.password
    );
    console.log(foundUser);
    console.log(foundUser.length);
    console.log(foundUser.username);
    if(foundUser.username === user.username) {
      dispatch({ type: 'LOGIN', payload: foundUser });
      history('/user_dashboard');
    } else {
      setError('Invalid username or password');
  }
  }

  return (
    <section className="login-register">
      <div className="login-box">
        { error !== '' && <Alert variant="danger">{error}</Alert> }
        <div className="white-box">
          <div className="text-center">
            {/* <img src={require("../assets/plugins/images/strawberry-supplychain.png")} style={{ width: '225px', height: '225px' }}/> */}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="text" placeholder="Email" name="email" onChange={e => setUser({ ...user, username: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" onChange={e => setUser({ ...user, password: e.target.value })} required />
            </Form.Group>
            <Button type="submit" variant="info" block>Login</Button>
            <div className="form-group text-center m-t-20">
              <a href="/">Go Back</a>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
