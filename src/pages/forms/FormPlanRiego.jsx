import React, { useLayoutEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'
import { getData } from '../../helpers/loadUserData'

import Crops from './Crops'

const FormPlanRiego = () => {
    const { user, token } = useAuth()

    if (!user) return <Navigate to="/" />

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [counter, setCounter] = useState([0])

    const planRiegoSchema = Yup.object().shape({
        date: Yup.date().required('La fecha es obligatoria!').min(currentDate.toLocaleDateString(), `Debe ser posterior al ${currentDate.toLocaleDateString()}`)
    })

    useLayoutEffect(() => {
        const loadData = async () => {
            setData(await getData(token))
        }
        setTimeout(() => {
            setLoading(true)
        }, 500);
        loadData()
    }, [])

    const newCrop = () => setCounter(...counter, 0)

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
                        crops: [
                            {
                                cultivo: '',
                                toma: '',
                                area: '',
                                fecha: ''
                            }
                        ],
                        date: ''
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={planRiegoSchema}
                >
                    {({ errors, touched, values }) => {
                        return (
                            <Form className="forms-container">
                                {loading
                                    ?
                                    <>
                                        <div className="forms-content-group">
                                            <div className="forms-content-group-item">
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="fullName"
                                                        name="fullName"
                                                        type="text"
                                                        value={data.fullName}
                                                        className="floating-input"
                                                        placeholder=" "
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
                                                        className="floating-input"
                                                        placeholder=" "
                                                    />
                                                    <span className="highlight"></span>
                                                    <label> Identificación </label>
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </div>
                                            </div>

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
                                                    <Field
                                                        id="hydraulicSector"
                                                        name="hydraulicSector"
                                                        type="text"
                                                        className="floating-input"
                                                        placeholder=" "
                                                    />
                                                    <span className="highlight"></span>
                                                    <label> Sector Hidraulico </label>
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </div>
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="subDistrict"
                                                        name="subDistrict"
                                                        type="text"
                                                        className="floating-input"
                                                        placeholder=" "
                                                    />
                                                    <span className="highlight"></span>
                                                    <label> Subdistrito </label>
                                                    <FontAwesomeIcon icon={faAddressCard} />
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
                                                <label> Superficie Regable </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            {/* CROPS HERE */}

                                            <Crops touched={touched} errors={errors} values={values} />

                                            {/* CROPS END HERE */}

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

                                            <div className="senara-form-group">
                                                <Field
                                                    id="cycle"
                                                    name="cycle"
                                                    type="text"
                                                    className="floating-input"
                                                    placeholder=" "
                                                />
                                                <span className="highlight"></span>
                                                <label> Superficie Regable </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            <div className="senara-form-group">
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
                                            </div>

                                            <div className="senara-form-group">
                                                <Field
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    className="floating-input"
                                                    placeholder=" "
                                                />
                                                <span className="highlight"></span>
                                                <label> Teléfono </label>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </div>

                                            <div className="senara-form-group">
                                                <Field
                                                    id="direction"
                                                    name="direction"
                                                    type="text"
                                                    className="floating-input"
                                                    placeholder=" "
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