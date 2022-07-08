import axios from 'axios'

const API = 'http://localhost:4000'

export const registerUser = async user => {
	return await axios.post(`${API}/register`, user)
}

export const loginUser = async user => {
	return await axios.post(`${API}/login`, user)
}

export const getUser = async (id, token) => {
	return await axios.get(`${API}/profile/${id}`, {
		headers: {
			Authorization: token
		}
	})
}

export const updateUser = async (id, values, token) => {
	return await axios.patch(`${API}/profile/${id}`, values, {
		headers: {
			Authorization: token
		}
	})
}

export const forgetPassword = async email => {
	return await axios.post(`${API}/forget-password`, email)
}

export const resetPassword = async (values, token) => {
	return await axios.post(`${API}/reset-password/${token}`, values, {
		headers: {
			Authorization: token
		}
	})
}