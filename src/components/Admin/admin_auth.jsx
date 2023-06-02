import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import API from "../../apis/admin";
import {
  LOGINADMIN
} from '../../reducer/authAdmin';

function AdminLogin() {
  const history = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      id:user.id,
      password:user.password,
    }
      const response =  await API.login(formData)
      console.log("data");
      console.log(response);
      if(response.message === 'Success')
      {
          // localStorage.setItem("investoruserID", data.data.refId);
          console.log("response.data");
          console.log(response.data);
          dispatch(LOGINADMIN(response.data))
          history('/admin');
          toast.success('Login Success!');
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
          {/* <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="text" placeholder="Email" name="email" required />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>
            <Button type="submit" variant="info" block >Login</Button>
            <div className="form-group text-center m-t-20">
              <a href="/">Go Back</a>
            </div>
          </Form> */}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="text" placeholder="UserId" name="email" onChange={e => setUser({ ...user, id: e.target.value })} required />
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

export default AdminLogin;
