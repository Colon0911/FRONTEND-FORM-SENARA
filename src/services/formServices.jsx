import axios from 'axios'

const API = 'http://localhost:4000'

export const addPlan = async (values, token) => {
    return await axios.post(`${API}/plan-riego`, values, {
        headers: {
            Authorization: token
        }
    })
}

export const solicitudCreate = async (solicitud, token) => {
  return await axios.post(`${API}/solicitudCreate`, solicitud, {
    headers: {Authorization: token },
  })
}

export const agregarQueja = async (values, token) => {
    return await axios.post(`${API}/form-queja`, values, {
        headers: {
            Authorization: token
        }
    })
}