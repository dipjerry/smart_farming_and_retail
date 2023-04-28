import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Badge } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOGIN,
  LOGOUT,
} from '../../reducer/authUser';

function AdminDashboard() {

const myState = useSelector((state)=>state)
const dispatch = useDispatch()
console.log("myState");
console.log(myState);
console.log("dispatch");
console.log(dispatch);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBatch, setTotalBatch] = useState(0);
  const [cultivations, setCultivations] = useState([]);

   const navigate = useNavigate(); 

  useEffect(() => {
    // fetch data for totalUsers, totalBatch, and cultivations using API calls
    // and update the corresponding state variables
  }, []);

  function createCultivation() {
    // handle creating a new cultivation batch
  }
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const handleCreateBatchClick = () => setShowCreateBatchModal(true);
  const handleCreateUserClick = () => setShowCreateUserModal(true);
  return (
    <Container fluid>
      <Row className="bg-title">
        <Col lg={3} md={4} sm={4} xs={12}>
          <h4 className="page-title">Dashboard of {myState.authAdmin?.user}</h4>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          {myState.authAdmin.isAuthenticated?
          <Button
            // href="/admin/logout"
            onClick={() => dispatch(LOGOUT())}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Log out
          </Button>:
          <Button
            // href="/admin/logout"
            onClick={() => dispatch(LOGIN("jerry"))}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Log in
          </Button>
          }
        </Col>
      </Row>
      <Row>
        <Col lg={4} sm={6}>
          <div className="white-box">
            <h3 className="box-title">Users</h3>
            <ul className="list-inline two-part">
              <li>
                <i className="icon-user text-info"></i>
              </li>
              <li className="text-right">
                <span className="counter text-info">{totalUsers}</span>
              </li>
            </ul>
          </div>
        </Col>
        <Col lg={4} sm={6}>
          <div className="white-box">
            <h3 className="box-title">Total Roles</h3>
            <ul className="list-inline two-part">
              <li>
                <i className="icon-graduation text-purple"></i>
              </li>
              <li className="text-right">
                <span className="counter text-purple">{myState.count.value}</span>
              </li>
            </ul>
          </div>
        </Col>
        <Col lg={4} sm={6}>
          <div className="white-box">
            <h3 className="box-title">Total Batches</h3>
            <ul className="list-inline two-part">
              <li>
                <i className="icon-doc text-success"></i>
              </li>
              <li className="text-right">
                <span className="counter text-success">{totalBatch}</span>
              </li>
            </ul>
          </div>
        </Col>
        <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={()=>{navigate('statistics')}}>View Details</Button>
      </Row>

      <Row>
        <Col md={12}>
          <div
            className="alert alert-info"
            id="divOngoingTransaction"
            style={{ display: "none" }}
          >
            Ongoing Transaction: <span id="linkOngoingTransaction">None</span>{" "}
          </div>
        </Col>
      </Row>
      <Row>
  <Col md={12} lg={12} sm={12} xs={12}>
    <div className="white-box">
      <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={createCultivation}>Create Batch</Button>
      <h3 className="box-title">Batches Overview</h3>
      <div className="table-responsive">
        <div id="batchcontainer">
          <Table className="product-overview" id="adminCultivationTable">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>ADMIN</th>
                <th>Farm Inspector</th>
                <th>Harvester</th>
                <th>Exporter</th>
                <th>Importer</th>
                <th>Processor</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  </Col>
</Row>
<Row>
  <Col md={12} lg={4} sm={12}>
    <div className="white-box">
      <h3 className="box-title">User Roles</h3>
      <div className="table-responsive">
        <Table className="product-overview">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Role Slug</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Farm Inspection</td>
              <td><span className="label label-info font-weight-100">FARM_INSPECTION</span></td>
              <td>1</td>
            </tr>
            <tr>
              <td>Harvester</td>
              <td><span className="label label-success font-weight-100">HARVESTER</span></td>
              <td>1</td>
            </tr>
            <tr>
              <td>Exporter</td>
              <td><span className="label label-warning font-weight-100">EXPORTER</span></td>
              <td>1</td>
            </tr>
            <tr>
              <td>Importer</td>
              <td><span className="label label-danger font-weight-100">IMPORTER</span></td>
              <td>1</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td><span className="label label-primary font-weight-100">PROCESSOR</span></td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </Col>
    <Col md={12} lg={8} sm={12}>
     <div className="white-box">
      <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" id="userFormClick" onClick={() => $('#userFormModel').modal()}>Create User</Button>
      <h3 className="box-title">Users</h3>
      <div className="table-responsive" id="tblUserdiv">
        <Table className="table-responsive" id="tblUser">
          <thead>
            <tr>
              <th style={{width: '40%'}}>Name</th>
              <th style={{width: '20%'}}>Email</th>
              <th style={{width: '20%'}}>Contact No.</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          </Table>
          </div>
          </div>
          </Col>
          </Row>
      </Container>
  )
}

export default AdminDashboard