import React from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../hooks/useAuth'
const Home = () => {
  const { user, token } = useAuth()
  if (!user) return <Navigate to="/" />

  return (
    <>
      <div className="senara-forms">
        <Logo />
        <div className="senara-content-legend-auth">
          <legend className="senara-tagline">Bienvenido</legend>
          <legend className="senara-description-page">
            Puedes Proceder a realizar el llenado de los diferentes formularios
            que ofrese DRAT
          </legend>

          <legend className="senara-description-page">
            Para más informacion
          </legend>
          <legend className="senara-description-page">
            <FontAwesomeIcon icon={faPhone} />
            00000000 EXT 000
          </legend>
        </div>
      </div>
    </>
  )
}

export default Home
