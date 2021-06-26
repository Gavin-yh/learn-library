import axios from 'axios'
export default function login(user) {
        return axios.get('/api/login', {params: user})
}