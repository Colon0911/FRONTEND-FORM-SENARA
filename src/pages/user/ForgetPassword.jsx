import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { forgetPassword } from '../../services/userServices'

{
  /**Componentes */
}
import Logo from '../../components/Logo'

const ForgetPassword = () => {
  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email no valido')
      .required('El email es obligatorio'),
  })

  const handleSubmit = async (values) => {
    await forgetPassword(values)
  }

  return (
    <div className="senara-content-sm-login">
      <Logo />
      <div className="senara-content-legend-auth">
        <legend className="senara-tagline">Olvidaste tu contraseña</legend>
        <legend className="senara-description-page">
          Enviaremos un enlace de recuperación a
        </legend>
      </div>

      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={ForgetPasswordSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="senara-form form-login">
              <div className="senara-form-group">
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="floating-input"
                  placeholder=" "
                />
                <span className="highlight"></span>
                <label htmlFor="email"> Ingrese su correo electrónico </label>
                <FontAwesomeIcon icon={faEnvelope} />
                {errors.email && touched.email ? (
                  <p className="alert-senara-error">{errors.email}</p>
                ) : null}
              </div>
              <div className="container-notfound">
                <input
                  type="submit"
                  value="Enviar"
                  className="senara-btn-primary btn-center max-c"
                />
              </div>
            </Form>
          )
        }}
      </Formik>

      <div className="senara-actions container-notfound">
        <Link to="/">Iniciar Sesión</Link>
      </div>
    </div>
  )
}

export default ForgetPassword
