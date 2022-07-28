import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'
import { PDFQuejas } from "../../pdf/PDFQuejas";

import { notification } from '../../components/Toast'
import "react-toastify/ReactToastify.min.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faAddressCard,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'

import { agregarQueja } from '../../services/formServices'
import { getData } from '../../helpers/loadUserData'

const FormDeQuejas = () => {
  const { user, token } = useAuth()

  if (!user) return <Navigate to="/" />


  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [showPDF, setShowPDF] = useState(false)

  const profileSchema = Yup.object().shape({

    tipoUsuario: Yup.string().required('Tipo de Usuario obligatorio!'),
    lugar: Yup.string().required('El Lugar es obligatorio!'),
    nParcela: Yup.number().required('El Nº Parcela es obligatorio!').typeError('Sólo números son aceptados!'),
    nToma: Yup.number().required('El Nº Toma es obligatorio!').typeError('Sólo números son aceptados!'),
    problematica: Yup.string().required('El campo es obligatorio!')
      .max(450, 'Maximo 500 Caracteres!').trim(),
    cuando: Yup.string().required('El campo es obligatorio!')
      .max(225, 'Maximo 250 Caracteres!').trim(),
    reportado: Yup.string().required('El campo es obligatorio!')
      .max(115, 'Maximo 130 Caracteres!').trim(),
    respInst: Yup.string().required('El campo es obligatorio!')
      .max(225, 'Maximo 250 Caracteres!').trim(),
    solucion: Yup.string().required('El campo es obligatorio!')
      .max(225, 'Maximo 250 Caracteres!').trim(),
    aporte: Yup.string().required('El campo es obligatorio!')
      .max(225, 'Maximo 250 Caracteres!').trim()

  })

  let date = new Date().toLocaleDateString()

  const [subDistrito, setSubDistrito] = useState()

  const [hourNow, sethourNow] = useState(new Date().toLocaleTimeString())

  useLayoutEffect(() => {
    const loadData = async () => {
      setData(await getData(token))
    }
    loadData()
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])

  useEffect(() => {
    fetch('http://192.168.10.182:8080/getAllSubdistrito')
      .then(e => e.json())
      .then(res => setSubDistrito(res.data))
  }, [])

  const handlePDF = (values) => {
    const { fullName, phone, identification } = data
    const aux = subDistrito.filter((e) => e.id === values.lugar)
    const subName = aux[0].subdistrito
    PDFQuejas({ ...values, date, hourNow, fullName, phone, identification, subName })
  }


  const handleSubmit = async (values) => {
    const { fullName, phone, identification } = data
    const nombreQuejoso = fullName
    const res = await agregarQueja({ ...values, fullName, phone, identification, nombreQuejoso, hourNow }, token)
    if (res.status === 200) {
      setShowPDF(true)
      notification(res.status)
    } else {
      notification(res.status)
    }
  }

  return (
    <>
      <div className="title-container">
        <p> Formulario de Quejas </p>
      </div>
      <div className="senara-forms">
        <Formik
          initialValues={{
            tipoUsuario: "",
            lugar: "",
            nParcela: "",
            nToma: "",
            problematica: "",
            cuando: "",
            reportado: "",
            respInst: "",
            solucion: "",
            aporte: ""
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={profileSchema}
        >
          {({ errors, touched, values }) => {
            return (
              <Form className="forms-container">
                {loading
                  ?
                  <div className="forms-content-group">

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        <p><small>Fecha:{" "}{date}{" "}{" "}{" "}Hora:{" "}{hourNow}</small></p>
                        <p><small></small></p>
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
                          <option value="" disabled> Seleccione Tipo de Usuario </option>
                          <option value="Propietario Registral">Propietario Registral</option>
                          <option value="Productor">Productor</option>
                        </Field>
                      </div>
                      <div className="senara-form-group" >
                        <Field
                          id="nombre"
                          name="nombre"
                          type="text"
                          placeholder=""
                          className="floating-input"
                          value={data?.fullName}
                          disabled
                        />
                        <label> Nombre</label>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </div>

                      <div className="senara-form-group">
                        {errors.telefono && touched.telefono ? (
                          <div className="a-alert">{errors.telefono}</div>
                        ) : null}
                        <Field
                          id="telefono"
                          name="telefono"
                          type="tel"
                          placeholder=""
                          className="floating-input"
                          value={data?.phone}
                          disabled
                        />
                        <FontAwesomeIcon icon={faPhone} />
                        <label> Teléfono </label>
                      </div>
                    </div>
                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        {errors.lugar && touched.lugar ? (
                          <div className="a-alert">{errors.lugar}</div>
                        ) : null}
                        <Field
                          id="lugar"
                          name="lugar"
                          as="select"
                          multiple={false}
                          className="floating-select"
                        >
                          <option value="" disabled> Seleccione Lugar del Proyecto </option>
                          {subDistrito &&
                            subDistrito.map((value, key) => {

                              return <option key={key} value={value.id}> {value.subdistrito} </option>
                            })
                          }
                        </Field>
                        <span className="highlight"></span>
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
                          maxlength="450"
                        />

                        <label> Exponga su problemática </label>
                      </div>
                    </div>

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        {errors.cuando && touched.cuando ? (
                          <div className="a-alert">{errors.cuando}</div>
                        ) : null}
                        <Field
                          as="textarea"
                          id="cuando"
                          name="cuando"
                          placeholder=""
                          className="floating-textarea"
                          maxlength="225"
                        />

                        <label> Desde cuando presenta el problema </label>
                      </div>
                    </div>

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        {errors.reportado && touched.reportado ? (
                          <div className="a-alert">{errors.reportado}</div>
                        ) : null}
                        <Field
                          type="text"
                          id="reportado"
                          name="reportado"
                          placeholder=""
                          className="floating-input"
                          maxlength="115"
                        />

                        <label> Lo ha reportado anteriormente </label>
                      </div>
                    </div>

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        {errors.respInst && touched.respInst ? (
                          <div className="a-alert">{errors.respInst}</div>
                        ) : null}
                        <Field
                          as="textarea"
                          id="respInst"
                          name="respInst"
                          placeholder=""
                          className="floating-textarea"
                          maxlength="225"
                        />
                        <label>
                          Cuál ha sido la respuesta de la Institución
                        </label>
                      </div>
                    </div>

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        {errors.solucion && touched.solucion ? (
                          <div className="a-alert">{errors.solucion}</div>
                        ) : null}
                        <Field
                          as="textarea"
                          id="solucion"
                          name="solucion"
                          placeholder=""
                          className="floating-textarea"
                          maxlength="225"
                        />
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
                          as="textarea"
                          id="aporte"
                          name="aporte"
                          type="text"
                          placeholder=""
                          className="floating-textarea"
                          maxlength="225"
                        />
                        <label>
                          Cuál seria su aporte para solucionar el problema
                        </label>
                      </div>
                    </div>

                    <div className="forms-content-group-item">
                      <div className="senara-form-group">
                        <Field
                          id="nombreQuejoso"
                          name="nombreQuejoso"
                          type="text"
                          placeholder=""
                          className="floating-input"
                          value={data?.fullName}
                          disabled
                        />
                        <span className="highlight"></span>
                        <label>Nombre del Quejoso</label>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </div>

                      <div className="senara-form-group">
                        <Field
                          id="cedula"
                          name="cedula"
                          type="text"
                          placeholder=""
                          className="floating-input"
                          value={data?.identification}
                          disabled
                        />
                        <span className="highlight"></span>
                        <label>Nº Cédula</label>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </div>
                    </div>
                    <div className='btn-group'>
                      <button type="submit" className="senara-btn-primary">
                        Enviar Queja
                      </button>
                      {showPDF && <button type='button' className='senara-btn-primary btn-pdf' onClick={() => handlePDF(values)}> PDF</button>}
                    </div>
                  </div>
                  :
                  <div className="spinner-loading">
                    <div></div><div></div><div></div><div></div>
                  </div>
                }
              </Form>
            )
          }}
        </Formik>
      </div>
      <ToastContainer position="bottom-right" theme='colored' />
    </>
  )
}

export default FormDeQuejas

