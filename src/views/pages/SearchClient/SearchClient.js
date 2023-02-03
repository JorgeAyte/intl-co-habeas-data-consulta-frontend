import React, { Component } from "react";
import "./SearchClient.scss";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InfoCircle } from "react-bootstrap-icons";

const SearchSchemaForm = Yup.object().shape({
  documentNumber: Yup.string()
    .required("El número documento es requerido")
    .matches(/^[A-Za-z0-9 ]*$/, 'Este campo no debe contener caracteres especiales')
    .max(20,'máximo 20 caracteres'),
  documentType: Yup.string().required("El tipo de documento es requerido"),
});

class SearchClient extends Component {

  handleSubmit = (value, { resetForm, setIni }) => {
    this.props.searchClientValidate(value);
    resetForm({ documentType: "" });
  };
  
  render() {

    return (
      <Col sm={12}>
        <div className="w-50 m-auto content-search-client">
          <h1>Información del cliente </h1>
          <p>Busca los datos del cliente y valida la Información</p>
          <Formik
            initialValues={{documentType: "", documentNumber: ""}}
            validationSchema={SearchSchemaForm}
            onSubmit={this.handleSubmit}
          >
            {({ errors, touched, values, handleChange, resetForm }) => (
              <Form className="m-auto form-search-client">
                <Row className="px-xl-5">
                  <Col className="form-group">
                    <Field
                      as="select"
                      name="documentType"
                      className={((errors.documentType && touched.documentType)) ? 'form-control input-invalid ' : 'form-control'} >
                      <option value="" >Tipo de identificación</option>
                      <option value="36">CEDULA DE CIUDADANIA</option>
                      <option value="33">CEDULA DE EXTRANJERIA</option>
                      <option value="44">CARNE DIPLOMATICO</option>
                      <option value="37">NIT PERSONA JURIDICA</option>
                      <option value="38">NUMERO UNICO DE IDENTIFICACION PERSONAL</option>
                      <option value="40">PASAPORTE</option>
                      <option value="35">REGISTRO CIVIL DE NACIMIENTO</option>
                      <option value="34">TARJETA DE IDENTIDAD</option>
                      <option value="46">PERMISO ESPECIAL DE PERMANENCIA</option>
                      <option value="48">PERMISO DE PROTECCION TEMPORAL PPT</option>
                      <option value="45">NIT PERSONA JURIDICA EXTRANJERA</option>
                    </Field>
                    {errors.documentType ? (
                      <div className="content-error-validation">
                        <InfoCircle size={13} />
                        <span className="error-message">
                          {errors.documentType}
                        </span>
                      </div>
                    ) : null}
                  </Col>
                  <Col className="form-group">
                    <Field
                      name="documentNumber"

                      placeholder="Número de identificación"
                      className={((errors.documentNumber && touched.documentNumber)) ? 'form-control input-invalid' : 'form-control'}
                      autoComplete="off"
                    />
                    {errors.documentNumber && touched.documentNumber ? (
                      <div className="content-error-validation">
                        <InfoCircle size={13} />
                        <span className="error-message">
                          {errors.documentNumber}
                        </span>
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <Button variant="primary" type="submit">Consultar</Button>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    );
  }
}

export default SearchClient;
