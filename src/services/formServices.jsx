import axios from 'axios'

const API = 'http://localhost:4000'

export const agregarQueja = async (values, token) => {
    return await axios.post(`${API}/form-queja`, values, {
        headers: {
            Authorization: token
        }
    })
}