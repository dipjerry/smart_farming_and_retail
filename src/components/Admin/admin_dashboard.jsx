import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './admin_dashboard.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';
// import Form  from "react-bootstrap/Form";

function AdminDashboard() {
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login process
  }

  return (
        // { error !== '' && <Alert variant="danger">{error}</Alert> }
        <>
        {/* <Navbar bg="dark" variant="dark"> */}
        <Container className="justify-content-md-center">
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          {/* <Nav className="me-auto"> */}
            {/* <Nav.Link href="#home">User</Nav.Link>
            <Nav.Link href="#features">Roles</Nav.Link>
            <Nav.Link href="#pricing">Batches</Nav.Link> */}
            <Row className='rc'>
              <Col>User
              <br></br>
              <br></br>
              <a href="./usercount">Count</a>
              </Col>
              <Col>Roles
              <br></br>
              <br></br>
              <a href="./usercount">Count</a>
              </Col>
              <Col>Batches
              <br></br>
              <br></br>
              <a href="./usercount">Count</a>
              </Col>
            </Row>
          {/* </Nav> */}
        </Container>
      {/* </Navbar> */}
      {/* <br /> */}
      {/* <div class='batch'> */}
    <h1>batches</h1>
    <a href="./createbatch" className='cb'>CreateBatch</a>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Admin</th>
          <th>Tester</th>
          <th>farmer</th>
          <th>Distributer</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Statuses</td>
          <td>
          <a href="./Adminstatus">Status</a>
          </td>
          <td>
          <a href="./Testerstatus">Status</a>
          </td>
          <td>
          <a href="./Farmerstatus">Status</a>
          </td>
          <td>
          <a href="./Distributorstatus">Status</a>
          </td>
          <td>
          <i class="bi bi-eye-slash"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
        </svg>
          </td>
        </tr>
        
      </tbody>
    </Table>
    {/* </div> */}
    <Form.Select aria-label="Default select example" className='form'>
      <option>User Roles</option>
      <option value="1">Admin</option>
      <option value="2">Tester</option>
      <option value="3">farmer</option>
      <option value="4">Distributor</option>
    </Form.Select>
    <br></br>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Statuses</td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
          </td>
        </tr>
        
      </tbody>
    </Table>
    {/* <section className="login-register">
      <div className="login-box">
        {/* <div className="white-box">
          {/* <div className="text-center">
            {/* <img src={require("../assets/plugins/images/strawberry-supplychain.png")} style={{ width: '225px', height: '225px' }}/> */}
          {/* </div>  */}
         {/* this is Admin dashboard */}
        {/* </div>  */}
        
      {/* </div> */}
    {/* // </section> */} 
    <Container className='cu'>  
    <Row className="bg-secondary mt-5 p-5">  
      <Col>
      <h1 >Create User</h1>
      <a class="btn btn-primary" href="./createuser.html" role="button">Register</a>
      </Col>  
    </Row>  
  </Container>  
    </>
  );
}

export default AdminDashboard;
