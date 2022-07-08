import React from 'react'
import { Field } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SecondStep = ({ errors, touched }) => {
    return (
        <>
            <div className="senara-form-group">
                {errors.email && touched.email ? (
                    <div className="a-alert">{errors.email}</div>
                ) : null}
                <Field
                    id="email"
                    name="email"
                    type="email"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="highlight"></span>
                <label>Correo</label>
                <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <div className="senara-form-group">
                {errors.userName && touched.userName ? (
                    <div className="a-alert">{errors.userName}</div>
                ) : null}
                <Field
                    id="userName"
                    name="userName"
                    type="text"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="highlight"></span>
                <label>Nombre de Usuario</label>
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="senara-form-group">
                {errors.password && touched.password ? (
                    <div className="a-alert">{errors.password}</div>
                ) : null}
                <Field
                    id="password"
                    name="password"
                    type="password"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="highlight"></span>
                <label>Contraseña</label>
                <FontAwesomeIcon icon={faKey} />
            </div>

            <div className="senara-form-group">
                {errors.confirmation && touched.confirmation ? (
                    <div className="a-alert">{errors.confirmation}</div>
                ) : null}
                <Field
                    id="confirmation"
                    name="confirmation"
                    type="password"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="highlight"></span>
                <label>Confirmación</label>
                <FontAwesomeIcon icon={faKey} />
            </div>
        </>
    )
}

export default SecondStep