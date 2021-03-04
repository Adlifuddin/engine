
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/'
})

export const uploadDrive = (payload) => api.post("add", payload)
export const updateDrive = (payload) => api.put("update", payload)



const apis = {
    uploadDrive,
    updateDrive,
}

export default apis