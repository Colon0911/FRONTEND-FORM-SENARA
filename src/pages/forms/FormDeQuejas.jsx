import React, { useEffect, useState } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faAddressCard,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'

const FormDeQuejas = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  const profileSchema = Yup.object().shape({
    nombreDelPropietario: Yup.string().required(
      'El Nombre del Propietario es obligatorio!'
    ),
    telPropietario: Yup.string().required('El teléfono es obligatorio!'),
    nombreDelArrendatario: Yup.string().required(
      'El Nombre del Arrendatario es obligatorio!'
    ),
    telArrendatario: Yup.string().required('El teléfono es obligatorio!'),
    lugar: Yup.string().required('El Lugar es obligatorio!'),
    nParcela: Yup.string().required('El Nº Parcela es obligatorio!'),
    nToma: Yup.string().required('El Nº Toma es obligatorio!'),
    problematica: Yup.string().required('El campo es obligatorio!'),
    reportado: Yup.string().required('El campo es obligatorio!'),
    respInst: Yup.string().required('El campo es obligatorio!'),
    solucion: Yup.string().required('El campo es obligatorio!'),
    aporte: Yup.string().required('El campo es obligatorio!'),
    nombreQuejoso: Yup.string().required('El Nombre es obligatorio!'),
    cedula: Yup.string().required('El Nº cédula es obligatorio!'),
  })

  //   const [data, setData] = useOutletContext()

  const handleSubmit = (values) => {
    const formData = {}

    console.log(formData)
  }

  return (
    <>
      <div className="title-container">
        <p> Formulario de Quejas </p>
      </div>
      <div className="senara-forms">
        <Formik
          initialValues={{
            phone: '',
            province: '',
            canton: '',
            district: '',
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
                      {errors.date && touched.date ? (
                        <div className="senara-actions">{errors.date}</div>
                      ) : null}
                      <Field
                        id="date"
                        name="date"
                        type="date"
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Fecha </label>
                    </div>
                    <div className="senara-form-group">
                      {errors.time && touched.time ? (
                        <div className="senara-actions">{errors.time}</div>
                      ) : null}
                      <Field
                        id="time"
                        name="time"
                        type="time"
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Hora</label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.nombreDelPropietario &&
                      touched.nombreDelPropietario ? (
                        <div className="senara-actions">
                          {errors.nombreDelPropietario}
                        </div>
                      ) : null}
                      <Field
                        id="nombreDelPropietario"
                        name="nombreDelPropietario"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Nombre del Propietario </label>
                    </div>
                    <div className="senara-form-group">
                      {errors.telPropietario && touched.telPropietario ? (
                        <div className="senara-actions">
                          {errors.telPropietario}
                        </div>
                      ) : null}
                      <Field
                        id="telPropietario"
                        name="telPropietario"
                        type="tel"
                        placeholder=""
                        className="floating-input"
                      />
                      <FontAwesomeIcon icon={faPhone} />
                      <span className="highlight"></span>
                      <label> Teléfono </label>
                    </div>
                  </div>
                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.nombreDelArrendatario &&
                      touched.nombreDelArrendatario ? (
                        <div className="senara-actions">
                          {errors.nombreDelArrendatario}
                        </div>
                      ) : null}
                      <Field
                        id="nombreDelArrendatario"
                        name="nombreDelArrendatario"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Nombre del Arrendatario </label>
                    </div>
                    <div className="senara-form-group">
                      {errors.telArrendatario && touched.telArrendatario ? (
                        <div className="senara-actions">
                          {errors.telArrendatario}
                        </div>
                      ) : null}
                      <Field
                        id="telArrendatario"
                        name="telArrendatario"
                        type="tel"
                        placeholder=""
                        className="floating-input"
                      />
                      <FontAwesomeIcon icon={faPhone} />
                      <span className="highlight"></span>
                      <label> Teléfono </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.lugar && touched.lugar ? (
                        <div className="senara-actions">{errors.lugar}</div>
                      ) : null}
                      <Field
                        id="lugar"
                        name="lugar"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Lugar (proyecto)</label>
                    </div>
                    <div className="senara-form-group">
                      {errors.nParcela && touched.nParcela ? (
                        <div className="senara-actions">{errors.nParcela}</div>
                      ) : null}
                      <Field
                        id="nParcela"
                        name="nParcela"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Nº Parcela </label>
                    </div>
                    <div className="senara-form-group">
                      {errors.nToma && touched.nToma ? (
                        <div className="senara-actions">{errors.nToma}</div>
                      ) : null}
                      <Field
                        id="nToma"
                        name="nToma"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Nº Toma </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.problematica && touched.problematica ? (
                        <div className="senara-actions">
                          {errors.problematica}
                        </div>
                      ) : null}
                      <Field
                        as="textarea"
                        id="problematica"
                        name="problematica"
                        placeholder=""
                        className="floating-textarea"
                      />
                      <span className="highlight"></span>
                      <label> Exponga su problemática </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.reportado && touched.reportado ? (
                        <div className="senara-actions">{errors.reportado}</div>
                      ) : null}
                      <Field
                        id="reportado"
                        name="reportado"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label> Lo ha reportado anteriormente </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.respInst && touched.respInst ? (
                        <div className="senara-actions">{errors.respInst}</div>
                      ) : null}
                      <Field
                        id="respInst"
                        name="respInst"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label>
                        {' '}
                        Cuál ha sido la respuesta de la Intitución{' '}
                      </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.solucion && touched.solucion ? (
                        <div className="senara-actions">{errors.solucion}</div>
                      ) : null}
                      <Field
                        id="solucion"
                        name="solucion"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label>
                        Cuál considera usted que sea la solución al problema
                      </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.aporte && touched.aporte ? (
                        <div className="senara-actions">{errors.aporte}</div>
                      ) : null}
                      <Field
                        id="aporte"
                        name="aporte"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label>
                        Cuál seria su aporte para solucionar el problema
                      </label>
                    </div>
                  </div>

                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.nombreQuejoso && touched.nombreQuejoso ? (
                        <div className="senara-actions">
                          {errors.nombreQuejoso}
                        </div>
                      ) : null}
                      <Field
                        id="nombreQuejoso"
                        name="nombreQuejoso"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label>Nombre del Quejoso</label>
                    </div>

                    <div className="senara-form-group">
                      {errors.cedula && touched.cedula ? (
                        <div className="senara-actions">{errors.cedula}</div>
                      ) : null}
                      <Field
                        id="cedula"
                        name="cedula"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <span className="highlight"></span>
                      <label>Nº Cédula</label>
                    </div>
                  </div>

                  <button type="submit" className="senara-btn-primary">
                    Guardar
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default FormDeQuejas
