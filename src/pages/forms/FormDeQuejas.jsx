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
    nParcela: Yup.string().required('El Nº Parcela es obligatorio!'),
    nToma: Yup.string().required('El Nº Toma es obligatorio!'),
    problematica: Yup.string().required('El campo es obligatorio!')
      .max(500, 'Maximo 500 Caracteres!'),
    cuando: Yup.string().required('El campo es obligatorio!')
      .max(250, 'Maximo 250 Caracteres!'),
    reportado: Yup.string().required('El campo es obligatorio!')
      .max(130, 'Maximo 130 Caracteres!'),
    respInst: Yup.string().required('El campo es obligatorio!')
      .max(250, 'Maximo 250 Caracteres!'),
    solucion: Yup.string().required('El campo es obligatorio!')
      .max(250, 'Maximo 250 Caracteres!'),
    aporte: Yup.string().required('El campo es obligatorio!')
      .max(250, 'Maximo 250 Caracteres!')

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
    const status = 200
    if (status === 200) setShowPDF(true)
    // const res = await agregarQueja({ ...values, fullName, phone, identification, nombreQuejoso, hourNow }, token)
  }

  return (
    <>
      <div className="title-container">
        <p> Formulario de Quejas </p>
      </div>
      <div className="senara-forms">
        <Formik
          initialValues={{
            tipoUsuario: "Productor",
            lugar: "1",
            nParcela: "874",
            nToma: "545",
            problematica: "dhdfhdfj",
            cuando: "jsdlgkjsl",
            reportado: "hdghdfh",
            respInst: "hdhdfhdfh",
            solucion: "hdfhdfhdf",
            aporte: "hdfhdhghdfhdfhfd"
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
                        <p><small>{date}{" "}{hourNow}</small></p>
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
                        Guardar
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
