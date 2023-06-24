import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/style.css';
import './home.css';

const WelcomePage = () => {
  const history = useNavigate();

  return (
    <div className="login-register">
      <div className="login-box">
        <Container className="text-center glassmorphism">
          <Row className="align-items-center">
            <Col>
              <h3>Welcome to Supply Chain</h3>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <p>Please choose your login option:</p>
              <Button variant="primary" onClick={() => history("/admin_auth")}>
                Login as Admin
              </Button>
              <Button variant="info" onClick={() => history("/user_auth")}>
                Login as User
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default WelcomePage;
