import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function AdminDashboard() {
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
         this is Admin dashboard
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
