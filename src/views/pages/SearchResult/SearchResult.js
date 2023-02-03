import React from 'react';
import './SearchResult.scss';
import {Col,Row,Card ,Image}  from 'react-bootstrap';
import ClientIcon from '../../../assets/images/ClientIcon.svg';
import IconAuthorizations from '../../../assets/images/IconAuthorizations.svg';
import AnswerRow from './AnswerRow'

const labels = {
    GrantA: "Cláusula de tratamiento de datos personales",
    GrantB: "Autorización de tratamiento de datos",
    GrantC: "Autorización para transferencia de datos",
    GrantD: "Autorización tratamiento de información financiera, comercial y crediticia"
};

class SearchResult  extends React.Component {

    fullName = () => {
        if(this.props?.FirstNameLegalRepresentative1){
            return `${this.props.BusinessName}`
        }
        return `${this.props.FirstName1} ${this.props.FirstName2} ${this.props.LastName1} ${this.props.LastName2}`
    }
    render(){
        return(
        <Col lg={12} className="px-xl-5">
            <div className=" m-auto  content-search-result">
                <h2> Resultado de tu consulta </h2>
                <Card>
                    <Card.Body>
                        <Row className="h-100 ">
                            <Col sm={3} className="h-100 info-client">
                                <Image src={ClientIcon}  /> <span>Cliente</span>
                                <p>{this.fullName()}</p>
                            </Col>
                            <Col sm={9}>
                                <Row>
                                    <Col sm={10} className="info-authorizations"><Image src={IconAuthorizations} /> <span>Autorizaciones</span></Col>
                                    <Col sm={2} className="d-flex justify-content-start info-grants"> <span >¿Aceptó?</span></Col>
                                </Row>

                                <AnswerRow grant={this.props.GrantA} label={labels.GrantA}/>
                                <AnswerRow grant={this.props.GrantB} label={labels.GrantB}/>
                                <AnswerRow grant={this.props.GrantC} label={labels.GrantC}/>
                                <AnswerRow grant={this.props.GrantD} label={labels.GrantD}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
       </Col>
        )
    }
}


export default SearchResult;
