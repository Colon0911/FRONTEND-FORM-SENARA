import { toast } from 'react-toastify'

export const notification = (status) => {
    const custom = {
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
    }

    status === 200 ? toast.success("Solicitud enviada!", custom) : toast.error("Error en la solicitud!", custom)
}