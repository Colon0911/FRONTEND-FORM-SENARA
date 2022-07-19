import axios from 'axios'

const API = 'http://localhost:4000'

export const solicitudCreate = async (solicitud, token) => {
  return await axios.post(`${API}/solicitudCreate`, solicitud, {
    headers: { Authorization: token },
  })
}
