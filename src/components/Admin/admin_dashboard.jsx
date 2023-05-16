import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Badge ,Modal } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import {AiFillDelete} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import API from "../../apis/admin";
import {
  LOGOUTADMIN,
  LOGINADMIN,
} from '../../reducer/authAdmin';
import Table1 from "../all/table";


function AdminDashboard() {
const myState = useSelector((state)=>state)
const dispatch = useDispatch()
const navigate = useNavigate(); 

const [addUser, setAddUserOpen] = useState(false);
const [totalUsers, setTotalUsers] = useState(0);
const [usersCount, setUserCount] = useState({});
const [totalBatch, setTotalBatch] = useState(0);
const [cultivations, setCultivations] = useState([]);
const [users, setUsers] = useState([]);
const [product, setProducts] = useState([]);
const [file, setFile] = useState(null);

const [createUser , setCreateUser] = useState({
  name: "",
  email: "",
  address: "",
  userType: "",
  password: "",
})

const columns = [
  {
    Header: "Index",
    // accessor: (row, index) => index + 1,
    accessor: 'Key',
  },
  {
    Header: 'Name',
    accessor: 'Record.Name',
  },
  {
    Header: 'Mode',
    accessor: 'Record.Email',
  },
  {
    Header: 'User Type',
    accessor: 'Record.User_Type',
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <AiFillDelete
        className="text-red-600"
        onClick={() => removeuser(row.original.Key)}
      />
    )
  }
  
];

{/* <td>{user?.Record?.Name}</td>
<td>{user?.Record?.Email}</td>
<td>{user?.Record?.Email}</td>
<td>{user?.Record?.User_Type}</td> */}

const handleInputChange = (event) => {
  const { name, value } = event.target;

  setCreateUser((prevUser) => ({
    ...prevUser,
    [name]: value,
  }));
};
const removeuser = (id) => {
alert(id);
};

async function getUser()
{
  const res = await API.fetchuser(myState.authAdmin?.admin);
  // console.log("users");
  // console.log(res);
  const userCounts = countUsersByType(res.data?.success);
  setUserCount(userCounts);
  setUsers(res.data?.success)  
}

function countUsersByType(users) {
  const counts = [];
  setTotalUsers(users.length); 
  users.forEach(user => {
    console.log(user)
    const userType = user.Record.User_Type;
    console.log(userType);
    counts[userType] = counts[userType] ? counts[userType] + 1 :1;
    console.log(counts[userType])
    console.log(counts)
  });
  return counts;
}

