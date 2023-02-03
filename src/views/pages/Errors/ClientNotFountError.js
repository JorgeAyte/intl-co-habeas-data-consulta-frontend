import React from "react";
import "./ClientNotFountError.scss";
import { Modal, Image } from "react-bootstrap";
import IconCaution from "../../../assets/images/Caution.svg";
import { ArrowLeft } from "react-bootstrap-icons";

class ClientNotFountError extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.showError}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div className="icon-content">
              <Image src={IconCaution} />
            </div>
            <h2 className="title-error-client">{this.props.message.title}</h2>
            {this.props.message.message}
            <button className="btn-error-client" onClick={this.handleClose}>
              <ArrowLeft/> Regresar
            </button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ClientNotFountError;
