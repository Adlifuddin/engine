
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/add'
})

export const uploadDrive = (payload) => api.post("", payload)



const apis = {
    uploadDrive,
}

export default apis