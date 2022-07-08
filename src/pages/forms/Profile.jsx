import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faAddressCard, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'
import { getData } from '../../helpers/loadUserData'
import { getIdentification } from '../../helpers/decoding'
import { updateUser } from '../../services/userServices'

const Profile = () => {
    const { user, token } = useAuth()

    if (!user) return <Navigate to="/" />

    const profileSchema = Yup.object().shape({
        phone: Yup.string().required('El teléfono es obligatorio!'),
        province: Yup.string().required('La provincia es obligatorio!'),
        canton: Yup.string().required('El canton es obligatorio!'),
        district: Yup.string().required('El distrito es obligatorio!'),
        exactAddress: Yup.string().required('La dirección exacta es obligatoria!')
    })

    // Se pueden fusionar los useState de ubicacion
    const [statusProvincia, setStatusProvincia] = useState('')
    const [statusCanton, setStatusCanton] = useState('')

    const [provinces, setProvinces] = useState()
    const [cantons, setCantons] = useState()
    const [districts, setDistricts] = useState()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const loadCantons = (e, setFieldValue) => {
        const idProvincia = e.target.value
        const aux = provinces.filter(province => province[0] === idProvincia)
        setFieldValue('province', aux[0][0])
        setStatusProvincia(aux[0][0])
        fetch(`https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/cantones.json`)
            .then(response => response.text())
            .then(data => setCantons(Object.entries(JSON.parse(data))))
    }

    const loadDistricts = (e, setFieldValue) => {
        const idCanton = e.target.value
        const aux = cantons.filter(canton => canton[0] === idCanton)
        setFieldValue('canton', aux[0][0])
        setStatusCanton(aux[0][0])
        fetch(`https://ubicaciones.paginasweb.cr/provincia/${statusProvincia}/canton/${idCanton}/distritos.json`)
            .then(response => response.text())
            .then(data => setDistricts(Object.entries(JSON.parse(data))))
    }

    useEffect(() => {
        fetch('https://ubicaciones.paginasweb.cr/provincias.json')
            .then(e => e.json())
            .then(data => setProvinces(Object.entries(data)))
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

    const handleSubmit = async (values) => {
        const formData = {
            ...data,
            ...values,
            province: statusProvincia,
            canton: statusCanton
        }

        const id = getIdentification(token)
        const res = await updateUser(id, values, token)
        console.log(res)
    }

    return (
        <>
            <div className='title-container'>
                <p> Perfil </p>
            </div>
            <div className="senara-forms">
                <Formik
                    initialValues={{
                        phone: '',
                        province: '',
                        canton: '',
                        district: '',
                        exactAddress: ''
                    }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={profileSchema}
                >
                    {({ errors, touched, setFieldValue }) => {
                        return (
                            <Form className="forms-container">
                                {loading
                                    ?
                                    <>
                                        <div className="forms-content">
                                            <div>
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="fullName"
                                                        name="fullName"
                                                        type="text"
                                                        placeholder="Nombre"
                                                        className="floating-input"
                                                        value={data.fullName}
                                                        disabled={true}
                                                    />
                                                    <FontAwesomeIcon icon={faAddressCard} />
                                                </div>
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Correo"
                                                        className="floating-input"
                                                        value={data.email}
                                                        disabled={true}
                                                    />
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </div>
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="userName"
                                                        name="userName"
                                                        type="text"
                                                        placeholder="Nombre de Usuario"
                                                        className="floating-input"
                                                        value={data.userName}
                                                        disabled={true}
                                                    />
                                                    <FontAwesomeIcon icon={faUser} />
                                                </div>
                                                <div className="senara-form-group">
                                                    <Field
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Contraseña"
                                                        className="floating-input"
                                                        value={data.password}
                                                        disabled={true}
                                                    />
                                                    <FontAwesomeIcon icon={faKey} />
                                                </div>
                                                <div className="senara-form-group">
                                                    {errors.phone && touched.phone ? (
                                                        <div className="a-alert">{errors.phone}</div>
                                                    ) : null}
                                                    <Field
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        className="floating-input"
                                                        placeholder=" "
                                                    />
                                                    <span className='highlight'></span>
                                                    <label> Telefono </label>
                                                    <FontAwesomeIcon icon={faPhone} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="senara-form-group">
                                                    {errors.province && touched.province ? (
                                                        <div className="a-alert">{errors.province}</div>
                                                    ) : null}
                                                    <Field
                                                        id="province"
                                                        name="province"
                                                        as="select"
                                                        multiple={false}
                                                        className="floating-select"
                                                        value={statusProvincia}
                                                        onChange={e => loadCantons(e, setFieldValue)}
                                                    >
                                                        <option value=""> Seleccione una Provincia </option>
                                                        {provinces &&
                                                            provinces.map((value, key) => {
                                                                return <option key={key} value={value[0]}> {value[1]} </option>
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className="senara-form-group">
                                                    {errors.canton && touched.canton ? (
                                                        <div className="a-alert">{errors.canton}</div>
                                                    ) : null}
                                                    <Field
                                                        id="canton"
                                                        name="canton"
                                                        as="select"
                                                        multiple={false}
                                                        className="floating-select"
                                                        value={statusCanton}
                                                        disabled={statusProvincia === '' && true}
                                                        onChange={e => loadDistricts(e, setFieldValue)}
                                                    >
                                                        <option value=""> Seleccione un Cantón </option>
                                                        {cantons &&
                                                            cantons.map((value, key) => {
                                                                return <option key={key} value={value[0]}> {value[1]} </option>
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className="senara-form-group">
                                                    {errors.district && touched.district ? (
                                                        <div className="a-alert">{errors.district}</div>
                                                    ) : null}
                                                    <Field
                                                        id="district"
                                                        name="district"
                                                        as="select"
                                                        multiple={false}
                                                        className="floating-select"
                                                        disabled={statusCanton === '' && true}
                                                    >
                                                        <option value=""> Seleccione un Distrito </option>
                                                        {districts &&
                                                            districts.map((value, key) => {
                                                                return <option key={key} value={value[0]}> {value[1]} </option>
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className="senara-form-group">
                                                    {errors.exactAddress && touched.exactAddress ? (
                                                        <div className="a-alert">{errors.exactAddress}</div>
                                                    ) : null}
                                                    <Field
                                                        id="exactAddress"
                                                        name="exactAddress"
                                                        as="textarea"
                                                        className="floating-textarea"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="senara-btn-primary">
                                            Guardar
                                        </button>
                                    </>
                                    :
                                    <p> Loading... </p>
                                }
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}

export default Profile