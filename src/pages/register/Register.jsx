import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { registerUser } from '../../services/userServices'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Logo from '../../components/Logo';

const Register = () => {
    const registerSchema = Yup.object().shape({
        identificationType: Yup.string().required('Tipo de Cédula obligatorio!'),
        identification: Yup.string().required('La cédula es obligatoria!'),
        fullName: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(40, 'El nombre es muy largo')
            .required('El nombre completo es obligatorio'),
        genre: Yup.string().when('identificationType', {
            is: 'physical',
            then: Yup.string().required('El género es obligatorio!')
        }),
        email: Yup.string().email('Email no valido').required('El email es obligatorio'),
        userName: Yup.string().required('El nombre de usuario es obligatorio!'),
        password: Yup.string()
            .min(6, 'Minimo 6 caracteres!')
            .required('La contraseña es obligatoria!'),
        confirmation: Yup.string()
            .min(6, 'Minimo 6 caracteres!')
            .required('Confirmación obligatoria!')
            .oneOf([Yup.ref('password'), null], 'Contraseñas no coinciden!')
    })

    const navigate = useNavigate()

    const [step, setStep] = useState(1)

    const nextStep = () => setStep(step + 1)
    // const previousStep = () => setStep(step - 1)

    const handleSubmit = async e => {
        delete e['confirmation']
        const res = await registerUser(e)
        if (res.status === 200) {
            setTimeout(() => {
                navigate("/", { replace: true })
            }, 500);
        }
    }

    return (
        <div className="senara-content-sm-login">
            <Logo />
            <div className="senara-content-legend-auth">
                <div className="senara-tagline"> Registro </div>
                <div className="senara-description-page">Ingrese los datos solicitados</div>
            </div>
            <Formik
                initialValues={{
                    identificationType: '',
                    identification: '',
                    fullName: '',
                    genre: '',
                    email: '',
                    userName: '',
                    password: '',
                    confirmation: ''
                }}
                onSubmit={values => {
                    handleSubmit(values)
                }}
                validationSchema={registerSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <>
                            <Form className='senara-form form-login'>
                                {step === 1 ? (
                                    <>
                                        <FirstStep
                                            errors={errors}
                                            touched={touched}
                                            nextStep={nextStep}
                                        />
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="senara-btn-primary senara-form-group"
                                        >
                                            Siguiente
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <SecondStep errors={errors} touched={touched} />
                                        <input
                                            type="submit"
                                            value="Enviar"
                                            className="senara-btn-primary senara-form-group"
                                        />
                                    </>
                                )}
                            </Form>
                            <div className="senara-actions">
                                <Link to="/"> Iniciar Sesión </Link>
                            </div>
                        </>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Register