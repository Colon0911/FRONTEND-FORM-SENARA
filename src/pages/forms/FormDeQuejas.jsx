import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
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

  let date = new Date().toLocaleDateString()

  const [subDistrito, setSubDistrito] = useState()

  const [hourNow, sethourNow] = useState(null)
  const checkHour = () => {
    sethourNow(new Date().toLocaleTimeString())
  }



  useEffect(() => {
    fetch('http://192.168.10.182:8080/getAllSubdistrito')
      .then(e => e.json())
      .then(res => setSubDistrito(res.data))
  }, [])

  // console.log(subDistrito)

  // setInterval(() => {
  //   checkHour()
  // }, 10000);

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
                        <div className="a-alert">{errors.date}</div>
                      ) : null}
                      <Field
                        id="fecha"
                        name="fecha"
                        type="text"
                        className="floating-input"
                        disabled
                        value={date}
                      />
                      <label> Fecha </label>
                    </div>

                    <div className="senara-form-group">
                      {errors.time && touched.time ? (
                        <div className="a-alert">{errors.time}</div>
                      ) : null}
                      <Field
                        id="time"
                        name="time"
                        type="text"
                        className="floating-input"
                        disabled
                        value={hourNow}
                      />
                      <label> Hora</label>
                    </div>
                  </div>






                  <div className="forms-content-group-item">
                    <div className="senara-form-group">
                      {errors.tipoUsuario && touched.tipoUsuario ? (
                        <div className="a-alert">{errors.tipoUsuario}</div>
                      ) : null}
                      <Field
                        id="tipoUsuario"
                        name="tipoUsuario"
                        as="select"
                        multiple={false}
                        className="floating-select"
                      >
                        <option value=""> Seleccione Tipo de Usuario </option>
                        <option value="Propietario">Propietario</option>
                        <option value="Arrendatario">Arrendatario</option>
                      </Field>
                    </div>
                    <div className="senara-form-group">
                      {errors.nombreDelArrendatario &&
                        touched.nombreDelArrendatario ? (
                        <div className="a-alert">
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
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>

                    <div className="senara-form-group">
                      {errors.telArrendatario && touched.telArrendatario ? (
                        <div className="a-alert">{errors.telArrendatario}</div>
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
                      {errors.tipoUsuario && touched.tipoUsuario ? (
                        <div className="a-alert">{errors.tipoUsuario}</div>
                      ) : null}
                      <Field
                        id="lugar"
                        name="lugar"
                        as="select"
                        multiple={false}
                        className="floating-select"
                      >
                        <option value=""> Seleccione Lugar del Proyecto </option>
                        {subDistrito &&
                          subDistrito.map((value, key) => {

                            return <option key={key} value={value.id}> {value.subdistrito} </option>
                          })
                        }
                      </Field>
                    </div>

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
                      <span className="highlight"></span>
                      <label> Nº Parcela </label>
                    </div>

                    <div className="senara-form-group">
                      {errors.nToma && touched.nToma ? (
                        <div className="a-alert">{errors.nToma}</div>
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
                        <div className="a-alert">{errors.problematica}</div>
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
                        <div className="a-alert">{errors.reportado}</div>
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
                        <div className="a-alert">{errors.respInst}</div>
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
                        <div className="a-alert">{errors.solucion}</div>
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
                        <div className="a-alert">{errors.aporte}</div>
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
                        <div className="a-alert">{errors.nombreQuejoso}</div>
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
                      <FontAwesomeIcon icon={faAddressCard} />
                    </div>

                    <div className="senara-form-group">
                      {errors.cedula && touched.cedula ? (
                        <div className="a-alert">{errors.cedula}</div>
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
                      <FontAwesomeIcon icon={faAddressCard} />
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
