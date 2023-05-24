import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Row, Col, Image, Alert, Card, Modal , Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from "../../apis/product";
// import Select from 'react-select';

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
// import "modals/modals"
function UserDashboard() {
  const myState = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.isUserAuthenticated);
  const [selectedRawItems, setSelectedRawItems] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const [inventory, setInventory] = useState([
    {
      // logo: CompanyLogo3,
      id:1,
      name: "strawberry seed",
      price: 20,
      quantity: 10,
      index: 20,

    },
    {
      // logo: CompanyLogo3,
      id:2,
      name: "Watermellon seed",
      price: 20,
      quantity: 10,
      index: 20,

    },
    {
      // logo: CompanyLogo3,
      id:3,
      name: "Manure",
      price: 20,
      quantity: 10,
      index: 20,

    },
    
]);


  const [createBatch, setcreateBatchOpen] = useState(false);
  const [farmerModalOpen, setFarmerModalOpen] = useState(false);

  const [exporterModalOpen, setExporterModalOpen] = useState(false);
  const [exporterListModalOpen, setExporterListModalOpen] = useState(false);
  const [importerModalOpen, setImporterModalOpen] = useState(false);
  const [importerListModalOpen, setImporterListModalOpen] = useState(false);
  const [logisticModalOpen, setLogisticModalOpen] = useState(false);
  const [logisticDeliveredModalOpen, setLogisticDeliveredModalOpen] = useState(false);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);
  const [retailerListModalOpen, setRetailerListModalOpen] = useState(false);
  const [product, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("importer")
  const [orderQuantity, setOrderQuantity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
  console.log("exporter")
  const [packagingType, setPackagingType] = useState('');
  const [packagingDate, setPackagingDate] = useState('');
  const [quantityPerPackage, setQuantityPerPackage] = useState('');
  const [packagingMaterialsUsed, setPackagingMaterialsUsed] = useState('');
  console.log("Logistic")
  const [exporterName, setExporterName] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionLocation, setCollectionLocation] = useState('');
  const [shipmentReference, setShipmentReference] = useState('');
console.log("Retailer")
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [createProduct, setCreateProduct] = useState({
    name: "", price: "", quantity: "", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType , rawItems: []
  })
  const [listProduct, setListProduct] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })
  const [listProductExporter, setListProductExporter] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })
  const [listProductImporter, setListProductImporter] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })
  const [listProductLogistic, setListProductLogistic] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })
  const [listProductRetailer, setListProductRetailer] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const handleCreateProductChange = (event) => {
    const { name, value } = event.target;
    setCreateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleListProductChange = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleListProductExporter = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleListProductImporter = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleListProductLogistic = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleListProductRetailer = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleRawItemsChange = (e) => {
    console.log(selectedItems)
    const { options } = e.target;
    alert("hello")
    const selectedRawItems = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setCreateProduct((prevProduct) => ({ ...prevProduct, rawItems: selectedRawItems }));
    setSelectedItems(selectedRawItems);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedSelectedItems = selectedItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedSelectedItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updatedSelectedItems);
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
    setcreateBatchOpen(false);

    setCreateProduct({
      name: "", price: "", quantity: "", id: myState.authUser?.user,  loggedUserType: myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };

  const handleListProductSubmit = async (event) => {
    event.preventDefault();
    listProduct.productId = selectedItem
    const res = await API.listProduct(listProduct);
    setFarmerModalOpen(false);
    setListProduct({
      soilType: "", climate: "",productId:"", price: "", id: myState.authUser?.user, 
      loggedUserType: myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };

  async function getProducts() {

    const formData = {
      key: myState.authUser?.userType=='manufacturer'?'producer':myState.authUser?.userType,
      role: myState.authUser?.userType,
      id: myState.authUser?.user
    }

    const res = await API.fetchbyrole(formData);
   
    setProducts(res.data?.success)
  }
  function viewChain(product) {
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
                      <IpfsImage hash={myState.authUser?.profilePic} style={{ width: "6vw", height: "auto" }} className="img-fluid thumb-lg img-circle" alt="img" /> :
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
                <Button className="btn btn-info pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" onClick={()=>{navigate('details')}}>View Details</Button>
                <Classify/>
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
            <th>Logistic</th>
            <th>Importer</th>
            <th>Retailer</th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
        {/* <tr> */}
        {product?.map((product) => (
      <tr key={product.Key}>
     
                    <td>{product.Record.id}</td>
                    {/* <td><span className="label label-success font-weight-100" onClick={() => setFarmerModalOpen(true)}>Completed</span></td> */}
                          <td>
                            {product.Record.producer.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => {setFarmerModalOpen(true); setSelectedItem(product.Record.id)}}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => {setFarmerModalOpen(true); setSelectedItem(product.Record.id)}}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => {setFarmerModalOpen(true); setSelectedItem(product.Record.id)}}>{product.Record.exporter.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => {setFarmerModalOpen(true); setSelectedItem(product.Record.id)}}>Not Available</span>
                            }
                          </td>
                          <td>
                            {product.Record.exporter.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setExporterModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => setNewExporterProcessingStageModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() => setExporterModalOpen(true)}>{product.Record.exporter.id}</span>
                                )
                              ) :
                              <span className="label label-danger font-weight-100" onClick={() => setExporterListModalOpen(true)}>Not Available</span>
                            }
                          </td>
                         

                          <td>
                            {product.Record.logistics.id ?
                              (product.Record.status === 'Available' ?
                                <span className="label label-success font-weight-100" onClick={() => setLogisticModalOpen(true)}>Completed</span> :
                                (product.Record.status === 'Processing' ?
                                  <span className="label label-warning font-weight-100" onClick={() => ssetLogisticModalOpen(true)}>Processing</span> :
                                  <span className="label label-danger font-weight-100" onClick={() =>setLogisticModalOpen(true)}>{product.Record.logistics.id}</span>
                                )
                              ) :
                              <span onClick={() =>setLogisticModalOpen(true)} className="label label-danger font-weight-100">Not Available</span>
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
                              <span className="label label-danger font-weight-100" onClick={() => setImporterListModalOpen(true)}>Not Available</span>
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
          <Modal.Title>list Item for sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Climate</label>
              <input type="text" 
              className="form-control" 
              placeholder="Climate"
              name="climate" 
              onChange={handleListProductChange}
          value={listProduct.climate} 
              required />
            </div>
            <div className="form-group">
              <label>SoilType</label>
              <input type="text" className="form-control"
                 name="soilType" 
                 onChange={handleListProductChange}
             value={listProduct.soilType}
              placeholder="Soil Type" required />
            </div>
            <div className="form-group">
                          <label>Price</label>
              <input type="text" className="form-control" 
              name="price" 
              onChange={handleListProductChange}
          value={listProduct.price}

              placeholder="Price" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFarmerModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleListProductSubmit}>Save changes</Button>
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
        <input
          type="text"
          name="name"
          onChange={handleCreateProductChange}
          value={createProduct.name}
          className="form-control"
          placeholder="Name"
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          onChange={handleCreateProductChange}
          value={createProduct.quantity}
          className="form-control"
          placeholder="Quantity"
          required
        />
      </div>
      <div className="form-group">
        <label>Price of raw material</label>
        <input
          type="number"
          name="price"
          onChange={handleCreateProductChange}
          className="form-control"
          value={createProduct.price}
          placeholder="Price"
          required
        />
      </div>
      <div className="form-group">
        <label>Select Raw Items</label>
        <select
          name="rawItems"
          onChange={handleRawItemsChange}
          className="form-control"
        >
          {inventory.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {selectedItems.length > 0 && (
        <div className="selected-items">
          {selectedItems?.map((item) => (
            <div key={item.id} className="selected-item">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="quantity-input"
              />
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
                X
              </button>
            </div>
          ))}
        </div>
      )}
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setcreateBatchOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProductSubmit}>Save changes</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={exporterListModalOpen} toggle={() => setExporterListModalOpen(false)}>
        <Modal.Header>
          <Modal.Title id="exportModalTitle">Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group controlId="packagingType">
        <Form.Label>Packaging Type</Form.Label>
        <Form.Control
          type="text"
          value={packagingType}
          onChange={(e) => setPackagingType(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="packagingDate">
        <Form.Label>Packaging Date</Form.Label>
        <Form.Control
          type="date"
          value={packagingDate}
          onChange={(e) => setPackagingDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="quantityPerPackage">
        <Form.Label>Quantity per Package</Form.Label>
        <Form.Control
          type="number"
          value={quantityPerPackage}
          onChange={(e) => setQuantityPerPackage(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="packagingMaterialsUsed">
        <Form.Label>Packaging Materials Used</Form.Label>
        <Form.Control
          type="text"
          value={packagingMaterialsUsed}
          onChange={(e) => setPackagingMaterialsUsed(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExporterListModalOpen(false)}>
            Close
          </Button>
          
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
          
        </Modal.Footer>
      </Modal>

      <Modal show={importerListModalOpen}>
        <Modal.Header>
          <Modal.Title id="farmerModelTitle">Importer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group controlId="orderQuantity">
        <Form.Label>Order Quantity</Form.Label>
        <Form.Control
          type="number"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="deliveryAddress">
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="preferredDeliveryDate">
        <Form.Label>Preferred Delivery Date</Form.Label>
        <Form.Control
          type="date"
          value={preferredDeliveryDate}
          onChange={(e) => setPreferredDeliveryDate(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setImporterListModalOpen(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

      {/* // Forth Modal */}

      <Modal show={logisticModalOpen}>
        <Modal.Header>
          <Modal.Title id="forthModalTitle">Logistic Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form >
      <Form.Group controlId="exporterName">
        <Form.Label>Exporter Name</Form.Label>
        <Form.Control
          type="text"
          value={exporterName}
          onChange={(e) => setExporterName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="collectionDate">
        <Form.Label>Collection Date</Form.Label>
        <Form.Control
          type="date"
          value={collectionDate}
          onChange={(e) => setCollectionDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="collectionLocation">
        <Form.Label>Collection Location</Form.Label>
        <Form.Control
          type="text"
          value={collectionLocation}
          onChange={(e) => setCollectionLocation(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="shipmentReference">
        <Form.Label>Shipment Reference</Form.Label>
        <Form.Control
          type="text"
          value={shipmentReference}
          onChange={(e) => setShipmentReference(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
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
        <Form>
      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>
      
    </Form>
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
