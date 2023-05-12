import React from "react";
import {Button,  Row, Col } from 'react-bootstrap';
import {NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
  return (
    <Row className="bg-title px-5">
  <Col lg={4} md={4} sm={4} xs={12} className="justify-content-center d-flex align-items-center">
    <h4 className="page-title mb-0">Dashboard of {props?.data?.userName}</h4>
  </Col>
  <Col lg={4} md={4} sm={4} xs={6} className="d-flex justify-content-center align-items-center">
    <Button
      onClick={() => navigate('/user')}
      className="btn-info btn-rounded btn-outline px-3 py-2 hidden-xs hidden-sm waves-effect waves-light"
    >
      Home
    </Button>
  </Col>
  <Col lg={4} md={4} sm={4} xs={6} className="d-flex justify-content-end align-items-center">
    {props?.data?.isUserAuthenticated ?
      <Button
        onClick={() => { dispatch(LOGOUTUSER()); navigate('/'); }}
        className="btn-info btn-rounded btn-outline px-3 py-2 hidden-xs hidden-sm waves-effect waves-light mr-3"
      >
        Log out
      </Button> :
      <Button
        className="btn-info btn-rounded btn-outline px-3 py-2 hidden-xs hidden-sm waves-effect waves-light mr-3"
      >
        Log in
      </Button>
    }
  </Col>
</Row>


  );
};

export default Navbar;
