import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Col } from 'react-bootstrap';
import '../../assets/css/style.css';
// import strawberry from '../assets/plugins/images/strawberry-supplychain.png';

const WelcomePage = () => {
  return (
    <section className="login-register">
      <div className="login-box">
        <div className="white-box">
          <div className="form-group text-center">
            <Col xs={12}>
              {/* <Image src={strawberry} style={{ width: '225px', height: '225px' }}/> */}
            </Col>
          </div>
          <div className="form-group  text-center">
            <Col xs={12}>
              <h4><b>Welcome to strawberry Supplychain</b></h4>
              <h6> Supplychain using hyperledger </h6>
            </Col>
          </div>
          <div className="form-group text-center">
            <Col xs={6} className="p-b-20">
            <Button variant="primary" block>
                <Link to='/admin_auth'>Admin Login</Link>
              </Button>
            </Col>
            <Col xs={6} className="p-b-20">
              <Button variant="info" block>
                <Link to='/user_auth'>User Login</Link>
              </Button>
            </Col>
            <Col xs={6} className="p-b-20">
              <Button variant="info" block>
                <Link to='/preview'>Sample Preview</Link>
              </Button>
            </Col>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
