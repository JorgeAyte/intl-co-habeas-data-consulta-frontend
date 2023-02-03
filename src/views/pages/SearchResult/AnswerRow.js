import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import {Check2, X} from 'react-bootstrap-icons';
import './SearchResult.scss';

class AnswerRow extends Component {

  AnswerInfo = (props) => {
    return <div className="d-flex justify-content-start ml-3 align-items-center">
        <div className={"grants-" + props.grant}>{props.grant ? <Check2 className={"grants-" + props.grant}/>: <X className={"grants-" + props.grant}/>}</div>
        <div className="ml-1">{props.grant ? 'Si': 'No'}</div>
    </div>
  }

  render() {
    return <Row className="mt-3">
      <Col sm={10} className="d-flex justify-content-start content-authorizations"><div className="d-flex align-items-center">{this.props.label}</div></Col>
      <Col sm={2} className="d-flex justify-content-start content-grants">
          <this.AnswerInfo grant={this.props.grant}/>
      </Col>
  </Row>
  }
}

export default AnswerRow;