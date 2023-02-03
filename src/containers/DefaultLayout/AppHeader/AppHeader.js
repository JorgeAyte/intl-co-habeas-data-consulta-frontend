import React, { Component } from 'react';
import logo from '../../../assets/images/logo_liberty.svg';
import {Navbar,Image }  from 'react-bootstrap';
import './AppHeader.scss';

class AppHeader extends Component {


  render(){
    return (
      <React.Fragment>
        <Navbar className="liberty-navbar p-lg-0" expand="lg">
          <Navbar.Brand className="m-auto m-lg-0"   >
              <Image src={logo}   width={100} height={100}  className="logo"/>
              <span className="line d-none d-lg-inline"></span> 
              <span className="title d-none d-lg-inline">
                 Formulario de autorización  de tratamiento de  datos personales
              </span>
          </Navbar.Brand>
        </Navbar>
        <div className="content-mobile d-lg-none"> <h5 className="">Formulario de autorización  de tratamiento de  datos personales</h5></div>
      </React.Fragment>
    )
  }
}

export default AppHeader;