import jwtDecode from 'jwt-decode'

export const getFullName = token => {
	const {fullName} = jwtDecode(token)
	return fullName
}

export const getIdentification = token => {
	const {identification} = jwtDecode(token)
	return identification
}