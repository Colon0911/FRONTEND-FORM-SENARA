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
        identification: Yup.string().when('identificationType', {
            is: 'physical',
            then: Yup.string().matches(/^[1-9]\d{8}$/, 'Formato Costarricense obligatorio!')
                .min(9, 'Minimo 9 digitos!').max(9, 'Maximo 9 digitos!').required('La cédula es obligatoria!'),
            otherwise: Yup.string().matches(/^[2|3|4|5]\d{9}$/, 'Formato Costarricense obligatorio!')
                .min(10, 'Minimo 10 digitos!').max(10, 'Maximo 10 digitos!').required('La cédula es obligatoria!')
        }),
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
    const [isDisabled, setIsDisabled] = useState(false)
    const [isID, setIsID] = useState()

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
        <div className="senara-content-sm-login register-form">
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
                {({ errors, touched, values }) => {
                    return (
                        <>
                            <Form className='senara-form form-login'>
                                {step === 1 ? (
                                    <>
                                        <FirstStep
                                            errors={errors}
                                            touched={touched}
                                            values={values}
                                            nextStep={nextStep}
                                        />
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="senara-btn-primary senara-form-group btn-register"
                                            disabled={
                                                (values.identificationType && values.identification && values.fullName && !errors.genre)
                                                    ? false : true
                                            }
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
                                            className="senara-btn-primary senara-form-group btn-register"
                                        />
                                    </>
                                )}
                            </Form>
                            <div className="senara-actions action-register">
                                <Link to="/"> Acceder a tu cuenta </Link>
                            </div>
                        </>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Register