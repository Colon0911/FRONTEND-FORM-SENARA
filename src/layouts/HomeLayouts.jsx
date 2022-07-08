import { Navigate, Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDoorOpen, faCalendar } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../hooks/useAuth'

const HomeLayouts = () => {
  const { user, logout } = useAuth()

  if (!user) return <Navigate to="/" />

  return (
    <div className="senara-dashboard">
      <div className="senara-header">
        <div className="senara-logo-header">
          <div className="senara-img-logo-header"></div>
        </div>
        <h4 className="senara-descrip-page">
          DIRECCION DISTRITO DE RIEGO ARENAL TEMPISQUE
        </h4>
        <div className="senara-icon-header">
          <Link to="/dashboard/profile">
            {user}
            <FontAwesomeIcon icon={faUser} size="2x" color="#07392a" />
          </Link>
          <a onClick={logout} className="logout-header">
            Salir
            <FontAwesomeIcon icon={faDoorOpen} size="2x" color="rgb(169,0,0)" />
          </a>
        </div>
      </div>
      <div className="senara-content-principal">
        <div className="senara-content-menu">
          <div className="title-container">
            <p> Formularios </p>
          </div>
          <div className="forms-container">
            <Link to={'/dashboard/form-de-quejas'} className="form-item">
              <div className="svg-block">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div className="form-name">
                <p> Formulario de Quejas </p>
              </div>
            </Link>
            <Link to={'/dashboard/form-solicitud-riego'} className="form-item">
              <div className="svg-block">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div className="form-name">
                <p> Solicitud de Riego </p>
              </div>
            </Link>
            <Link to={'/dashboard/plan-riego'} className="form-item">
              <div className="svg-block">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div className="form-name">
                <p></p>
              </div>
            </Link>
          </div>
        </div>
        <div className="senara-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayouts
