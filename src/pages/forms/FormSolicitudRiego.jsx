import React, { useEffect, useState } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { PDFSolicitudRiego } from '../../pdf/PDFSolicitudRiego'
import { getData } from '../../helpers/loadUserData'
import { solicitudCreate } from '../../services/formServices'
import { ToastContainer } from 'react-toastify'
import { notification } from '../../components/Toast'
import 'react-toastify/ReactToastify.min.css'

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
  const { user, token } = useAuth()
  const [subDistric, setSubDistric] = useState()
  const [Crops, setCrops] = useState()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState(false)

  if (!user) return <Navigate to="/" />

  const profileSchema = Yup.object().shape({
    nParcela: Yup.string()
      .required('Este campo es necesario')
      .max(20, 'Maximo 20 caracteres'),
    proyecto: Yup.string()
      .required('Este campo es necesario')
      .max(20, 'Maximo 20 caracteres'),
    subDistrito: Yup.string().required('Este campo es necesario'),
    area: Yup.number()
      .required('Este campo es necesario')
      .typeError('Este campo es numerico')
      .max(20, 'Maximo 20 caracteres'),
    cultivo: Yup.string().required('Este campo es necesario'),
    variedad: Yup.string().required('Este campo es necesario'),
    rendimientoAnterior: Yup.string()
      .required('Este campo es necesario')
      .max(20, 'Maximo 20 caracteres'),
    exactAddress: Yup.string()
      .min(30, 'Minimo 30 caracteres')
      .max(100, 'Maximo 100 caracteres'),
    phone: Yup.string()
      .required('Este campo es necesario')
      .matches(/^[2|4|5|6|7|8]\d{7}$/, 'Este numero no es valido')
      .required('Este campo es necesario'),
    fax: Yup.string().matches(
      /^(?=(?:\D*\d){10,12}\D*$)[0-9 \-()\\\/]{1,16}$/gm,
      'Este numero fax no es valido'
    ),
    email: Yup.string()
      .required('Este campo es necesario')
      .email('Email no valido'),
    observaciones: Yup.string()

      .min(30, 'Minimo 30 caracteres')
      .max(100, 'Maximo 100 caracteres'),
    fechaReciboRiego: Yup.date().required('Este campo es necesario'),
  })

  useEffect(() => {
    fetch('http://192.168.10.182:8080/getAllSubdistrito')
      .then((e) => e.json())
      .then((res) => setSubDistric(res.data))

    fetch('http://192.168.10.182:8080/getAllCrop')
      .then((e) => e.json())
      .then((res) => setCrops(res.data))
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setData(await getData(token))
    }
    setTimeout(() => {
      setLoading(true)
    }, 500)
    loadData()
  }, [])

  const handleSubmit = async (values) => {
    let object = {
      identification: data.identification,
      nParcela: values.nParcela,
      proyecto: values.proyecto,
      subDistrito: values.subDistrito,
      area: values.area,
      cultivo: values.cultivo,
      variedad: values.variedad,
      rendimientoAnterior: values.rendimientoAnterior,
      fechaReciboRiego: values.fechaReciboRiego,
      fax: values.fax,
      email: values.email,
      observaciones: values.observaciones,
      phone: values.phone,
      exactAddress: values.exactAddress,
    }

    try {
      let res = await solicitudCreate(object, token)
      if (res.status === 200) {
        setFlag(true)
        notification(res.status)
      }
      console.log(res)
    } catch (error) {}

    PDFSolicitudRiego(values, data)
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
          {({ errors, touched, values }) => {
            return (
              <Form className="forms-container">
                {loading ? (
                  <>
                    <div className="forms-content-group">
                      <legend className="senara-description-page">
                        Datos del Cliente:
                      </legend>
                      <div className="forms-content-group-item">
                        <div className="senara-form-group">
                          <Field
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={data.fullName}
                            className="floating-input"
                            placeholder=" "
                            disabled
                          />
                          <span className="highlight"></span>
                          <label> Nombre Completo </label>
                          <FontAwesomeIcon icon={faAddressCard} />
                        </div>
                        <div className="senara-form-group">
                          <Field
                            id="identification"
                            name="identification"
                            type="text"
                            value={data.identification}
                            className="floating-input"
                            placeholder=" "
                            disabled
                          />
                          <span className="highlight"></span>
                          <label> Identificación </label>
                          <FontAwesomeIcon icon={faAddressCard} />
                        </div>
                      </div>

                      <legend className="senara-description-page">
                        Datos de Parcela:
                      </legend>
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
                            as="select"
                            multiple={false}
                            className="floating-select"
                          >
                            <option value="" disabled>
                              {' '}
                              SubDistrito{' '}
                            </option>
                            {subDistric &&
                              subDistric.map((value, key) => {
                                return (
                                  <option key={key} value={value.subdistrito}>
                                    {' '}
                                    {value.subdistrito}{' '}
                                  </option>
                                )
                              })}
                          </Field>
                        </div>
                      </div>
                      <legend className="senara-description-page">
                        Datos del Cultivo:
                      </legend>
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
                            as="select"
                            multiple={false}
                            className="floating-select"
                          >
                            <option value="" disabled>
                              {' '}
                              Cultivo{' '}
                            </option>
                            {Crops &&
                              Crops.map((value, key) => {
                                return (
                                  <option key={key} value={value.cultivo}>
                                    {' '}
                                    {value.cultivo}{' '}
                                  </option>
                                )
                              })}
                          </Field>
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
                          as="textarea"
                          placeholder=""
                          className="floating-textarea"
                        />
                        <label>Dirección Exacta</label>
                        <span className="highlight"></span>
                        <FontAwesomeIcon icon={faMap} />
                      </div>

                      <div className="senara-form-group">
                        {errors.fechaReciboRiego && touched.fechaReciboRiego ? (
                          <div className="a-alert">
                            {errors.fechaReciboRiego}
                          </div>
                        ) : null}

                        <Field
                          id="fechaReciboRiego"
                          name="fechaReciboRiego"
                          type="date"
                          className="floating-input"
                        ></Field>
                        <label>Fecha del recibo de riego</label>
                        <span className="highlight"></span>
                      </div>
                      <legend className="senara-description-page">
                        Datos de Contacto:
                      </legend>
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
                    {flag ? (
                      <button onClick={() => PDFSolicitudRiego(values, data)}>
                        Imprimir PDF
                      </button>
                    ) : null}
                  </>
                ) : (
                  <div className="spinner-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </Form>
            )
          }}
        </Formik>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  )
}

export default FormSolicitudRiego
