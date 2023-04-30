import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from "../../apis/admin";
import {
  LOGIN
} from '../../reducer/authUser';

function UserLogin() {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const users = [
    {
      id: 'inspector',
      password: '1234',
      name: 'Inspector Hema',
      phoneNumber: '123456',
      roles: 'inspector'
    },
    {
      id: 'harvester',
      password: '1234',
      name: 'jivan',
      phoneNumber: '123456',
      roles: 'harvestor'
    },
    {
      id: 'exporter',
      password: '1234',
      name: 'jivan',
      phoneNumber: '1234',
      roles: 'importer'
    },
    {
      id: 'exporter',
      password: '1234',
      name: 'tajku',
      phoneNumber: '1234',
      roles: 'exporter'
    },
    {
      id: 'processor',
      password: '1234',
      name: 'dip',
      phoneNumber: '1234',
      roles: 'processor'
    }
  ];

  const [error, setError] = useState('');

  const login = (event) => {
    event.preventDefault();
    // Perform login process
   

    const foundUser = users.find(u => 
      u.id === user.id && 
      u.password === user.password
    );






    console.log(foundUser);
    console.log(foundUser.length);
    console.log(foundUser.id);
    if(foundUser.id === user.id) {
      dispatch({ type: 'LOGIN', payload: foundUser });
      history('/user_dashboard');
    } else {
      setError('Invalid id or password');
  }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      id:user.id,
      password:user.password,
    }
      const response =  await API.login(formData)
      console.log("data");
      console.log(response);
      console.log(response.status);
      if(response.message === 'Success')
      {
          // localStorage.setItem("investoruserID", data.data.refId);
          dispatch(LOGIN(response.data))
          history('/user');
      }
      // navigate("/otp", { state: { data:data.data }});
    
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
              <Form.Control type="text" placeholder="Email" name="email" onChange={e => setUser({ ...user, id: e.target.value })} required />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" onChange={e => setUser({ ...user, password: e.target.value })} required />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="info" block>Login</Button>
            </Form.Group>
            <div className="form-group btn btn-danger text-center m-t-20" onClick={(e)=>{history("/")}}>
              Go Back
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
