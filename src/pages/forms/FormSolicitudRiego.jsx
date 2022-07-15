import React, { useEffect, useState } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { PDFSolicitudRiego } from '../../pdf/PDFSolicitudRiego'

import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faAddressCard,
  faEnvelope,
  faPhone,
  faCalendarDays,
  faMap,
} from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'

const FormSolicitudRiego = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  const profileSchema = Yup.object().shape({
    nParcela: Yup.string().required('Este campo es necesario'),
    proyecto: Yup.string().required('Este campo es necesario'),
    subDistrito: Yup.string().required('Este campo es necesario'),
    area: Yup.string().required('Este campo es necesario'),
    cultivo: Yup.string().required('Este campo es necesario'),
    variedad: Yup.string().required('Este campo es necesario'),
    rendimientoAnterior: Yup.string().required('Este campo es necesario'),
    phone: Yup.string().required('Este campo es necesario'),
    exactAddress: Yup.string().required('Este campo es necesario'),
    fax: Yup.string().required('Este campo es necesario'),
    email: Yup.string()
      .required('Este campo es necesario')
      .email('Email no valido'),
    observaciones: Yup.string().required('Este campo es necesario'),
    fechaReciboRiego: Yup.date().required('Este campo es necesario'),
  })

  const handleSubmit = (values) => {
    PDFSolicitudRiego(values)
  }

  return (
    <>
      <div className="title-container">
        <p> Formulario Solicitud de Riego </p>
      </div>
      <div className="senara-forms">
        <Formik
          initialValues={{
            nParcela: '',
            proyecto: '',
            subDistrito: '',
            area: '',
            cultivo: '',
            variedad: '',
            rendimientoAnterior: '',
            fechaReciboRiego: '',
            fax: '',
            email: '',
            observaciones: '',
            phone: '',
            exactAddress: '',
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={profileSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="forms-container">
                <div className="forms-content-group">
                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.nParcela && touched.nParcela ? (
                        <div className="a-alert">{errors.nParcela}</div>
                      ) : null}
                      <Field
                        id="nParcela"
                        name="nParcela"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label> Nº Parcela </label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="senara-form-group">
                      {errors.proyecto && touched.proyecto ? (
                        <div className="a-alert">{errors.proyecto}</div>
                      ) : null}
                      <Field
                        id="proyecto"
                        name="proyecto"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label> Proyecto </label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="senara-form-group">
                      {errors.subDistrito && touched.subDistrito ? (
                        <div className="a-alert">{errors.subDistrito}</div>
                      ) : null}
                      <Field
                        id="subDistrito"
                        name="subDistrito"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label>SubDistrito </label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.area && touched.area ? (
                        <div className="a-alert">{errors.area}</div>
                      ) : null}
                      <Field
                        id="area"
                        name="area"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label>Area</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="senara-form-group">
                      {errors.cultivo && touched.cultivo ? (
                        <div className="a-alert">{errors.cultivo}</div>
                      ) : null}
                      <Field
                        id="cultivo"
                        name="cultivo"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label>Cultivo</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.variedad && touched.variedad ? (
                        <div className="a-alert">{errors.variedad}</div>
                      ) : null}
                      <Field
                        id="variedad"
                        name="variedad"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      ></Field>
                      <label>Variedad</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                    <div className="senara-form-group">
                      {errors.rendimientoAnterior &&
                      touched.rendimientoAnterior ? (
                        <div className="a-alert">
                          {errors.rendimientoAnterior}
                        </div>
                      ) : null}
                      <Field
                        id="rendimientoAnterior"
                        name="rendimientoAnterior"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      ></Field>
                      <label>Rendimiento anterior</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>
                  </div>

                  <div className="senara-form-group">
                    {errors.exactAddress && touched.exactAddress ? (
                      <div className="a-alert">{errors.exactAddress}</div>
                    ) : null}
                    <Field
                      id="exactAddress"
                      name="exactAddress"
                      type="textarea"
                      placeholder=""
                      className="floating-textarea"
                    />
                    <label>Dirección Exacta</label>
                    <span className="highlight"></span>
                    <FontAwesomeIcon icon={faMap} />
                  </div>

                  <div className="senara-form-group">
                    {errors.fechaReciboRiego && touched.fechaReciboRiego ? (
                      <div className="a-alert">{errors.fechaReciboRiego}</div>
                    ) : null}

                    <Field
                      id="fechaReciboRiego"
                      name="fechaReciboRiego"
                      type="date"
                      className="floating-input"
                    ></Field>
                    <label>Fecha de ultimo riego</label>
                    <span className="highlight"></span>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.phone && touched.phone ? (
                        <div className="a-alert">{errors.phone}</div>
                      ) : null}
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label>Teléfono</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div className="senara-form-group">
                      {errors.fax && touched.fax ? (
                        <div className="a-alert">{errors.fax}</div>
                      ) : null}
                      <Field
                        id="fax"
                        name="fax"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      ></Field>
                      <label>Fax</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="senara-form-group">
                      {errors.email && touched.email ? (
                        <div className="a-alert">{errors.email}</div>
                      ) : null}
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <label>Correo</label>
                      <span className="highlight"></span>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>

                  <div className="senara-form-group">
                    {errors.observaciones && touched.observaciones ? (
                      <div className="a-alert">{errors.observaciones}</div>
                    ) : null}
                    <Field
                      id="observaciones"
                      name="observaciones"
                      as="textarea"
                      placeholder=""
                      className="floating-textarea"
                    />
                    <label>Observaciones</label>
                    <span className="highlight"></span>
                    <FontAwesomeIcon icon={faAddressCard} />
                  </div>
                </div>
                <button type="submit" className="senara-btn-primary">
                  Hacer Solicitud
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default FormSolicitudRiego
