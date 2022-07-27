import React from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../components/Logo'
const Home = () => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" />

  return (
    <>
      <div></div>
      <div className="senara-home">
        <Logo />
        <div className="senara-legend-home">
          <legend className="senara-home-tagline">Bienvenido</legend>
          <legend className="senara-home-description">
            Puedes Proceder a realizar el llenado de los diferentes formularios
            que ofrese DRAT
          </legend>

          <legend className="senara-home-description">
            Para más informacion
          </legend>
          <legend className="senara-home-description">
            <FontAwesomeIcon icon={faPhone} />
            00000000 EXT 000
          </legend>
        </div>
      </div>
    </>
  )
}

export default Home
