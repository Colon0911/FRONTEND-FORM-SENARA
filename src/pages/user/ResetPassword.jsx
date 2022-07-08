import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { resetPassword } from '../../services/userServices'

const ResetPassword = () => {

    const navi = useParams()

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Este campo es obligatorio")
            .min(8, "La contraseña debe tener minimo 8 caracteres")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "La contraseña no coincide")
    })

    const handleSubmit = async values => {
        await resetPassword(values, navi.token)
    }

    return (
        <div className="senara-content-login senara-content-sm-login">
            <div className="senara-logo">
                <div className="senara-img-logo"></div>
            </div>

            <p className="senara-tagline">CAMBIAR CONTRASEÑA</p>

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
                                <p
                                    className="senara-form-group floating-label senara-description-page"
                                    htmlFor="password"
                                ></p>
                                <Field
                                    id="password"
                                    type="password"
                                    className="floating-input "
                                    placeholder="Ingrese su nueva contraseña"
                                    name="password"
                                />
                                {errors.password && touched.password ? (
                                    <p className="alert-senara-error">{errors.password}</p>
                                ) : null}
                            </div>

                            <div className="senara-form-group">
                                <p
                                    className="senara-form-group floating-label senara-description-page"
                                    htmlFor="confirmPassword"
                                ></p>
                                <Field
                                    id="confirmPassword"
                                    type="password"
                                    className="floating-input "
                                    placeholder="Vuelva a Ingresar su contraseña"
                                    name="confirmPassword"
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <p className="alert-senara-error">
                                        {errors.confirmPassword}
                                    </p>
                                ) : null}
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