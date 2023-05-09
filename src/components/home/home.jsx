import React from 'react';
import { Container, Row,  Button , Image, Col } from 'react-bootstrap';
// import Glassmorphism from 'react-glassmorphism'
import '../../assets/css/style.css';
import './home.css';
import {Link, useNavigate} from 'react-router-dom';
// import strawberry from '../assets/plugins/images/strawberry-supplychain.png';

const WelcomePage = () => {
  const history = useNavigate();
  return (
    <div className="login-register ">
    <div className="login-box">
      
    <Container className="text-center glassmorphism ">
      <Row className="align-items-center h-100">
        <Col  className="mx-auto">
          <h3>Welcome to Strawberry Supply Chain</h3>
          {/* <p>Please choose your login option:</p> */}
        </Col>
      </Row>
      <Row className="align-items-center h-100">
        <Col className="mx-auto">
        <p>Please choose your login option:</p>
          <Button variant="primary" onClick={(e)=>{e.preventDefault ; history("/admin_auth")}}>Login as Admin</Button>
          <Button variant="info" onClick={(e)=>{e.preventDefault ; history("/user_auth")}}>Login as User</Button>
        </Col>
      </Row>
    </Container>
 
    </div>
    </div>
    // <section className="login-register">
    //   <div className="login-box">
    //     <div className="white-box">
    //       <div className="form-group text-center">
    //         <Col xs={12}>
    //           {/* <Image src={strawberry} style={{ width: '225px', height: '225px' }}/> */}
    //         </Col>
    //       </div>
    //       <div className="form-group  text-center">
    //         <Col xs={12}>
    //           <h4><b>Welcome to strawberry Supplychain</b></h4>
    //           <h6> Supplychain using hyperledger </h6>
    //         </Col>
    //       </div>
    //       <div className="form-group text-center">
    //         <Col xs={6} className="p-b-20">
    //         <Button variant="primary" block>
    //             <Link to='/admin_auth'>Admin Login</Link>
    //           </Button>
    //         </Col>
    //         <Col xs={6} className="p-b-20">
    //           <Button variant="info" block>
    //             <Link to='/user_auth'>User Login</Link>
    //           </Button>
    //         </Col>
    //         <Col xs={6} className="p-b-20">
    //           <Button variant="info" block>
    //             <Link to='/preview'>Sample Preview</Link>
    //           </Button>
    //         </Col>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default WelcomePage;
