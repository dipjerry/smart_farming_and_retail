import React from "react";
import {Button,  Row, Col } from 'react-bootstrap';
import {NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
  return (
    <Row className="bg-title">
        <Col lg={3} md={4} sm={4} xs={12}>
          <h4 className="page-title">Dashboard of {props?.data?.userName}</h4>
        </Col>
        <Col lg={3} md={4} sm={4} xs={12}>
          <Button
            onClick={() => navigate('/user')}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Home
          </Button>
        </Col>
        <Col lg={6} md={4} sm={4} xs={12}>
          {props?.data?.isUserAuthenticated?
          <Button
            // href="/admin/logout"
            onClick={() => { dispatch(LOGOUTUSER()); navigate('/'); }}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Log out
          </Button>:
          <Button
            // href="/admin/logout"
            // onClick={() => dispatch(LOGINADMIN("jerry"))}
            className="pull-right m-l-20 btn-info btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
          >
            Log in
          </Button>
          }
        </Col>
      </Row>
  );
};

export default Navbar;
