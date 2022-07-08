import React from 'react'
import { Field } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

const FirstStep = ({ errors, touched }) => {
    return (
        <>
            <div className="senara-form-group">
                {errors.identificationType && touched.identificationType ? (
                    <div className="a-alert">{errors.identificationType}</div>
                ) : null}
                <Field
                    id="identificationType"
                    name="identificationType"
                    as="select"
                    multiple={false}
                    className="floating-select"
                >
                    <option value=""> Tipo Identificación </option>
                    <option value="physical"> Física </option>
                    <option value="legal"> Jurídica </option>
                </Field>
                <span className="highlight"></span>
            </div>

            <div className="senara-form-group">
                {errors.identification && touched.identification ? (
                    <div className="a-alert">{errors.identification}</div>
                ) : null}
                <Field
                    id="identification"
                    type="text"
                    name="identification"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="hightlight"></span>
                <label>Identificación</label>
                <FontAwesomeIcon icon={faAddressCard} />
            </div>

            <div className="senara-form-group">
                {errors.fullName && touched.fullName ? (
                    <div className="a-alert">{errors.fullName}</div>
                ) : null}
                <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="floating-input"
                    placeholder=" "
                />
                <span className="highlight"></span>
                <label>Nombre Completo</label>
                <FontAwesomeIcon icon={faAddressCard} />
            </div>

            <div className="senara-form-group">
                {errors.genre && touched.genre ? (
                    <div className="a-alert">{errors.genre}</div>
                ) : null}
                <Field
                    id="genre"
                    name="genre"
                    as="select"
                    multiple={false}
                    className="floating-select"
                >
                    <option value=""> Genero </option>
                    <option value="female"> Femenino </option>
                    <option value="male"> Masculino </option>
                </Field>
                <span className="highlight"></span>
            </div>
        </>
    )
}

export default FirstStep
