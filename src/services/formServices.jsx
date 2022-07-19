import axios from 'axios'

const API = 'http://localhost:4000'

export const addPlan = async (values, token) => {
    return await axios.post(`${API}/plan-riego`, values, {
        headers: {
            Authorization: token
        }
    })
}