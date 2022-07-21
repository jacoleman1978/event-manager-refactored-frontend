import axios from "axios";

class UserDataService {
    static Login(data) {  
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/login', data)
    }

    static Signup(data) {
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/signup', data)
    }

    static IsSignupInfoUnique(data) {
        axios.defaults.withCredentials = true
        return axios.post('http://localhost:3100/auth/signup/verify', data)
    }

    static CheckSessionUser() {
        return axios.get('http://localhost:3100/auth/session', {withCredentials: true})
    }

    static Logout() {
        return axios.get('http://localhost:3100/auth/logout', {withCredentials: true})
    }   
}

export default UserDataService;