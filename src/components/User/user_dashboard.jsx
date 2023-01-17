import React, { useState } from 'react';
import { Table , Container, Button,  Row, Col, Image, Alert , Card , Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function UserDashboard() {
    const user = useSelector(state => state.user);
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  console.log(user);

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
//   const [user, setUser] = useState({});
//   const [showModal, setShowModal] = useState(false)

//   const handleUpdateClick = () => setShowModal(true)
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform login process
//   }


const [firstModalOpen, setFirstModalOpen] = useState(false);

  // State for second modal
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  // State for third modal
  const [thirdModalOpen, setThirdModalOpen] = useState(false);

  return (
    <Container fluid>
      <Row className="bg-title">
        <Col lg={3} md={4} sm={4} xs={12}>
          <h4 className="page-title">Dashboard</h4>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          <a href="/" className="pull-right btn btn-info m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light">Log out</a>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Alert variant="info" id="divOngoingTransaction" style={{display: 'none'}}>
            Ongoing Transaction: <span id="linkOngoingTransaction">None</span>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={12}>
          <Card className="white-box">
            <div className="user-bg">
              <Image src="../../assets/plugins/images/heading-bg/slide3.jpg" alt="user" fluid />
              <div className="overlay-box">
                <div className="user-content">
                  {/* <a href="javascript:void(0)"> */}
                    <Image src="" id="userImage" className="thumb-lg img-circle" alt="img" />
                  {/* </a> */}
                  <h4 className="text-white" id="userName">--</h4>
                  <h5 className="text-white" id="currentUserAddress">--</h5>
                </div>
              </div>
            </div>
            <Card.Body className="user-btm-box">
              <Row>
                <Col md={4} sm={4} className="text-center">
                  <p className="text-purple"><i className="fa fa-mobile"></i> Contact No</p>
                  <h1 id="userContact">{user.phoneNumber}</h1>
                </Col>
                <Col md={4} sm={4} className="text-center">
                  <p className="text-blue"><i className="fa fa-user"></i> Role</p>
                  <h1 id="userRole">{user.roles}</h1>
                </Col>
                <Col md={4} sm={4} className="text-center">
                  <p className="text-danger"><i className="fa fa-gears"></i> Settings</p>
                  <a className="btn btn-info m-l-20 black btn-rounded  hidden-xs hidden-sm waves-effect waves-light" id="editUser" onClick={() => setFirstModalOpen(true)}>Edit</a>
                  </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Table striped bordered hover className="product-overview" id="userCultivationTable">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>ADMIN</th>
            <th>Farm Inspector</th>
            <th>Harvester</th>
            <th>Exporter</th>
            <th>Importer</th>
            <th>Processor</th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
        <tr>
                   <td>3kmsdj3</td>
                   
                    <td><span className="label label-success font-weight-100">Completed</span></td>
                    <td><span className="label label-success font-weight-100">Completed</span></td>
                    <td><span className="label label-success font-weight-100">Completed</span></td>
                    <td><span className="label label-warning font-weight-100">Processing</span> </td>
                    <td><span className="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span className="label label-danger font-weight-100">Not Available</span> </td>
                     <td><a href='/preview' onClick="view('` + batchid + `')"><FontAwesomeIcon icon={faEye} /></a></td>
                     {/* <td><FontAwesomeIcon icon={faEye} /></td> */}
                    </tr>
        </tbody>
      </Table>
                    </Col>
                  </Row>
                  </Card.Body>
                  </Card>


                  </Col></Row>
                  
                  
        <Modal show={firstModalOpen} toggle={() => setFirstModalOpen(false)} >
        <Modal.Header toggle={() => setFirstModalOpen(false)} closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label>Contact No</label>
              <input type="text" className="form-control" placeholder="Contact No" required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" disabled>
                <option>Select Role</option>
                <option>Farm Inspection</option>
                <option>Harvester</option>
                <option>Exporter</option>
                <option>Importer</option>
                <option>Processor</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFirstModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={secondModalOpen} toggle={() => setSecondModalOpen(false)} >
  <Modal.Header closeButton>
    <Modal.Title id="farmInspectionModelTitle">Farm Inspection</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form id="farmInspectionForm">
    {/* your form fields here */}
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" toggle={() => setSecondModalOpen(false)}>
      Close
    </Button>
    <Button variant="primary" type="submit" form="farmInspectionForm" >
      Save
    </Button>
  </Modal.Footer>
</Modal>

                  </Container>
  );
}

export default UserDashboard;
