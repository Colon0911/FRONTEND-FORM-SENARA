import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faAddressCard, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'
import { getData } from '../../helpers/loadUserData'
import { getIdentification } from '../../helpers/decoding'
import { updateUser } from '../../services/userServices'
import { compareDates } from '../../helpers/compareDates'

const Profile = () => {
    const { user, expiresIn, token, logout } = useAuth()

    if (!compareDates(expiresIn)) logout()
    if (!user) return <Navigate to="/" />

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const [provinces, setProvinces] = useState()
    const [cantons, setCantons] = useState()
    const [districts, setDistricts] = useState()
    const [provinceAux, setProvinceAux] = useState(data?.province || null)

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

    const loadCantons = (e = data?.province) => {
        let idProvince = null;
        (typeof e === 'object' ? idProvince = e.target.value : idProvince = e)
        setProvinceAux(idProvince)
        fetch(`https://ubicaciones.paginasweb.cr/provincia/${idProvince}/cantones.json`)
            .then(res => res.json())
            .then(data => setCantons(Object.values(data)))
    }

    const loadDistricts = (e = data?.canton) => {
        let idCanton = null;
        (typeof e === 'object' ? idCanton = e.target.value : idCanton = e)
        fetch(`https://ubicaciones.paginasweb.cr/provincia/${provinceAux || data?.province}/canton/${idCanton}/distritos.json`)
            .then(res => res.json())
            .then(data => setDistricts(Object.values(data)))
    }

    useLayoutEffect(() => {
        const loadData = async () => {
            setData(await getData(token))
        }
        loadData()
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }, [])

    useEffect(() => {
        fetch('https://ubicaciones.paginasweb.cr/provincias.json')
            .then(res => res.json())
            .then(data => setProvinces(Object.values(data)))
        if (data?.province) {
            loadCantons()
            loadDistricts()
        }
    }, [data])

    const onSubmit = async (values) => {
        const id = getIdentification(token)
        const res = await updateUser(id, values, token)
    }

    return (
        <>
            <div className='title-container'>
                <p> Perfil </p>
            </div>
            {loading
                ?
                <div className="senara-forms">
                    <form onSubmit={handleSubmit(onSubmit)} className="forms-container">
                        <div className="forms-content">
                            <div>
                                <div className="senara-form-group">
                                    <input type="text" className='floating-input' value={data?.fullName} disabled />
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </div>
                                <div className="senara-form-group">
                                    <input type="email" className='floating-input' value={data?.email} disabled />
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <div className="senara-form-group">
                                    <input type="text" className='floating-input' value={data?.userName} disabled />
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className="senara-form-group">
                                    <input type="password" className='floating-input' value={data?.password} disabled />
                                    <FontAwesomeIcon icon={faKey} />
                                </div>
                                <div className="senara-form-group">
                                    {errors.phone?.type === 'required' && <div className='a-alert'>El teléfono es obligatorio!</div>}
                                    {errors.phone?.type === 'pattern' && <div className='a-alert'>Formato Costarricense requerido!</div>}
                                    <input type="tel" className='floating-input' placeholder=' ' {...register('phone', { required: true, pattern: /^[2|4|5|6|7|8]\d{7}$/ })} defaultValue={data?.phone} />
                                    <span className="highlight"></span>
                                    <label> Teléfono </label>
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                            </div>
                            <div>
                                <div className="senara-form-group">
                                    {errors.province?.type === 'required' && <div className='a-alert'>La provincia es obligatoria!</div>}
                                    <select {...register("province", { required: true, onChange: e => loadCantons(e) })} className="floating-select" defaultValue={data?.province} >
                                        <option value=""> Seleccione una Provincia </option>
                                        {provinces?.map(value => (
                                            <option key={value} value={provinces.indexOf(value) + 1}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="senara-form-group">
                                    {errors.canton?.type === 'required' && <div className='a-alert'>El cantón es obligatorio!</div>}
                                    <select {...register("canton", { required: true, onChange: e => loadDistricts(e) })} className="floating-select" defaultValue={data?.canton} >
                                        <option value=""> Seleccione un Cantón </option>
                                        {cantons?.map(value => (
                                            <option key={value} value={cantons.indexOf(value) + 1}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="senara-form-group">
                                    {errors.district?.type === 'required' && <div className='a-alert'>El distrito es obligatorio!</div>}
                                    <select {...register("district", { required: true })} className="floating-select" defaultValue={data?.district} >
                                        <option value=""> Seleccione un Distrito </option>
                                        {districts?.map(value => (
                                            <option key={value} value={districts.indexOf(value) + 1}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="senara-form-group">
                                    {errors.exactAddress?.type === 'required' && <div className='a-alert'>La dirección exacta es obligatoria!</div>}
                                    <textarea className='floating-textarea' {...register('exactAddress', { required: true })} defaultValue={data?.exactAddress}></textarea>
                                    <label> Dirección Exacta </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className='senara-btn-primary'>Guardar</button>
                    </form>
                </div>
                :
                <p>Loading...</p>
            }
        </>
    )
}

export default Profile