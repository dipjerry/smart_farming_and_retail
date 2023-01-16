import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserLogin() {
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login process
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
              <Form.Control type="text" placeholder="Email" name="email" required />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>
            <Button type="submit" variant="info" block href="/user_dashboard">Login</Button>
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
