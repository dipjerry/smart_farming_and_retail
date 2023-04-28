import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

function UserFormModel(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <ControlLabel>First Name *</ControlLabel>
              <FormControl type="text" placeholder="First Name" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Last Name *</ControlLabel>
              <FormControl type="text" placeholder="Last Name" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email Id *</ControlLabel>
              <FormControl type="email" placeholder="Email Id" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>User Contact *</ControlLabel>
              <FormControl type="text" placeholder="Contact No." pattern="[0-9]{10,15}" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Address *</ControlLabel>
              <FormControl as="textarea" placeholder="Address" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>User Role *</ControlLabel>
              <FormControl as="select" required>
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="FARMINSPECTOR">Farm Inspection</option>
                <option value="HARVESTOR">Harvester</option>
                <option value="EXPORTOR">Exporter</option>
                <option value="IMPORTOR">Importer</option>
                <option value="PROCESSOR">Processor</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password *</ControlLabel>
              <FormControl type="password" placeholder="Password" minLength={6} required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Confirm Password *</ControlLabel>
              <FormControl type="password" placeholder="Confirm Password" required />
            </FormGroup>
            <FormGroup>
              <ControlLabel>User Status</ControlLabel>
              <FormControl type="checkbox" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Profile Image *</ControlLabel>
              <FormControl type="file" />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserFormModel;
