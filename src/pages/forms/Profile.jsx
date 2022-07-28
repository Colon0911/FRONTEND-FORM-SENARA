import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faAddressCard, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../hooks/useAuth'
import { getData } from '../../helpers/loadUserData'
import { getIdentification } from '../../helpers/decoding'
import { updateUser } from '../../services/userServices'
import { compareDates } from '../../helpers/compareDates'

import { notification } from '../../components/Toast'
import "react-toastify/ReactToastify.min.css";

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
    const [cantonAux, setCantonAux] = useState()

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
        setCantonAux(idCanton)
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
        console.log(values)
        const id = getIdentification(token)
        const res = await updateUser(id, values, token)
        if (res.status === 200) {
            notification(res.status)
        } else {
            notification(res.status)
        }
    }

    return (
        <>
            <div className='title-container'>
                <p> Perfil </p>
            </div>
            <div className="senara-forms">
                <form onSubmit={handleSubmit(onSubmit)} className="forms-container">
                    {loading
                        ?
                        <>
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
                                        <input type="password" className='floating-input' placeholder='*********' disabled />
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
                                        <select className="floating-select" {...register("province", { required: true, onChange: e => loadCantons(e) })} defaultValue={data?.province} >
                                            <option value="" disabled selected> Provincia </option>
                                            {provinces?.map(value => (
                                                <option key={value} value={provinces.indexOf(value) + 1}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="senara-form-group">
                                        {errors.canton?.type === 'required' && <div className='a-alert'>El cantón es obligatorio!</div>}
                                        <select className="floating-select" disabled={provinceAux ? false : true} {...register("canton", { required: true, onChange: e => loadDistricts(e) })} defaultValue={data?.canton} >
                                            <option value="" disabled selected> Cantón </option>
                                            {cantons?.map(value => (
                                                <option key={value} value={cantons.indexOf(value) + 1}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="senara-form-group">
                                        {errors.district?.type === 'required' && <div className='a-alert'>El distrito es obligatorio!</div>}
                                        <select className="floating-select" disabled={cantonAux && provinceAux ? false : true} {...register("district", { required: true })} defaultValue={data?.district} >
                                            <option value="" disabled selected> Distrito </option>
                                            {districts?.map(value => (
                                                <option key={value} value={districts.indexOf(value) + 1}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="senara-form-group">
                                        {errors.exactAddress?.type === 'required' && <div className='a-alert'>La dirección exacta es obligatoria!</div>}
                                        <textarea placeholder='' className='floating-textarea' {...register('exactAddress', { required: true })} defaultValue={data?.exactAddress}></textarea>
                                        <label> Dirección Exacta </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className='senara-btn-primary'>Guardar</button>
                        </>
                        :
                        <div className="spinner-loading">
                            <div></div><div></div><div></div><div></div>
                        </div>
                    }
                </form>
            </div>
            <ToastContainer position="bottom-right" theme='colored' />
        </>
    )
}

export default Profile