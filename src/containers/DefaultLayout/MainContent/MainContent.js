import React, { Component } from "react";
import { Container} from "react-bootstrap";
import './MainContent.scss';
import {Row} from 'react-bootstrap';
import {authTokenRequest, searchClientById}  from '../../../api/Rest';

import SeachClient from '../../../views/pages/SearchClient/SearchClient';
import SearchResult from '../../../views/pages/SearchResult/SearchResult';
import ClientNotFountError from '../../../views/pages/Errors/ClientNotFountError';
import Loading from '../../../views/loading/Loading';

const DEBUG = (process.env.NODE_ENV === 'development');

const messages = {
  NOT_FOUND: {
    title: 'Cliente no encontrado',
    message: (
      <React.Fragment>
        <p className="message-error-client">La búsqueda que has realizado <br/> no nos ha traido datos. Intenta de nuevo</p>
      </React.Fragment>
    )
    
  },
  NOT_COMPLETED: {
    title: 'Formulario no diligenciado',
    message: (
      <React.Fragment>
        <p className="message-error-client">La búsqueda que has realizado encontró a un usuario que aún no ha respondido el formulario</p>
      </React.Fragment>
    )

  },
  ERROR: {
    title: 'Error',
    message: (
    <React.Fragment>
      <p className="message-error-client" >Se ha presentado un error inesperado. Por favor intenta de nuevo</p>
    </React.Fragment>
    )
  }
};

class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: "",
      showError: false,
      message: messages.ERROR,
      client: null
    };
  }

  fetchAuthToken = async () => {
    try {
      const authTokenResponse = await authTokenRequest();
      this.setState({ accessToken: authTokenResponse.data.access_token });
    } catch (error) {
      this.toogleLoader(false);
    }
  };

  searchClientValidate  = async (data) => {

    this.toogleLoader(true);
    try {
      this.setState({client: null});
      await this.fetchAuthToken();
      const searchClientResponse = await searchClientById(this.state.accessToken, data.documentType, data.documentNumber);

      if (!searchClientResponse || !("data" in searchClientResponse)) {
        this.setState({showError: true, message: messages.NOT_FOUND});
        return;
      }

      if (DEBUG) console.log("searchClientResponse data" + JSON.stringify(searchClientResponse.data));

      if ("Error" in searchClientResponse.data) {
        this.setState({showError: true, message: messages.NOT_FOUND});
        return;
      }

      if (!("Result" in searchClientResponse.data)) {
        this.setState({showError: true, message: messages.NOT_FOUND});
        return;
      }

      if (!searchClientResponse.data.Result.Completed) {
        this.setState({showError: true, message: messages.NOT_COMPLETED});
        return;
      }

      if (searchClientResponse.data.Result.Completed) {
        this.setState({client: searchClientResponse.data.Result})
        return;
      }
    }
    catch (error) {
      console.error(error);
      this.setState({showError: true, message: messages.NOT_FOUND});
    } finally {
      this.toogleLoader(false);
    }
  }

  toogleLoader = (show) => {
    this.setState({ isLoading: show });
  };

  handleClose = () => {
    this.setState({showError:false, client: null});
  }

  render() {
    let searchResult = this.state.client ? <SearchResult {...this.state.client} /> : null;
    let error = this.state.showError ? <ClientNotFountError {...this.state} handleClose={this.handleClose} /> : null;

    return (
      <React.Fragment>
        <Container fluid>
            <Row className={this.state.isLoading ? 'content-loader ml-0' : 'd-none'}>
              {this.state.isLoading ? <Loading /> : null}
            </Row>
            <Row className={this.state.isLoading ? 'd-none' : '' }>
               <SeachClient searchClientValidate = {(data) => this.searchClientValidate(data)}  />
               {searchResult}
               {error}
            </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MainContent;
