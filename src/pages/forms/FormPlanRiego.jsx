import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'
import { getData } from '../../helpers/loadUserData'
import { compareDates } from '../../helpers/compareDates'

import Crops from './Crops'
// import { getHydraulicSector } from '../../helpers/loadPlace'

const FormPlanRiego = () => {
    const { user, token, expiresIn, logout } = useAuth()

    if (!compareDates(expiresIn)) logout()
    if (!user) return <Navigate to="/" />

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [sectors, setSectors] = useState()
    const [subDistricts, setSubDistricts] = useState()

    const planRiegoSchema = Yup.object().shape({
        date: Yup.date().required('La fecha es obligatoria!').min(currentDate.toLocaleDateString(), `Debe ser posterior al ${currentDate.toLocaleDateString()}`)
    })

    const loadSectors = (e, setFieldValue) => {
        const subID = e.target.value
        setFieldValue('subDistrict', subID)
        fetch('http://192.168.10.182:8080/getAllSectoresHidraulicos')
            .then(e => e.json())
            .then(res => setSectors(res.data.filter(e => e.idSubdistrito === String(subID))))
    }

    useEffect(() => {
        fetch('http://192.168.10.182:8080/getAllSubdistrito')
            .then(e => e.json())
            .then(res => setSubDistricts(res.data))
    }, [])

    useLayoutEffect(() => {
        const loadData = async () => {
            setData(await getData(token))
        }
        setTimeout(() => {
            setLoading(true)
        }, 500);
        loadData()
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <div className='title-container'>
                <p> Plan de Riego DRAT </p>
            </div>
            <div className="senara-forms">
                <Formik
                    initialValues={{
                        standardNumber: '',
                        subDistrict: '',
                        hydraulicSector: '',
                        irrigableSurface: '',
                        date: '',
                        crops: [
                            {
                                cultivo: '',
                                toma: '',
                                area: '',
                                fecha: ''
                            }
                        ],
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={planRiegoSchema}
                >
                    {({ errors, touched, values, setFieldValue }) => {
                        return (
                            <Form className="forms-container">
                                {loading
                                    ?
                                    <>
                                        <div className="forms-content-group">
                                            {/* <fieldset> */}
                                            {/* <legend>Información Personal</legend> */}
                                            {data.identificationType === 'physical'
                                                ?
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
                                                :
                                                <div className="forms-content-group-item">
                                                    <div className="senara-form-group">
                                                        <Field
                                                            id="nombreJuridico"
                                                            name="nombreJuridico"
                                                            type="text"
                                                            className="floating-input"
                                                            placeholder=" "
                                                        />
                                                        <span className="highlight"></span>
                                                        <label> Persona Jurifica </label>
                                                        <FontAwesomeIcon icon={faAddressCard} />
                                                    </div>
                                                    <div className="senara-form-group">
                                                        <Field
                                                            id="cedulaJuridica"
                                                            name="cedulaJuridica"
                                                            type="text"
                                                            className="floating-input"
                                                            placeholder=" "
                                                        />
                                                        <span className="highlight"></span>
                                                        <label> Cedula Juridica </label>
                                                        <FontAwesomeIcon icon={faAddressCard} />
                                                    </div>
                                                </div>
                                            }

                                            {/* </fieldset> */}

                                            <div className="forms-content-group-item">
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="standardNumber"
                                                        name="standardNumber"
                                                        type="text"
                                                        className="floating-input"
                                                        placeholder=" "
                                                    />
                                                    <span className="highlight"></span>
                                                    <label> # Padrón </label>
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </div>

                                                <div className="senara-form-group">
                                                    {errors.subDistrict && touched.subDistrict ? (
                                                        <div className="a-alert">{errors.subDistrict}</div>
                                                    ) : null}
                                                    <Field
                                                        id="subDistrict"
                                                        name="subDistrict"
                                                        as="select"
                                                        multiple={false}
                                                        className="floating-select"
                                                        onChange={e => loadSectors(e, setFieldValue)}
                                                    >
                                                        <option value=""> Seleccione un Sub-Distrito </option>
                                                        {subDistricts &&
                                                            subDistricts.map((value, key) => {
                                                                return <option key={key} value={value.id}> {value.subdistrito} </option>
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className="senara-form-group">
                                                    {errors.hydraulicSector && touched.hydraulicSector ? (
                                                        <div className="a-alert">{errors.hydraulicSector}</div>
                                                    ) : null}
                                                    <Field
                                                        id="hydraulicSector"
                                                        name="hydraulicSector"
                                                        as="select"
                                                        multiple={false}
                                                        className="floating-select"
                                                    >
                                                        <option value=""> Seleccione un Sector Hidraulico </option>
                                                        {sectors &&
                                                            sectors.map((value, key) => {
                                                                return <option key={key} value={value.id}> {value.sector} </option>
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="senara-form-group">
                                                <Field
                                                    id="irrigableSurface"
                                                    name="irrigableSurface"
                                                    type="text"
                                                    className="floating-input"
                                                    placeholder=" "
                                                />
                                                <span className="highlight"></span>
                                                <label> Superficie total Regable </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

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
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            {/* CROPS HERE */}

                                            <Crops touched={touched} errors={errors} values={values} />

                                            {/* CROPS END HERE */}

                                            {/* <div className="senara-form-group">
                                                <Field
                                                    id="signatureOrID"
                                                    name="signatureOrID"
                                                    type="text"
                                                    className="floating-input"
                                                    placeholder=" "
                                                />
                                                <span className="highlight"></span>
                                                <label> Firma o Identificación </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div> */}

                                            <div className="senara-form-group">
                                                <Field
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    className="floating-input"
                                                    placeholder=" "
                                                    value={data.phone}
                                                />
                                                <span className="highlight"></span>
                                                <label> Teléfono </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            <div className="senara-form-group">
                                                <Field
                                                    id="exactAddress"
                                                    name="exactAddress"
                                                    type="text"
                                                    className="floating-input"
                                                    placeholder=" "
                                                    value={data.exactAddress}
                                                />
                                                <span className="highlight"></span>
                                                <label> Dirección </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            <div className="senara-form-group">
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="floating-input"
                                                    placeholder=" "
                                                    value={data.email}
                                                />
                                                <span className="highlight"></span>
                                                <label> Correo Electronico </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                        </div>
                                        <button type="submit" className="senara-btn-primary">
                                            Guardar
                                        </button>
                                    </>
                                    : <p>Loading...</p>
                                }
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}

export default FormPlanRiego