async function getProducts()
{
  const res = await API.fetchproduct(myState.authAdmin?.admin);
  // console.log("product");
  // console.log(res);
  setProducts(res?.data?.success)
  setTotalBatch(res?.data?.success?.length)
 
}

  useEffect(() => {
    getUser();
    getProducts();

  }, []);

  function createCultivation() {
    // handle creating a new cultivation batch
  }
  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const handleCreateBatchClick = () => setShowCreateBatchModal(true);
  const handleCreateUserClick = () => setShowCreateUserModal(true);

  const handleFile = (event) => {
    // const formData = new FormData();
    alert("hello");
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile)
    // setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    console.log("file")
    console.log(file)
    data.append("file", file);
    data.append("name", createUser.name);
    data.append("id", myState.authAdmin?.admin);
    data.append("email", createUser.email);
    data.append("address", createUser.address);
    data.append("userType", createUser.userType);
    data.append("password", createUser.password);

    const res = await API.createUserAdd(data);
    console.log(res);
    // navigate('/startup/profile/faq')
    setAddUserOpen(false);
 
    setCreateUser({
      name: "",
      email: "",
      address: "",
      userType: "",
  });
};


  return (
    <Container fluid>
      <Row className="bg-title">
        <Col lg={3} md={4} sm={4} xs={12}>
          <h4 className="page-title">Dashboard of {myState.authAdmin?.admin}</h4>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          {myState.authAdmin.isAdminAuthenticated?
          <Button
            // href="/admin/logout"
            onClick={() => {dispatch(LOGOUTADMIN()) ; navigate('/'); }}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Log out
          </Button>:
          <Button
            // href="/admin/logout"
            onClick={() => {dispatch(LOGINADMIN("jerry"))}}
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
      <Col lg={12} m={1}>
       <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={()=>{navigate('statistics')}}>View Details</Button>
      </Col>
      </Row>

    <Row>
        <Col md={12}>
          <div
            className="alert alert-info white-box"
            id="divOngoingTransaction"
            style={{display:'none'}}
          >
            Ongoing Transaction: <span id="linkOngoingTransaction">None</span>{" "}
          </div>
        </Col>
    </Row>
  <Row>
  <Col md={12} lg={12} sm={12} xs={12}>
      <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={createCultivation}>Create Batch</Button>
    <div className="white-box">
      <h3 className="box-title">Batches Overview</h3>
      <div className="table-responsive">
        <div id="batchcontainer">
          <Table className="product-overview" id="adminCultivationTable">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Farmer</th>
                <th>Exporter</th>
                <th>Importer</th>
                <th>Logistic</th>
                <th>Retail</th>
                <th>Status</th>
                <th>view</th>
              </tr>
            </thead>
            <tbody>
    {product?.map((product) => (
      <tr key={product.Key}>
        <td>{product.Record.name}</td>
        <td>{product.Record.producer?.id}</td>
        <td>{product.Record.importer?.id}</td>
        <td>{product.Record.logistics?.id}</td>
        <td>{product.Record.producer?.id}</td>
        {/* <td>{JSON.stringify(product.Record.product)}</td> */}
        <td>{product.Record.status}</td>
        <td>{product.Record.status}</td>
        <td>{product.Record.status}</td>
      </tr>
    ))}
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
              <td>Admin</td>
              <td><span className="label label-danger font-weight-100">Admin</span></td>
              <td>{usersCount?.admin}</td>
            </tr>
            <tr>
              <td>Farmer</td>
              <td><span className="label label-info font-weight-100">FARMER</span></td>
              <td>{usersCount?.manufacturer}</td>
            </tr>
            <tr>
              <td>exporter</td>
              <td><span className="label label-success font-weight-100">EXPORTER</span></td>
              <td>{usersCount?.exporter}</td>
            </tr>
            <tr>
              <td>Importer</td>
              <td><span className="label label-warning font-weight-100">IMPORTER</span></td>
              <td>{usersCount?.importer}</td>
            </tr>
            <tr>
              <td>Logistic</td>
              <td><span className="label label-danger font-weight-100">LOGISTIC</span></td>
              <td>{usersCount?.logistic}</td>
            </tr>
            <tr>
              <td>Retailer</td>
              <td><span className="label label-default font-weight-100">Retailer</span></td>
              <td>{usersCount?.retailer}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  </Col>
    <Col md={12} lg={8} sm={12}>
      <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" id="userFormClick" onClick={() => setAddUserOpen(true)}>Create User</Button>
     <div className="white-box">
      <h3 className="box-title">Users</h3>
      <div className="table-responsive" id="tblUserdiv">
      <Table1 data={users} columns={columns} />
        {/* <Table className="table-responsive" id="tblUser">
          <thead>
            <tr>
              <th >Index</th>
              <th >Name</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users?.map((user) => (
      <tr key={user.Key}>
        <td>{user?.Key}</td>
        <td>{user?.Record?.Name}</td>
        <td>{user?.Record?.Email}</td>
        <td>{user?.Record?.Email}</td>
        <td>{user?.Record?.User_Type}</td>
        <td>{<AiFillDelete className="text-red-600" onClick={()=>removeuser(user.Key)} />}</td>
       
      </tr>
    ))}
          </tbody>
          </Table> */}
          </div>
          </div>
          </Col>
          </Row>
          <Modal show={addUser} toggle={() => setAddUserOpen(false)} >
        <Modal.Header>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="name"
          value={createUser.name}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={createUser.email}
          onChange={handleInputChange}
          className="form-control"
          placeholder="name@domain.com"
          required
        />
      </div>
      {/* <div className="form-group">
        <label>Contact No</label>
        <input
          type="text"
          name="email"
          value={createUser.email}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Contact No"
          required
        />
      </div> */}
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={createUser.address}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Address"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={createUser.password}
          onChange={handleInputChange}
          className="form-control"
          placeholder="password"
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select
          name="userType"
          value={createUser.userType}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">Select Role</option>
          <option value="manufacturer">Farmer</option>
          <option value="exporter">Exporter</option>
          <option value="importer">Importer</option>
          <option value="logistic">Logistic</option>
          <option value="retailer">Retailer</option>
        </select>
        
      </div>
      <div className="form-group">
        <label>Profile Pic</label>
        <div className="form-group">
        {/* <label>Profile Pic</label> */}
        <input type="file" name="file" onChange={handleFile} />
      </div>

      </div>
    </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddUserOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
  Save changes
</Button>

        </Modal.Footer>

      {/* create a new batch  */}
      </Modal>
      </Container>
      
  )
}

export default AdminDashboard