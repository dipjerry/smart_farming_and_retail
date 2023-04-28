import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateUserModal(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [profileImage, setProfileImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="firstName">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="contactNo">
            <Form.Label>User Contact *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact number"
              required
              pattern="[0-9]{10,15}"
              value={contactNo}
              onChange={(event) => setContactNo(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>User Role *</Form.Label>
            <Form.Control
              as="select"
              required
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">Select role</option>
              <option value="FARMINSPECTOR">Farm Inspection</option>
              <option value="HARVESTOR">Harvester</option>
              <option value="EXPORTOR">Exporter</option>
              <option value="IMPORTOR">Importer</option>
              <option value="PROCESSOR">Processor</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>User Status</Form.Label>
            <br />
            <Form.Check
              inline
              type="radio"
              label="Active"
              name="status"
              value="ACTIVE"
              checked={status === 'ACTIVE'}
              onChange={(event) => setStatus(event.target.value)}
            />
            <Form.Check
              inline
              type="radio"
              label="Inactive"
              name="status"
              value="INACTIVE"
              checked={status === 'INACTIVE'}
              onChange={(event) => setStatus(event.target.value)}
              />
              </Form.Group>
              <FormGroup>
                <ControlLabel>Profile Image <span className="red">*</span></ControlLabel>
                <FormControl type="file" onChange={handleFileUpload} />
                <FormControl type="hidden" id="userProfileHashToUpdate" name="userProfileHash" placeholder="User Profile Hash" />
                <span id="imageHashToUpdate"></span>
              </FormGroup>
              <FormGroup id="updateimagePreview"></FormGroup>
              </Modal.Body>
              </Form>
              <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.updateFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
  );
}

export default pdateUserModal;