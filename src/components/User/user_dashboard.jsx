import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Row, Col, Image, Alert, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from "../../apis/product";
import slide from "../../assets/plugins/images/heading-bg/farmer2.jpg";
import userImg from "../../assets/plugins/images/users/user1.jpg";
import Classify from "../ML/service/classify2";
import {
  LOGOUTUSER,
  LOGINUSER, CURRENTCHAINUSER
} from '../../reducer/authUser';
import Navbar from "./components/nav";
import { IpfsImage } from 'react-ipfs-image';
import {FcInspection} from "react-icons/fc";
function UserDashboard() {
  const myState = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.isUserAuthenticated);


  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});

  //   const [showModal, setShowModal] = useState(false)

  //   const handleUpdateClick = () => setShowModal(true)
  //   const handleShow = () => setShow(true);
  //   const handleClose = () => setShow(false);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Perform login process
  //   }


  const [createBatch, setcreateBatchOpen] = useState(false);
  const [farmerModalOpen, setFarmerModalOpen] = useState(false);
  const [exporterModalOpen, setExporterModalOpen] = useState(false);
  const [importerModalOpen, setImporterModalOpen] = useState(false);
  const [logisticModalOpen, setLogisticModalOpen] = useState(false);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);
  const [product, setProducts] = useState([]);

  const [createProduct, setCreateProduct] = useState({
    name: "", price: "", quantity: "", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })


  function createCultivation() {
    // handle creating a new cultivation batch
  }

  const handleCreateProductChange = (event) => {
    const { name, value } = event.target;
    setCreateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleFile = (event) => {
  //   // const formData = new FormData();
  //   alert("hello");
  //   const selectedFile = event.target.files[0];
  //   setFile(selectedFile);
  //   console.log(selectedFile)
  //   // setFile(event.target.files[0]);
  // };
  const handleCreateProductSubmit = async (event) => {
    event.preventDefault();
    const res = await API.addProduct(createProduct);
    // console.log(res);
    // navigate('/startup/profile/faq')
    setcreateBatchOpen(false);

    setCreateProduct({
      name: "", price: "", quantity: "", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };

  async function getProducts() {
    const formData = {
      key: 'producer',
      role: myState.authUser?.userType,
      id: myState.authUser?.user
    }

    const res = await API.fetchbyrole(formData);
    // console.log("res");
    // console.log(res);
    setProducts(res.data?.success)
  }
  function viewChain(product) {
    // console.log("product");
    // console.log(product);
    dispatch(CURRENTCHAINUSER(product))
    navigate("/preview")
  }



  useEffect(() => {
    getProducts();
  }, []);


  return (
    <Container fluid>
      {/* <Navbar data={myState.authUser} /> */}
      <Row>
        <Col md={12}>
          <Alert variant="info" id="divOngoingTransaction" style={{ display: 'none' }}>
            Ongoing Transaction: <span id="linkOngoingTransaction">None</span>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={12}>
          <Card className="white-box" >
            <div className="user-bg" style={{ height: "fit-content" }}>
              <Image src={slide} alt="user" fluid />
              <div className="overlay-box">
                <div className="user-content">
                  <div className='flex justify-center'>
                    {myState.authUser?.profilePic ?
                      <IpfsImage hash='myState.authUser?.profilePic' /> :
                      <Image src={userImg} id="userImage" style={{ width: "6vw", height: "auto" }} className="img-fluid thumb-lg img-circle" alt="img" />
                    }
                  </div>
                  <h4 className="text-white" id="userName">{myState.authUser?.userName}</h4>
                  <h5 className="text-white" id="currentUserAddress">{myState.authUser?.userName}</h5>
                </div>

              </div>

            </div>

            <Card.Body className="user-btm-box">
              <Row>
                <Col md={3} sm={6} xs={12} className="text-center">
                  <p className="text-purple"><i className="fa fa-mobile"></i> Contact No</p>
                  <h5 id="userContact">{user?.phoneNumber}</h5>
                </Col>
                <Col md={3} sm={6} xs={12} className="text-center">
                  <p className="text-blue"><i className="fa fa-user"></i> Role</p>
                  <h5 id="userRole">{myState.authUser?.userType}</h5>
                </Col>
                {/* <Col md={2} sm={2} className="text-center"> */}
                {/* <p className="text-danger"><i className="fa fa-gears"></i> Settings</p> */}
                {/* <a className="btn btn-info m-l-20 black btn-rounded  hidden-xs hidden-sm waves-effect waves-light" id="editUser" onClick={() => setFirstModalOpen(true)}><i className="fa fa-gears"></i> Settings</a>
                  </Col> */}
                <Col md={6} sm={12} xs={12} className="text-center">
                  <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={() => navigate("explorar")}>Explorar</Button>
                  <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={() => setcreateBatchOpen(true)}>Create Batch</Button>
                  <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={() => { navigate('statistics') }}>View Details</Button>
                  <Classify />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table striped bordered hover className="product-overview" id="userCultivationTable">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Farmer</th>
                        <th>Exporter</th>
                        <th>Importer</th>
                        <th>Logistic</th>
                        <th>Retailer</th>
                        <th>Inspect</th>
                        <th>view</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr> */}
                      {product?.map((product) => (
                        <tr key={product.Key}>
                          {console.log(product.Record)}
                          <td>{product.Record.id}</td>
                          <td>
                            {product.Record.producer.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setFarmerModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => setNewProcessingStageModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => setFarmerModalOpen(true)}>{product.Record.producer.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => setFarmerModalOpen(true)}>Not Available</span>
                            }
                          </td>
                          {/* <span className="label label-success font-weight-100" onClick={() => setFarmerModalOpen(true)}>Completed</span></td> */}

                          {/* <td><span className="label label-warning font-weight-100"onClick={() => setExporterModalOpen(true)}>Processing</span> </td>
                    <td><span className="label label-danger font-weight-100" onClick={() => setLogisticModalOpen(true)}>Not Available</span> </td>
                    <td><span className="label label-danger font-weight-100" onClick={() => setImporterModalOpen(true)}>Not Available</span> </td>
                    <td><span className="label label-danger font-weight-100" onClick={() => setRetailerModalOpen(true)}>Not Available</span> </td> */}
                          <td>
                            {product.Record.exporter.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setExporterModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => setNewExporterProcessingStageModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => setExporterModalOpen(true)}>{product.Record.exporter.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => setExporterModalOpen(true)}>Not Available</span>
                            }
                          </td>
                          <td>
                            {product.Record.importer.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setImporterModalOpen(true)}>Available</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => setNewImporterProcessingStageModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => setImporterModalOpen(true)}>{product.Record.importer.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => setImporterModalOpen(true)}>Not Available</span>
                            }
                          </td>

                          <td>
                            {product.Record.logistics.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setLogisticModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => ssetLogisticModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() =>{alert("hello"); setLogisticModalOpen(true)}}>{product.Record.logistics.id}</span>
                                )
                              ) :
                              <span onClick={() =>{alert("hello"); setLogisticModalOpen(true)}} className="label label-danger font-weight-100">Not Available</span>
                            }
                          </td>
                          <td>
                            {product.Record?.retailer?.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setRetailerModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => setNewRetailerProcessingStageModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => setRetailerModalOpen(true)}>{product.Record.retailer.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => setRetailerModalOpen(true)}>Not Available</span>
                            }
                          </td>
                          <td><Classify /></td>
                          <td onClick={() => { viewChain(product.Record) }}><FontAwesomeIcon icon={faEye} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col></Row>


      <Modal show={farmerModalOpen} toggle={() => setFarmerModalOpen(false)} >
        <Modal.Header>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Climate</label>
              <input type="text" className="form-control" placeholder="Climate" required />
            </div>
            <div className="form-group">
              <label>SoilType</label>
              <input type="text" className="form-control" placeholder="Soil Type" required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control" placeholder="Price" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFarmerModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>

        {/* create a new batch  */}
      </Modal>
      <Modal show={createBatch} toggle={() => setcreateBatchOpen(false)} >
        <Modal.Header>
          <Modal.Title>Create Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name='name' onChange={handleCreateProductChange} value={createProduct.name} className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name='quantity' onChange={handleCreateProductChange} value={createProduct.quantity} className="form-control" placeholder="Quantity" required />
            </div>
            <div className="form-group">
              <label>Price of raw material</label>
              <input type="number" name='price' onChange={handleCreateProductChange} className="form-control" value={createProduct.price} placeholder="Price" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setcreateBatchOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProductSubmit}>Save changes</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={exporterModalOpen} toggle={() => setExporterModalOpen(false)}>
        <Modal.Header>
          <Modal.Title id="exportModalTitle">Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="form-group">
              <label>Select Logistic</label>
              <input type="text" name='name' onChange={handleCreateProductChange} value={createProduct.name} className="form-control" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label>Estimate date</label>
              <input type="date" name='quantity' onChange={handleCreateProductChange} value={createProduct.quantity} className="form-control" placeholder="Quantity" required />
            </div>
            {/* <div className="form-group">
              <label>Price of raw material</label>
              <input type="number" name='price' onChange={handleCreateProductChange} className="form-control" value={createProduct.price} placeholder="Price" required />
            </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExporterModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="farmInspectionForm" >
            Save
          </Button>
        </Modal.Footer>

      </Modal>

      <Modal show={importerModalOpen}>
        <Modal.Header>
          <Modal.Title id="farmerModelTitle">Importer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="farmerForm">
            {/* your form fields here */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setImporterModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="farmInspectionForm" >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* // Forth Modal */}

      <Modal show={logisticModalOpen}>
        <Modal.Header>
          <Modal.Title id="forthModalTitle">Logistic Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form id="harvestorForm">
            {/* <fieldset style="border:0;"> */}
            <div class="form-group">
              <input type="hidden" class="form-control" id="BatchId" name="BatchId"
                placeholder="Batch Id" data-parsley-required="true" />
            </div>
            <div class="form-group">
              <input type="hidden" class="form-control" id="previoushandler"
                name="previoushandler" placeholder="Previous Handler"
                data-parsley-required="true" />
            </div>
            <div class="form-group">
              <input type="hidden" class="form-control" id="currenthandler" name="currenthandler"
                placeholder="Current Handler" data-parsley-required="true" />
            </div>
            <div class="form-group">
              <label class="control-label" for="Strawberryvariety">Strawberry Variety</label>
              <input type="text" class="form-control" id="Strawberryvariety" name="Strawberryvariety"
                placeholder="Strawberryvariety" data-parsley-required="true" />
            </div>
            <div class="form-group">
              <label class="control-label" for="temprature">Temprature</label>
              <input type="text" class="form-control" id="temprature" name="temprature"
                placeholder="Temprature" data-parsley-required="true" />
            </div>
            <div class="form-group">
              <label class="control-label" for="humidity">Humidity</label>
              <input type="text" class="form-control" id="humidity" name="Humidity"
                placeholder="Humidity" data-parsley-required="true" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogisticModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="ForthModalForm" >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // Fifth Modal */}
      <Modal show={retailerModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title id="fifthModalTitle">Retailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="fifthModalForm">
            {/* your form fields here */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setRetailerModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="fifthModalForm" >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

  
   


    </Container>
  );
}

export default UserDashboard;
