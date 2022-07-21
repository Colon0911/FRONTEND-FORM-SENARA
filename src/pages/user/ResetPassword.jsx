import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { resetPassword } from '../../services/userServices'

import Logo from '../../components/Logo'

const ResetPassword = () => {

    const navi = useParams()

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Este campo es obligatorio")
            .min(6, "La contraseña debe tener minimo 6 caracteres")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        confirmPassword: Yup.string().required("Este campo es obligatorio")
            .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
    })

    const handleSubmit = async values => {
        await resetPassword(values, navi.token)
    }

    return (
        <div className="senara-content-sm-login">
            <Logo />
            <div className="senara-content-legend-auth">
                <legend className="senara-tagline">Cambiar Contraseña</legend>
            </div>

            <Formik
                initialValues={{
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values) => { handleSubmit(values) }}
                validationSchema={ResetPasswordSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Form className="senara-form">
                            <div className="senara-form-group">
                                {errors.password && touched.password ? (
                                    <div className="a-alert">{errors.password}</div>
                                ) : null}
                                <Field
                                    id="password"
                                    type="password"
                                    className="floating-input "
                                    placeholder=""
                                    name="password"
                                />
                                <span className="highlight"></span>
                                <label htmlFor="password"> Ingrese su nueva contraseña </label>
                            </div>

                            <div className="senara-form-group">
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className="a-alert">{errors.confirmPassword}</div>
                                ) : null}
                                <Field
                                    id="confirmPassword"
                                    type="password"
                                    className="floating-input "
                                    placeholder=""
                                    name="confirmPassword"
                                />
                                <span className="highlight"></span>
                                <label htmlFor="password"> Vuelva a ingresar su contraseña </label>
                            </div>


                            <input type="submit" value="Cambiar" className="senara-btn-primary btn-center" />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ResetPassword;