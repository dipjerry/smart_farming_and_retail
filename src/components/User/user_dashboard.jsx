import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Row, Col, Image, Alert, Card, Tooltip, Modal , Form , Overlay , Popover , OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineDownload } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from "../../apis/product";
import UserAPI from "../../apis/users";
// import Select from 'react-select';
import QRCodeComponent from "./components/qrcode"
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

// const text = "Hi i am Jivan !";
  const [createBatch, setcreateBatchOpen] = useState(false);
  const [farmerModalOpen, setFarmerModalOpen] = useState(false);

  const [exporterModalOpen, setExporterModalOpen] = useState(false);
  const [exporterListModalOpen, setExporterListModalOpen] = useState(false);

  const [logisticSelectModal, setLogisticSelectModal] = useState(false);
  const [importerListModalOpen, setImporterListModalOpen] = useState(false);

  const [productPikupModalOpen, setProductPickupModalOpen] = useState(false);
  const [productDeliveryModalOpen, setProductDeliveryModalOpen] = useState(false);
  const [retailerModalOpen, setRetailerModalOpen] = useState(false);
  const [retailerListModalOpen, setRetailerListModalOpen] = useState(false);
  const [product, setProducts] = useState([]);
  const [logistic, setLogistic] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
// exporter
  const renderTooltipManufacturer = (props) => (
    <Popover id="popover-basic" {...props}>
       <Popover.Header as="h3">{props.customText.name}</Popover.Header>
    <Popover.Body>
    <div>
      <div>
        <label>Producer ID:</label>
        <span>{props.customText.producer.id}</span>
      </div>
      <div>
        <label>Product Price:</label>
        <span>{props.customText.product.price}</span>
      </div>
      <div>
        <label>Soil Type:</label>
        <span>{props.customText.producer.production_data.soil_type}</span>
      </div>
    </div>
          </Popover.Body>
          </Popover>
  );
  const renderTooltipExporter = (props) => (
    <Popover id="popover-basic" {...props}>
       <Popover.Header as="h3">{props.customText.name}</Popover.Header>
    <Popover.Body>
    <div>
      <div>
        <label>Exporter Id:</label>
        <span>{props.customText.exporter.id}</span>
      </div>
      <div>
        <label>exporter Price:</label>
        <span>{props.customText.product.price}</span>
      </div>
      <div>
        <label>Packaging:</label>
        <span>{props.customText.producer.production_data.soil_type}</span>
      </div>
    </div>
          </Popover.Body>
          </Popover>
  );

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');




  const [createProduct, setCreateProduct] = useState({
    name: "", price: "", quantity: "", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType , rawItems: []
  })

  // buy raw product handler
  const handleRawItemsChange = (e) => {
    console.log(selectedItems)
    const { options } = e.target;
    const selectedRawItems = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setCreateProduct((prevProduct) => ({ ...prevProduct, rawItems: selectedRawItems }));
    setSelectedItems(selectedRawItems);
  };

  // create product
  const handleCreateProductChange = (event) => {
    const { name, value } = event.target;
    setCreateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // handler
  const handleCreateProductSubmit = async (event) => {
    event.preventDefault();
    const res = await API.addProduct(createProduct);
    getProducts()
    setcreateBatchOpen(false);
    setCreateProduct({
      name: "", price: "", quantity: "", id: myState.authUser?.user,  loggedUserType: myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };




  // list product create
  const [listProduct, setListProduct] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const handleListProductChange = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // handler
  const handleListProductSubmit = async (event) => {
    event.preventDefault();
    listProduct.productId = selectedItem
    const res = await API.listProduct(listProduct);
    setFarmerModalOpen(false);
    getProducts()
    setListProduct({
      soilType: "", climate: "",productId:"", price: "", id: myState.authUser?.user, 
      loggedUserType: myState.authUser?.userType == "farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };


// list product exporter
  const [listProductExporter, setListProductExporter] = useState({
    packagingType: "", quantityPerPackage: "",packagingDate: 0, price:"", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const handleListProductExporter = (event) => {
    console.log("🚀 ~ file: user_dashboard.jsx:126 ~ handleListProductExporter ~ listProductExporter:", listProductExporter)
    const { name, value } = event.target;
    setListProductExporter((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // handler
  const handleListProductExporterSubmit = async (event) => {
    event.preventDefault();
    listProductExporter.productId = selectedItem
    const res = await API.listProduct(listProductExporter);
    getProducts()
    setExporterListModalOpen(false);
    setListProductExporter({
      packagingType: "", quantityPerPackage: "",packagingDate: 0, price:"", id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };

  // select logistic by importer

  const [logisticSelect, setlogisticSelect] = useState({
    logistic: "", preferredDeliveryDate: "" , deliveryType: "",price: 0,  id: myState.authUser?.user, userType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const handleSelectLogistic = (event) => {
    console.log("🚀 ~ file: user_dashboard.jsx:126 ~ handlelogisticSelect ~ logisticSelect:", logisticSelect)
    const { name, value } = event.target;
    setlogisticSelect((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSelectLogisticSubmit = async (event) => {
    event.preventDefault();
    logisticSelect.productId = selectedItem
    const res = await API.selectLogistic(logisticSelect);
    getProducts()
    setLogisticSelectModal(false);
    setlogisticSelect({
      logistic: "", preferredDeliveryDate: "" , deliveryType: "",price: 0,  id: myState.authUser?.user, userType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };
  
  



  const [logisticpickup, setLLogisticpickup] = useState({
    shipmentPickup: "" ,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })
  const selectLogisticPickup = (event) => {
    const { name, value } = event.target;
    setLLogisticpickup((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleLogisticPickup = async (event) => {
    event.preventDefault();
    logisticpickup.productId = selectedItem
    const res = await API.productPickup(logisticpickup);
    getProducts()
    setProductPickupModalOpen(false);
    setLLogisticpickup({
      shipmentPickup: "" ,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };


  const [logisticDelivery, setLogisticDelivery] = useState({
    shipmentDelivery: "" ,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const selectLogisticDekivery = (event) => {
    const { name, value } = event.target;
    setLogisticDelivery((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleLogisticDelivery = async (event) => {
    event.preventDefault();
    logisticDelivery.productId = selectedItem
    const res = await API.productDelivery(logisticDelivery);
    getProducts()
    setProductDeliveryModalOpen(false);
    setLLogisticDelivery({
      shipmentDelivery: "" ,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
    });
  };


  const [listProductImporter, setListProductImporter] = useState({
    price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  const selectListProductImporter = (event) => {
    const { name, value } = event.target;
    setListProductImporter((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleListProductImporterSubmit = async (event) => {
    event.preventDefault();
    listProductImporter.productId = selectedItem
    const res = await API.listProduct(listProductImporter);
    getProducts()
    setImporterListModalOpen(false);
    setListProductImporter({
      price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType

    });
  };  


// logistic pickup
  const [listProductRetailer, setListProductRetailer] = useState({
    climate: "", soilType: "",price: 0,  id: myState.authUser?.user, loggedUserType: myState.authUser?.userType == "Farmer" ? "manufacturer" : myState.authUser?.userType
  })

  

  

  
  
  const handleListProductRetailer = (event) => {
    const { name, value } = event.target;
    setListProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
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



  async function getProducts() {

    const formData = {
      key: myState.authUser?.userType=='manufacturer'?'producer':myState.authUser?.userType,
      role: myState.authUser?.userType,
      id: myState.authUser?.user
    }

    const res = await API.fetchbyrole(formData);
   
    setProducts(res.data?.success)
  }

  async function getLogistic() {
    console.log("🚀 ~ file: user_dashboard.jsx:369 ~ getLogistic ~ logistic:", logistic)
    if (logistic.length<=0) {
      const formData = {
        userType: myState.authUser?.userType === 'manufacturer' ? 'producer' : myState.authUser?.userType,
        type: 'logistic',
        id: myState.authUser?.user
      };
  
      try {
        const res = await UserAPI.fetchUserbyrole(formData);
        console.log('res.data:', res.data);
        setLogistic(res?.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }


  function viewChain(product) {
    dispatch(CURRENTCHAINUSER(product))
    navigate("/preview")
  }



  useEffect(() => {
    getProducts();
  }, []);

const text = "Hi i am Jivan !";
const shippingDate = "2023-06-22";

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
                      <IpfsImage hash={myState.authUser?.profilePic} onClick={()=>navigate('profile')} style={{ width: "6vw", height: "auto" , cursor:"pointer" }} className="img-fluid thumb-lg img-circle" alt="img" /> :
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
            <th>Importer</th>
            <th>Logistic</th>
            <th>Retailer</th>
            <th>test</th>
            <th>view</th>
          </tr>
        </thead>
        <tbody>
        {/* <QRCodeComponent/> */}
        {/* <tr> */}
        {product?.map((product) => (
      <tr key={product.Key}>
     
                    <td>{product.Record.id}</td>
                    {/* <td><span className="label label-success font-weight-100" onClick={() => setFarmerModalOpen(true)}>Completed</span></td> */}
                    
                    {/*  for farmer and cultivation */}
                    <td>
  {(() => {
    if (product.Record.producer.id) {
      if (product.Record.producer.status === 'Complete') {
        return (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltipManufacturer({ ...props, customText: product.Record })}
          >
            <span className="label label-success font-weight-100">Completed</span>
          </OverlayTrigger>
        );
      } else if (product.Record.status === 'Processing') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => { setFarmerModalOpen(true); setSelectedItem(product.Record.id) }}>Processing</span>
        );
      } else {
        return (
          <span className="label label-danger font-weight-100">Not Available</span>
        );
      }
    } else {
      return (
        <span className="label label-danger font-weight-100">Not Available</span>
      );
    }
  })()}
</td>
{/* for exporter */}
                          <td>
  {(() => {
    if (product.Record.exporter.id) {
      if (product.Record.exporter.status === 'Complete') {
        return (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltipExporter({ ...props, customText: product.Record })}
          >
            <span className="label label-success font-weight-100">
              Completed
            </span>
          </OverlayTrigger>
        );
      } else if (product.Record.status === 'Processing') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => { setExporterListModalOpen(true); setSelectedItem(product.Record.id) }}>
            Processing
          </span>
        );
      } else {
        return (
          <span className="label label-danger font-weight-100" onClick={() => { setExporterModalOpen(true); setSelectedItem(product.Record.id) }}>
            {product.Record.exporter.id}
          </span>
        );
      }
    } else {
      return (
        <span className="label label-danger font-weight-100">
          Not Available
        </span>
      );
    }
  })()}
</td>
{/* for importer */}
                         
  <td>
  {(() => {
    if (product.Record.importer.id) {
      if (product.Record.status === 'Available') {
        return (
          <span className="label label-success font-weight-100" onClick={() => setImporterModalOpen(true)}>
            Available
          </span>
        );
      } else if (product.Record.status === 'Processing') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => {setSelectedItem(product.Record.id); getLogistic(); setLogisticSelectModal(true); }}>
            Processing
          </span>
        );
      } else if (product.Record.status === 'Ordered') {
        return (
          <span className="label label-primary font-weight-100">
            Ordered
          </span>
        );
      } else if (product.Record.importer.status === 'recieved') {
        return (
          <span className="label label-info font-weight-100" onClick={() => {setSelectedItem(product.Record.id);  setImporterListModalOpen(true); }}>
            Received
          </span>
        );
      } else {
        return (
          <span className="label label-danger font-weight-100">
            {product.Record.exporter.id}
          </span>
        );
      }
    } else {
      return (
        <span className="label label-danger font-weight-100">
          Not Available
        </span>
      );
    }
  })()}
</td>

{/* for logistic */}
<td>
  {(() => {
    if (product.Record.logistic.id) {
      if (product.Record.logistic.status === 'delivered') {
        return (
          <span className="label label-success font-weight-100">
            Completed
          </span>
        );
      } 
      else if (product.Record.logistic.status === 'Processing') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => {setSelectedItem(product.Record.id); setProductPickupModalOpen(true)}}>
            waiting to pickup
          </span>
        );
      } 
      else if (product.Record.logistic.status === 'pickup') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => {setSelectedItem(product.Record.id); setProductDeliveryModalOpen(true)}}>
            Picked up
          </span>
        );
      } 
      else {
        return (
          <span className="label label-danger font-weight-100">
            {product.Record.logistic.id}
          </span>
        );
      }
    } 
    else if(product.Record.status === 'Ordered'){
      return (
        <span onClick={() => {setSelectedItem(product.Record.id); getLogistic(); setImporterListModalOpen(true); }} className="label label-danger font-weight-100">
          select logistic
        </span>
      );
    }
    else {
      return (
        <span className="label label-danger font-weight-100">
          select 
        </span>
      );
    }
  })()}
</td>





                            
                        
<td>
  {(() => {
    if (product.Record && product.Record.retailer && product.Record.retailer.id) {
      if (product.Record.status === 'Available') {
        return (
          <span className="label label-success font-weight-100" onClick={() => setRetailerModalOpen(true)}>
            Completed
          </span>
        );
      } else if (product.Record.status === 'Processing') {
        return (
          <span className="label label-warning font-weight-100" onClick={() => setNewRetailerProcessingStageModalOpen(true)}>
            Processing
          </span>
        );
      } else {
        return (
          <span className="label label-danger font-weight-100" onClick={() => setRetailerModalOpen(true)}>
            {product.Record.retailer.id}
          </span>
        );
      }
    } else {
      return (
        <span className="label label-danger font-weight-100" onClick={() => setRetailerModalOpen(true)}>
          Not Available
        </span>
      );
    }
  })()}
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
            as="select" // Use "select" to create a dropdown
            value={listProductExporter.packagingType}
            name="packagingType"
            onChange={handleListProductExporter}
            required
          >
            <option value="">Select Packaging Type</option>
            <option value="Bags">Bags</option>
            <option value="Crate">Crate</option>
            <option value="Cartons">Cartons</option>
          </Form.Control>
      </Form.Group>
      <Form.Group controlId="packagingDate">
        <Form.Label>Packaging Date</Form.Label>
        <Form.Control
          type="date"
          name="packagingDate"
          value={listProductExporter.packagingDate}
          onChange={handleListProductExporter}
          required
          />
      </Form.Group>
      <Form.Group controlId="quantityPerPackage">
        <Form.Label>Quantity per Package</Form.Label>
        <Form.Control
          type="number"
          name="quantityPerPackage"
          value={listProductExporter.quantityPerPackage}
          onChange={handleListProductExporter}
          required
        />
      </Form.Group>
      <Form.Group controlId="packagingMaterialsUsed">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={listProductExporter.price}
          onChange={handleListProductExporter}
          required
        />
      </Form.Group>
  
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExporterListModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="fifthModalForm" onClick={handleListProductExporterSubmit} >
            Save
          </Button>
          
        </Modal.Footer>

      </Modal>

      {/* importer  */}
     

            {/*  exporter */}
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

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setExporterModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="fifthModalForm" >
            Save
          </Button>
          
        </Modal.Footer>

      </Modal>



      {/* <Modal show={importerModalOpen}>
        <Modal.Header>
          <Modal.Title id="logistic_selector">Importer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group controlId="Logistic Selector">
        <Form.Label>Logistic Selector</Form.Label>
          <Form.Control
            as="select" // Use "select" to create a dropdown
            value={listProductExporter.packagingType}
            name="packagingType"
            onChange={handleListProductExporter}
            required
          >
            <option value="">Select Logistic</option>
            <option value="Bags">Bags</option>
            <option value="Crate">Crate</option>
            <option value="Cartons">Cartons</option>
          </Form.Control>
      </Form.Group>
      <Form.Group controlId="packagingDate">
        <Form.Label>Packaging Date</Form.Label>
        <Form.Control
          type="date"
          name="packagingDate"
          value={listProductExporter.packagingDate}
          onChange={handleListProductExporter}
          required
          />
      </Form.Group>
      <Form.Group controlId="quantityPerPackage">
        <Form.Label>Quantity per Package</Form.Label>
        <Form.Control
          type="number"
          name="quantityPerPackage"
          value={listProductExporter.quantityPerPackage}
          onChange={handleListProductExporter}
          required
        />
      </Form.Group>
      <Form.Group controlId="packagingMaterialsUsed">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={listProductExporter.price}
          onChange={handleListProductExporter}
          required
        />
      </Form.Group>
  
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setImporterModalOpen(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal> */}


{/* importer */}
      <Modal show={logisticSelectModal}>
        <Modal.Header>
          <Modal.Title id="farmerModelTitle">Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="selectedShipment">
    <Form.Label>Select Shipment</Form.Label>
    <Form.Control
      as="select"
      value={logisticSelect.logistic}
      name="logistic"
      // onChange={(e) => setSelectedShipment(e.target.value)}
      onChange={handleSelectLogistic}
      required
    >
      <option value="">Choose...</option>
      {logistic?.map((logistic) => (
        <option key={logistic.Key} value={logistic.Record.User_ID}>
          <IpfsImage hash={logistic.Record.profilePic} alt="img" />
          {logistic.Record.Name}
        </option>
      ))}
      {/* Add more shipment options as needed */}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="preferredDeliveryDate">
    <Form.Label>Preferred Delivery Date</Form.Label>
    <Form.Control
      type="date"
      value={logisticSelect.preferredDeliveryDate}
      name="preferredDeliveryDate"
      onChange={handleSelectLogistic}
      required
    />
  </Form.Group>
  <Form.Group controlId="shipmentType">
    <Form.Label>Shipment Type</Form.Label>

      <Form.Check
        type="radio"
        id="normalDelivery"
        label="Normal"
        value="normal"
        name="deliveryType"
        checked={logisticSelect.deliveryType === 'normal'}
        onChange={handleSelectLogistic}
      />
      <Form.Check
        type="radio"
        id="expressDelivery"
        label="Express"
        value="express"
        name="deliveryType"
        checked={logisticSelect.deliveryType === 'express'}
        onChange={handleSelectLogistic}
      />
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogisticSelectModal(false)}>
            Close
          </Button>
        <Button variant="primary" type="submit" form="fifthModalForm" onClick={handleSelectLogisticSubmit}>
            Save
          </Button>
          
        </Modal.Footer>
      </Modal>


      <Modal show={importerListModalOpen}>
        <Modal.Header>
          <Modal.Title id="exportModalTitle">List for sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group controlId="packagingMaterialsUsed">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={listProductImporter.price}
          onChange={selectListProductImporter}
          required
        />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setImporterListModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="fifthModalForm" onClick={handleListProductImporterSubmit} >
            Save
          </Button>
        </Modal.Footer>
      </Modal>



{/* importer update  */}

  {/* logistic form */}
  <Modal show={productPikupModalOpen}>
  <Modal.Header>
    <Modal.Title id="forthModalTitle">Logistic Pickup</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="d-flex align-items-center mb-3">
  <Button variant="danger" className="d-flex align-items-center">
    Download Shipping Label <AiOutlineDownload className="ms-1" />
  </Button>
  <Button className="d-flex align-items-center ms-3">
    View Shipping Label <AiOutlineDownload className="ms-1" />
  </Button>
</div>

    <Form>
      <Form.Group controlId="shipmentPickup">
        <Form.Check
          type="radio"
          label="Shipment Picked up"
          name="shipmentPickup"
          value="true"
          checked={logisticpickup.shipmentPickup === 'true'}
          onChange={selectLogisticPickup}
          required
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setProductPickupModalOpen(false)}>
      Close
    </Button>
    <Button variant="primary" type="submit" form="ForthModalForm" onClick={handleLogisticPickup}>
      Save
    </Button>
  </Modal.Footer>
</Modal>

  <Modal show={productDeliveryModalOpen}>
  <Modal.Header>
    <Modal.Title id="forthModalTitle">Logistic Pickup</Modal.Title>
  </Modal.Header>
  <Modal.Body>


    <Form>
      <Form.Group controlId="shipmentDelivery">
        <Form.Check
          type="radio"
          label="Shipment Delivery"
          name="shipmentDelivery"
          value="true"
          checked={logisticDelivery.shipmentDelivery === 'true'}
          onChange={selectLogisticDekivery}
          required
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setProductDeliveryModalOpen(false)}>
      Close
    </Button>
    <Button variant="primary" type="submit" form="ForthModalForm" onClick={handleLogisticDelivery}>
      Save
    </Button>
  </Modal.Footer>
</Modal>



      {/* // Fifth Modal */}
      <Modal show={retailerModalOpen}>
        <Modal.Header >
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

      {/* <QRCodeComponent text={text} shippingDate={shippingDate}  /> */}
      <QRCodeComponent
  price="19.99"
  manufacturingDate="2023-06-01"
  shippingDate="2023-06-10"
/>

    </Container>

  );
}

export default UserDashboard;
