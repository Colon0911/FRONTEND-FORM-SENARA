import { getUser } from "../services/userServices"
import { getIdentification } from "./decoding"

export const getData = async (token) => {
    const identification = getIdentification(token)
    const res = await getUser(identification, token)
    const aux = res.data[0]
    return aux
}