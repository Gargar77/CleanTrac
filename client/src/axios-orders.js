import axios from 'axios'

export const auth = axios.create({
    baseURL: 'localhost:3001/auth'
})