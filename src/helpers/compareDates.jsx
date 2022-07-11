export const compareDates = (epoch) => {
    const dateNow = new Date().toLocaleTimeString()
    const expiresIn = new Date(epoch * 1000).toLocaleTimeString()
    return expiresIn > dateNow
}